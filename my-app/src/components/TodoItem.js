import React from "react";
import styles from "@/styles/TodoList.module.css";

// TodoItem 컴포넌트를 정의합니다.
const TodoItem = ({ todo, onToggle, onDelete }) => {
  // 각 할 일 항목을 렌더링합니다.
  return (
    <li className={styles.todoItem}>
      <input type="checkbox" checked={todo.completed} onChange={onToggle} />
      {/* 할 일의 텍스트를 렌더링하고, 완료 상태에 따라 텍스트에 취소선을 적용합니다. */}
      <span
        className={styles.todoText}
        style={{ textDecoration: todo.completed ? "line-through" : "none" }}
      >
        {todo.text}
      </span>

      <span className={styles.todoDatetime}>
        {todo.datetime.substring(0, 10)}
      </span>

      {/* 삭제 버튼을 렌더링하고, 클릭 시 onDelete 함수를 호출하여 해당 할 일을 삭제합니다. */}
      <button onClick={onDelete}>Delete</button>
    </li>
  );
};

export default TodoItem;
