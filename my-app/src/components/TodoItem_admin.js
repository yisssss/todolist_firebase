import React from "react";
import styles from "@/styles/TodoList.module.css";

// TodoItem 컴포넌트를 정의합니다.
const TodoItem_admin = ({ todo }) => {
  // 각 할 일 항목을 렌더링합니다.
  return (
    <li className={styles.todoItem}>
      <span className={styles.todoText}>{todo.text}</span>
      <span className={styles.todoUserdId}>{todo.userId}</span>

      <span className={styles.todoDatetime}>
        {todo.datetime.substring(0, 10)}
      </span>
    </li>
  );
};

export default TodoItem_admin;
