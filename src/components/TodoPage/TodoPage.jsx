import React, { useState } from "react";
import { useAuth } from "hooks/useAuth";
import { useTodos } from "hooks/useTodos";
import { AiOutlinePlus } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { GrCheckboxSelected, GrCheckbox } from "react-icons/gr";
import makeClassName from "utils/makeClassName";

const TodoPage = () => {
  const { user } = useAuth();
  const [value, setValue] = useState("");
  const { todos, addTodo, deleteTodo, updateTodoCompletion } = useTodos(user);

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
          placeholder="What do you need to do...?"
          value={value}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddTodo();
            }
          }}
          onChange={(e) => setValue(e.currentTarget.value)}
        ></input>
        <button
          onClick={handleAddTodo}
          disabled={!value}
          className="add-todo-button"
        >
          <AiOutlinePlus />
        </button>
      </div>
      <div className="todo-wrapper">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className={makeClassName(
              "todos",
              todo.isCompleted && "is-completed"
            )}
          >
            <button
              onClick={() => updateTodoCompletion(todo.id, !todo.isCompleted)}
            >
              {todo.isCompleted ? <GrCheckboxSelected /> : <GrCheckbox />}
            </button>
            <div>{todo.description}</div>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="delete-button"
            >
              <BiTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoPage;
