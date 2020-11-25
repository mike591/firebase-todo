import React, { useState } from "react";
import { useAuth } from "hooks/useAuth";
import { useTodos } from "hooks/useTodos";

const TodoPage = () => {
  const { user } = useAuth();
  const [value, setValue] = useState("");
  const { todos, addTodo, deleteTodo } = useTodos(user);

  const handleAddTodo = () => {
    addTodo(value);
    setValue("");
  };

  return (
    <div className="TodoPage">
      <div className="input-wrapper">
        <input
          className="todo-input"
          type="string"
          placeholder="What do you need to do?"
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
        ></input>
        <button onClick={handleAddTodo} disabled={!value}>
          Add Todo
        </button>
      </div>
      {todos.map((todo) => (
        <div key={todo.id} className="todo-wrapper">
          <div>{todo.description}</div>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default TodoPage;
