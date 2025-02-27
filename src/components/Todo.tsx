import React, { useState, useRef, useEffect } from "react";
import TodolistItem from "@components/TodolistIiem";

interface TodoItem {
  text: string;
  completed?: boolean;
}

type FilterType = "all" | "active" | "completed";

interface EditInfo {
  index: number;
  text: string;
}

const Todo: React.FC = () => {
  const [notes, setNotes] = useState<TodoItem[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [editing, setEditing] = useState<EditInfo | null>(null);
  let inputRef = useRef<HTMLInputElement>(null);
  let editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const current_note = localStorage.getItem("notess");
    if (current_note) {
      setNotes(JSON.parse(current_note));
    }
  }, []);

  const addtodo = (event: React.FormEvent) => {
    event.preventDefault();
    if (inputRef.current) {
      let toname = inputRef.current.value;
      if (toname.trim() !== "") {
        let finaltodo = [...notes, { text: toname }];
        setNotes(finaltodo);
        inputRef.current.value = "";
        localStorage.setItem("notess", JSON.stringify(finaltodo));
      }
    }
  };

  const toggleComplete = (index: number) => {
    let updatedNotes = notes.map((note, i) =>
      i === index ? { ...note, completed: !note.completed } : note
    );
    setNotes(updatedNotes);
    localStorage.setItem("notess", JSON.stringify(updatedNotes));
  };

  const deleteTodo = (index: number) => {
    let updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    localStorage.setItem("notess", JSON.stringify(updatedNotes));
  };

  const startEditTodo = (index: number, text: string) => {
    setEditing({ index, text });
  };

  const saveEditTodo = () => {
    if (editing && editInputRef.current) {
      const newText = editInputRef.current.value;
      if (newText.trim() !== "") {
        const updatedNotes = notes.map((note, i) =>
          i === editing.index ? { ...note, text: newText } : note
        );
        setNotes(updatedNotes);
        localStorage.setItem("notess", JSON.stringify(updatedNotes));
        setEditing(null);
      }
    }
  };

  const cancelEdit = () => {
    setEditing(null);
  };

  const filteredNotes = notes.filter((note) => {
    if (filter === "all") return true;
    if (filter === "active") return !note.completed;
    if (filter === "completed") return note.completed;
    return true;
  });

  const toggleFilterDropdown = () => {
    setShowFilterDropdown(!showFilterDropdown);
  };

  const selectFilter = (selectedFilter: FilterType) => {
    setFilter(selectedFilter);
    setShowFilterDropdown(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-blue-800 shadow-2xl">
      <div className="shadow-lg rounded-xl h-full p-8">
        <h1 className="text-4xl font-bold mb-5 text-center text-blue-600">Todo List</h1>
        <form onSubmit={addtodo} className="mb-6">
          <div className="flex">
            <input
              type="text"
              className="w-full h-12 text-xl p-4 mr-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="Add a new todo..."
              ref={inputRef}
            />
            <button className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700">
              Add
            </button>
            <div className="relative ml-3">
              <button
                type="button"
                className="bg-purple-600 text-white px-5 py-3 rounded-lg hover:bg-purple-700"
                onClick={toggleFilterDropdown}
              >
                Filter
              </button>
              {showFilterDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                  <ul className="py-1">
                    <li 
                      className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${filter === 'all' ? 'bg-purple-100' : ''}`}
                      onClick={() => selectFilter("all")}
                    >
                      All Todos
                    </li>
                    <li 
                      className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${filter === 'active' ? 'bg-purple-100' : ''}`}
                      onClick={() => selectFilter("active")}
                    >
                      Active Todos
                    </li>
                    <li 
                      className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${filter === 'completed' ? 'bg-purple-100' : ''}`}
                      onClick={() => selectFilter("completed")}
                    >
                      Completed Todos
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </form>
        <ol className="space-y-3">
          {filteredNotes.map((note, index) => (
            <li key={index} className="bg-gray-100 w-full rounded-xl shadow-lg">
              {editing && editing.index === index ? (
                <div className="flex justify-between items-center rounded-md p-5">
                  <div className="flex items-center flex-grow mr-3">
                    <span className="flex-1/3 mr-2">{index + 1}.</span>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                      defaultValue={editing.text}
                      ref={editInputRef}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <button
                      className="bg-green-500 text-white shadow-green-700 shadow-md rounded-lg hover:bg-green-600 p-2"
                      onClick={saveEditTodo}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-500 text-white shadow-gray-700 shadow-md rounded-lg ml-2 hover:bg-gray-600 p-2"
                      onClick={cancelEdit}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <TodolistItem
                  value={note.text}
                  index={index}
                  completed={note.completed || false}
                  onComplete={() => toggleComplete(index)}
                  onDelete={() => deleteTodo(index)}
                  onEdit={() => startEditTodo(index, note.text)}
                />
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Todo;