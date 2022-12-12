import { useState } from "react";

export default function BaiLam1() {
  const [todos, setTodos] = useState([
    {
      id: "a",
      status: "pend",
    },
    {
      id: "b",
      status: "comp",
    },
    {
      id: "c",
      status: "pend",
    },
  ]);

  function onClick() {
    const newTodo = [...todos];
    newTodo[0].id = "lmh";
    setTodos(newTodo);
  }

  return (
    <>
      {todos.map((todo) => (
        <>
          <p>id: {todo.id}</p>
          <p>status: {todo.status}</p>
        </>
      ))}
      <button onClick={onClick}>Change</button>
    </>
  );
}
