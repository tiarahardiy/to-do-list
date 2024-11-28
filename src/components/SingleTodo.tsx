/** @format */

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Todo } from "../models/model";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { IoCheckmarkOutline } from "react-icons/io5";
import "./styles.css";
import { Draggable } from "react-beautiful-dnd";

type Props = {
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const SingleTodo: React.FC<Props> = ({
  index,
  todo,
  todos,
  setTodos,
}: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  //inputRef digunakan untuk agar saat edit dia langsung di input jadi gak perlu teken

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`todos-single ${snapshot.isDragging ? "drag" : ""}`}
          onSubmit={(e) => handleEdit(e, todo.id)}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="w-full flex items-center justify-center columns-2">
            {edit ? (
              <input
                value={editTodo}
                className="font-SourGummy g-gray-50 border border-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:text-white"
                onChange={(e) => setEditTodo(e.target.value)}
                ref={inputRef}
              />
            ) : todo.isDone ? (
              <s className="todos-single-text font-SourGummy">{todo.todo}</s>
            ) : (
              <span className="todos-single-text font-SourGummy">
                {todo.todo}
              </span>
            )}

            <div className="flex columsn-3">
              <span
                className="icon"
                onClick={() => {
                  if (!edit && !todo.isDone) {
                    setEdit(!edit);
                  }
                }}
              >
                <CiEdit />
              </span>

              <span className="icon" onClick={() => handleDelete(todo.id)}>
                <MdDeleteOutline />
              </span>
              <span className="icon" onClick={() => handleDone(todo.id)}>
                <IoCheckmarkOutline />
              </span>
            </div>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
