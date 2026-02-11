import { useState, useEffect } from "react";
import Stats from "./Stats"; 

function TaskList() {
  const [task, setTask] = useState("");
  const [list, setList] = useState(() => {
    const saved = localStorage.getItem("myTask");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("myTask", JSON.stringify(list));
  }, [list]);

  const clearAll = () => setList([]);

  const toggleComplete = (indexToToggle) => {
    const updatedList = list.map((item, index) => 
      index === indexToToggle ? { ...item, completed: !item.completed } : item
    );
    setList(updatedList);
  };

  const deleteTask = (indexToDelete) => {
    setList(list.filter((_, index) => index !== indexToDelete));
  };

  const addTask = () => {
    if (task.trim() !== "") {
      setList([...list, { text: task.trim(), completed: false }]);
      setTask("");
    }
  };

  const editTask = (indexToEdit) => {
    const currentText = list[indexToEdit].text;
    const newText = prompt("Edit your Task:", currentText);
    if (newText !== null && newText.trim() !== "") {
      const updatedList = list.map((item, index) => 
        index === indexToEdit ? { ...item, text: newText.trim() } : item
      );
      setList(updatedList);
    }
  };

  return (
    <div className="flex flex-col items-center mt-10 w-full animate-slide-up">
      
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-slate-100 transform hover:scale-[1.02] transition-all duration-300">
        
        <header className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            Quick Task List
          </h1>
        </header>

        {/* Stats Header */}
        <div className="flex justify-between items-center mb-6 px-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Your Tasks
          </span>
          <span className="bg-blue-100 text-blue-600 text-xs font-bold px-2.5 py-0.5 rounded-full">
            {list.length}
          </span>
        </div>

        {/* Input Field */}
        <div className="flex items-center gap-0 mb-8 overflow-hidden rounded-xl border-2 border-slate-200 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100 transition-all">
          <input
            type="text"
            placeholder="Enter a Task..."
            className="flex-1 bg-white px-4 py-3 outline-none text-slate-700 font-medium"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => {
                if(e.key === "Enter") addTask();
            }}
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-bold transition-colors"
            onClick={addTask}
          >
            Add
          </button>
        </div>

        <Stats total={list.length} />

        {/* Empty State */}
        {list.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-slate-400">
            <span className="text-4xl mb-2">📄</span>
            <p className="text-sm font-medium">Your list is Empty!</p>
          </div>
        )}

        {/* Task List */}
        <ul className="space-y-3 max-h-72 overflow-y-auto pr-2 custom-scrollbar">
          {list.map((item, index) => (
            <li
              key={index}
              onClick={() => toggleComplete(index)}
              className="group flex items-center justify-between p-4 mb-3 bg-slate-50 rounded-xl border border-slate-200 hover:border-blue-400 transition-all cursor-pointer shadow-sm hover:shadow-md"
            >
              <span className={`flex-1 font-medium truncate mr-4 ${item.completed ? "line-through text-slate-400" : "text-slate-700"}`}>
                {item.text}
              </span>

              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  className="text-blue-500 hover:text-blue-700 text-sm font-bold px-2 py-1 bg-blue-50 hover:bg-blue-100 rounded"
                  onClick={(e) => {
                    e.stopPropagation();
                    editTask(index);
                  }}
                >
                  Edit
                </button>
                <button
                  className="text-red-500 hover:text-red-700 text-sm font-bold px-2 py-1 bg-red-50 hover:bg-red-100 rounded"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteTask(index);
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        {list.length > 0 && (
          <button
            onClick={clearAll}
            className="mt-6 w-full py-2 text-slate-400 hover:text-red-500 text-xs font-bold uppercase tracking-widest transition-colors duration-200 hover:bg-red-50 rounded-lg"
          >
            Clear all
          </button>
        )}
      </div>
    </div>
  );
}

export default TaskList;