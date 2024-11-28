/** @format */

import React, { useState } from "react";
import "./App.css";
import "tailwindcss/tailwind.css";
import InputField from "./components/InputField";
import { Todo } from "./models/model";
import TodoList from "./components/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  };

  console.log(todos);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    console.log(result);

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = todos;
    let complete = completedTodos;

    //Source Logic
    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    //Destination Logic
    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);

      setCompletedTodos(complete);
      setTodos(active);
    }
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="w-screen min-h-screen flex flex-col items-center bg-gradient-to-r from-rose-300 from-5% via-pink-300 via-30% to-blue-400 to-90% ... ">
          <div className="container mx-auto mt-10 ">
            <h1 className="text-start text-5xl mt-10 mb-10 font-bold text-blue-600 font-SourGummy">
              Carat Playlist 🩷
            </h1>
            <div className="w-full flex flex-col items-center mb-10">
              <iframe
                title="Spotify Embed: seventeen🩵 "
                src={`https://open.spotify.com/embed/playlist/2Hwt964nblAi7Yt78HMjE4?utm_source=generator&theme=0`}
                width="100%"
                height="100%"
                style={{ minHeight: "360px" }}
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>
            <h1 className="text-end text-5xl mb-10 font-bold text-pink-500 font-SourGummy">
              Carat To do
            </h1>
            <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
            <div className="mb-10">
              <TodoList
                todos={todos}
                setTodos={setTodos}
                completedTodos={completedTodos}
                setCompletedTodos={setCompletedTodos}
              />
            </div>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default App;
