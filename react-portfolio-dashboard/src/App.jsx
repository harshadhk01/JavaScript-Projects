import {useState} from "react";
import TaskList from "./taskList";
import GitHubFinder from "./GitHubFinder";

function App(){
  const[activeTab, setActiveTab] =useState("github");

  return (
    <div className="min-h-screen bg-slate-200 p-8">
      <div className="flex justify-center gap-4 mb-8">
        <button 
        onClick={() =>
          setActiveTab("tasks")}
          className={`px-6 py-2 rounded-full font-bold transition ${
            activeTab === "tasks"
            ? "bg-blue-600 text-white shadow-lg"
            : "bg-white text-slate-500 hover:bg-slate-100"
          }`}
          >
            Task List
          </button>

          <button 
          onClick={() => setActiveTab("github")}
          className={`px-6 py-2 rounded-full font-bold transition ${
            activeTab === "github"
            ? "bg-black text-white shadow-lg"
            : "bg-white text-slate-500 hover:bg-slate-100"
          }`}
          >
            GitHub finder
          </button>
      </div>

    <div className="max-w-xl mx-auto">
      {activeTab === "tasks" ? <TaskList /> : <GitHubFinder />}
    </div>
    </div>
  )
}

export default App;