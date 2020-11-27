import React, { useState, useMemo } from "react";
import { useAuth } from "hooks/useAuth";
import { useTodos } from "hooks/useTodos";
import makeClassName from "utils/makeClassName";
import pluralize from "pluralize";
import {
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
  Button,
  Popover,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const TodoPage = () => {
  const { user } = useAuth();
  const [value, setValue] = useState("");
  const [view, setView] = useState("all");
  const { todos, addTodo, deleteTodo, updateTodoCompletion } = useTodos(user);
  const [deleteTodoPopoverAnchor, setDeleteTodoPopoverAnchor] = React.useState(
    null
  );
  const [
    deleteCompletedTodosAnchor,
    setDeleteCompletedTodosAnchor,
  ] = React.useState(null);

  const handleOpenDeleteTodoPopover = (event) => {
    setDeleteTodoPopoverAnchor(event.currentTarget);
  };
  const handleOpenDeleteCompletedTodosPopover = (event) => {
    setDeleteCompletedTodosAnchor(event.currentTarget);
  };

  const handleCloseDeleteTodoPopover = () => {
    setDeleteTodoPopoverAnchor(null);
  };
  const handleCloseDeleteCompletedTodosPopover = () => {
    setDeleteCompletedTodosAnchor(null);
  };

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
    handleCloseDeleteCompletedTodosPopover();
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
    <Container className="TodoPage">
      <TextField
        className="todo-TextField"
        type="string"
        value={value}
        label="What do you need to do...?"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleAddTodo();
          }
        }}
        onChange={(e) => setValue(e.currentTarget.value)}
      ></TextField>
      <div className="info">
        <Typography className="todo-summary">{`${pluralize(
          "todo",
          todosLeft,
          true
        )} left`}</Typography>
        <div className="view-toggles">
          <Button
            onClick={() => setView("all")}
            color="primary"
            variant={view === "all" ? "contained" : "outlined"}
          >
            All
          </Button>
          <Button
            onClick={() => setView("active")}
            color="primary"
            variant={view === "active" ? "contained" : "outlined"}
          >
            Active
          </Button>
          <Button
            onClick={() => setView("completed")}
            color="primary"
            variant={view === "completed" ? "contained" : "outlined"}
          >
            Completed
          </Button>
        </div>
        <Button
          onClick={handleOpenDeleteCompletedTodosPopover}
          color="secondary"
        >
          Clear completed
        </Button>
        <Popover
          open={Boolean(deleteCompletedTodosAnchor)}
          anchorEl={deleteCompletedTodosAnchor}
          onClose={handleCloseDeleteCompletedTodosPopover}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          elevation={2}
          className="delete-todo-popup"
        >
          <div className="confirm-delete-popover-content">
            <Typography>
              Are you sure you wish to delete all completed todos?
            </Typography>
            <div className="popover-actions">
              <Button onClick={handleCloseDeleteCompletedTodosPopover}>
                Cancel
              </Button>
              <Button onClick={handleClearCompleted} color="secondary">
                Confirm Delete
              </Button>
            </div>
          </div>
        </Popover>
      </div>
      <div className="todo-wrapper">
        {todosToShow.map((todo) => (
          <Accordion
            key={todo.id}
            className={makeClassName(
              "todos",
              todo.isCompleted && "--is-completed"
            )}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{todo.description}</Typography>
            </AccordionSummary>
            <AccordionDetails className="button-wrapper">
              <Button
                onClick={() => updateTodoCompletion(todo.id, !todo.isCompleted)}
                color={todo.isCompleted ? "default" : "primary"}
                variant="contained"
              >
                {todo.isCompleted ? "undo" : "complete"}
              </Button>
              <Button
                onClick={handleOpenDeleteTodoPopover}
                className="delete-button"
                color="secondary"
              >
                delete
              </Button>
              <Popover
                open={Boolean(deleteTodoPopoverAnchor)}
                anchorEl={deleteTodoPopoverAnchor}
                onClose={handleCloseDeleteTodoPopover}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                elevation={2}
                className="delete-todo-popup"
              >
                <div className="confirm-delete-popover-content">
                  <Typography>
                    Are you sure you wish to delete the todo?
                  </Typography>
                  <div className="popover-actions">
                    <Button onClick={handleCloseDeleteTodoPopover}>
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        deleteTodo(todo.id);
                        handleCloseDeleteTodoPopover();
                      }}
                      color="secondary"
                    >
                      Confirm Delete
                    </Button>
                  </div>
                </div>
              </Popover>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </Container>
  );
};

export default TodoPage;
