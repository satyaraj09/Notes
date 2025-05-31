import { useEffect, useState } from "react";
import "./index.css";

const API_URL = "http://localhost:3000/api/notes";

function App() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(setNotes);
  }, []);

  const addNote = async () => {
    if (!text.trim()) return;

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const newNote = await res.json();
    setNotes([...notes, newNote]);
    setText("");
  };

  const deleteNote = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className="app">
      <h1>Notes</h1>
      <div className="input-group">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter a note"
        />
        <button onClick={addNote}>Add</button>
      </div>

      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            {note.text}
            <button onClick={() => deleteNote(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
