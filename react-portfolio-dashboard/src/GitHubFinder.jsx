import { useState, useEffect } from "react";

function GitHubFinder() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // states for API integration
  const [userName, setUsername] = useState("harshadhk01");
  const [inputValue, setInputValue] = useState("harshadhk01");

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`https://api.github.com/users/${userName}`)
      .then((res) => {
        // Manually error handling 
        if (!res.ok) {
          throw new Error("User not found");
        }
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        // Handling network failures
        setError(err.message || "Failed to fetch data");
        setLoading(false);
      });
  }, [userName]);

  // Handle Search Action
  const handleSearch = () => {
    if (inputValue.trim() !== "") {
      setUsername(inputValue.trim());
    }
  };

  //Loading window
  if (loading) {
    return (
      <div className="flex flex-col items-center mt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-slate-600 font-medium">Loading profile...</p>
      </div>
    );
  }

  // Error catching
  if (error) {
    return (
      <div className="flex flex-col items-center mt-10 space-y-4">
        <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-xl font-bold shadow-sm">
          ⚠️ {error}
        </div>
        <button 
          onClick={() => {
            setError(null);
            setUsername("harshadhk01");
            setInputValue("harshadhk01");
          }}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-bold"
        >
          Reset to My Profile
        </button>
      </div>
    );
  }

  //Main UI State
  return (
    <div className="flex flex-col items-center mt-10 space-y-6 animate-in fade-in duration-500">
      
      {/* Search bar */}
      <div className="flex gap-2 w-full max-w-md px-4">
        <input 
          type="text" 
          placeholder="Enter GitHub username..."
          value={inputValue}
          className="flex-1 border-2 border-slate-300 rounded-lg p-2 focus:outline-none focus:border-blue-500 transition shadow-sm"
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        <button 
          onClick={handleSearch}
          className="bg-black text-white px-6 py-2 rounded-lg font-bold hover:bg-slate-800 transition shadow-md"
        >
          Search
        </button>
      </div>

      {/* Profile container */}
      <div className="w-full max-w-sm p-8 bg-white shadow-2xl rounded-2xl border border-slate-100 text-center transform hover:scale-[1.02] transition-transform duration-300">
        <img 
          src={user?.avatar_url} 
          alt="Profile" 
          className="w-32 h-32 rounded-full mx-auto border-4 border-blue-500 p-1 bg-white shadow-lg" 
        />
        <h1 className="text-2xl font-bold mt-6 text-slate-800">
          {user?.name || user?.login}
        </h1>
        <p className="text-slate-500 mt-2 italic px-4">
          {user?.bio || "This user has no bio available."}
        </p>
        
        <div className="mt-8 pt-6 border-t border-slate-100 flex justify-around w-full text-slate-700">
          <div className="flex flex-col">
            <span className="font-bold text-lg">{user?.followers}</span>
            <span className="text-xs uppercase text-slate-400 tracking-wider font-bold">Followers</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg">{user?.public_repos}</span>
            <span className="text-xs uppercase text-slate-400 tracking-wider font-bold">Repos</span>
          </div>
        </div>

        <a 
          href={user?.html_url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="mt-8 block w-full bg-slate-100 hover:bg-slate-200 text-slate-800 py-2 rounded-lg font-bold transition"
        >
          View Full Profile
        </a>
      </div>
    </div>
  );
}

export default GitHubFinder;