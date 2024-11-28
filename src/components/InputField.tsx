/** @format */

import React, { useRef } from "react";
import "./styles.css";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div>
      <form
        className="input"
        onSubmit={(e) => {
          handleAdd(e);
          inputRef.current?.blur();
        }}
      >
        <input
          ref={inputRef}
          type="input"
          placeholder="What activities support SEVENTEEN?"
          className="input-box font-SourGummy"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button
          className=" font-SourGummy absolute w-[60px] h-[60px] m-[12px] rounded-[60px] right-0 border-none text-[20px] text-white font-semibold  bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 ..."
          type="submit"
        >
          Go
        </button>
      </form>
    </div>
  );
};

export default InputField;
