import React, { useEffect, useState } from "react";

const NotesSection = () => {
  const [notes, setNotes] = useState("");
  const onSaveNote = (e) => {
    e.preventDefault();
    localStorage.setItem("quickNote", notes);
  };

  useEffect(() => {
    const savedNotes = localStorage.getItem("quickNote");
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow">
      <h3 className="text-lg md:text-xl font-semibold text-slate-700 mb-3 md:mb-4">
        Quick Notes
      </h3>
      <textarea
        className="w-full h-32 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
        placeholder="Jot down your notes here..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        onBlur={onSaveNote}
      />
      <div className="mt-3 text-right">
        <button
          onClick={onSaveNote}
          className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Save Note
        </button>
      </div>
    </div>
  );
};

export default NotesSection;
