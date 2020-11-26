import React, { useState, useMemo } from "react";
import { useAuth } from "hooks/useAuth";
import { useTodos } from "hooks/useTodos";
import { AiOutlinePlus } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { GrCheckboxSelected, GrCheckbox } from "react-icons/gr";
import makeClassName from "utils/makeClassName";
import pluralize from "pluralize";

const TodoPage = () => {
  const { user } = useAuth();
  const [value, setValue] = useState("");
  const [view, setView] = useState("all");
  const { todos, addTodo, deleteTodo, updateTodoCompletion } = useTodos(user);

  const handleAddTodo = () => {
    addTodo(value);
    setValue("");
  };

  const handleClearCompleted = () => {
    todos.forEach((todo) => {
      if (todo.isCompleted) {
        deleteTodo(todo.id);
      }
    });
  };

  const todosLeft = useMemo(() => {
    return todos.filter((todo) => !todo.isCompleted).length;
  }, [todos]);

  const todosToShow = useMemo(() => {
    if (view === "active") {
      return todos.filter((todo) => !todo.isCompleted);
    } else if (view === "completed") {
      return todos.filter((todo) => todo.isCompleted);
    } else {
      return todos;
    }
  }, [todos, view]);

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
        {todosToShow.map((todo) => (
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
      <div className="info">
        <div>{`${pluralize("todo", todosLeft, true)} left`}</div>
        <div className="view-toggles">
          <button
            className={makeClassName(view === "all" && "--is-selected")}
            onClick={() => setView("all")}
          >
            All
          </button>
          <button
            className={makeClassName(view === "active" && "--is-selected")}
            onClick={() => setView("active")}
          >
            Active
          </button>
          <button
            className={makeClassName(view === "completed" && "--is-selected")}
            onClick={() => setView("completed")}
          >
            Completed
          </button>
        </div>
        <button onClick={handleClearCompleted}>Clear completed</button>
      </div>
    </div>
  );
};

export default TodoPage;
