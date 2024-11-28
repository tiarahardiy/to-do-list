/** @format */

import React from "react";
import { Todo } from "../models/model";
import SingleTodo from "./SingleTodo";
import "./styles.css";
import { Droppable } from "react-beautiful-dnd";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}) => {
  return (
    <div>
      <div className="w-full flex items-center columns-2 space-x-5 justify-between mt-8">
        <Droppable droppableId="TodosList">
          {(provided, snapshot) => (
            <div
              className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <span className="todos-heading font-SourGummy">To Do</span>

              {todos.map((todo, index) => (
                <SingleTodo
                  index={index}
                  todo={todo}
                  todos={todos}
                  key={todo.id}
                  setTodos={setTodos}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <Droppable droppableId="TodosRemove">
          {(provided, snapshot) => (
            <div
              className={`todos  ${
                snapshot.isDraggingOver ? "dragcomplete" : "remove"
              }`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <span className="todos-heading font-SourGummy"> Done</span>

              {completedTodos.map((todo, index) => (
                <SingleTodo
                  index={index}
                  todo={todo}
                  todos={completedTodos}
                  key={todo.id}
                  setTodos={setCompletedTodos}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default TodoList;
