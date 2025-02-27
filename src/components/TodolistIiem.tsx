import React from "react";

interface TodolistItemProps {
  value: string;
  index: number;
  completed: boolean;
  onComplete: () => void;
  onDelete: () => void;
}

const TodolistItem: React.FC<TodolistItemProps> = ({
  value,
  index,
  completed,
  onComplete,
  onDelete,
}) => {
  const trimExcessData = (toname : String) => {
    if(toname.length>20){
      toname = toname.substring(0,20) + "..."
    }
    return toname
  }
  return (
    <li className="bg-gray-100 w-full rounded-xl shadow-lg">
      <div className="flex justify-between items-center rounded-md p-5">


        <div className=" justify-between items-center flex-3/4 w-xs">
          <span className="flex-1/3 mr-2">{index + 1}.</span>
          <span
            className={`text-lg font-medium ${
              completed ? "line-through text-gray-500" : "text-black"
            }`}
          >
            {trimExcessData(value)}
          </span>
        </div>

        <div className="flex justify-between items-center flex-1/4">

          <button
            className={`rounded-lg  ${
              completed
                ? "bg-yellow-500 text-white hover:bg-yellow-600  p-2"
                : "bg-green-500 text-white hover:bg-green-600  p-2"
            }`}
            onClick={onComplete}
          >
            {completed ? "Undo" : "Complete"}
          </button>

          <button
            className=" bg-red-500 text-white  shadow-red-700 shadow-md rounded-lg ml-2 hover:bg-red-600 p-2"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>

      </div>
    </li>
  );
};

export default TodolistItem;
