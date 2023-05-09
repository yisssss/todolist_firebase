import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import TodoItem from "@/components/TodoItem";
import styles from "@/styles/TodoList.module.css";

import { db } from "@/firebase";
import {
  collection,
  query,
  where,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  orderBy,
} from "firebase/firestore";

const todoCollection = collection(db, "todos");

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const { data } = useSession();

  const getTodos = async () => {
    if (!data?.user?.name) return;

    const q = query(
      todoCollection,
      where("userId", "==", data?.user?.id),
      orderBy("datetime", "asc")
    );

    const results = await getDocs(q);
    const newTodos = [];

    results.docs.forEach((doc) => {
      newTodos.push({ id: doc.id, ...doc.data() });
    });

    setTodos(newTodos);
  };

  useEffect(() => {
    getTodos();
  }, [data]);

  const addTodo = async () => {
    if (input.trim() === "") return;
    const datetime = new Date().toISOString();

    const docRef = await addDoc(todoCollection, {
      userId: data?.user?.id,
      text: input,
      completed: false,
      datetime: datetime,
    });

    setTodos([
      ...todos,
      { id: docRef.id, text: input, datetime: datetime, completed: false },
    ]);
    setInput("");
  };

  const toggleTodo = (id) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        const todoDoc = doc(todoCollection, id);
        updateDoc(todoDoc, { completed: !todo.completed });

        return { ...todo, completed: !todo.completed };
      } else {
        return todo;
      }
    });

    setTodos(newTodos);
  };

  const deleteTodo = (id) => {
    const todoDoc = doc(todoCollection, id);
    deleteDoc(todoDoc);

    setTodos(
      todos.filter((todo) => {
        return todo.id !== id;
      })
    );
  };

  return (
    <div className={styles.container}>
      <h1 className="text-xl mb-4 font-bold underline underline-offset-4 decoration-wavy">
        {data?.user?.name}'s Todo List
      </h1>
      {/* 할 일을 입력받는 텍스트 필드입니다. */}
      <input
        type="text"
        className="w-full p-1 mb-4 border border-gray-300 rounded"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      {/* 할 일을 추가하는 버튼입니다. */}
      <div className="grid">
        <button
          className={`w-40
                      justify-self-end
                      p-1 mb-4
                    bg-blue-500 text-white
                      border border-blue-500 rounded
                    hover:bg-white hover:text-blue-500`}
          onClick={addTodo}
        >
          Add Todo
        </button>
      </div>
      {/* 할 일 목록을 렌더링합니다. */}
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            deadline={todo.deadline}
            onToggle={() => toggleTodo(todo.id)}
            onDelete={() => deleteTodo(todo.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
