import { createContext, useEffect, useState } from "react"
import API from "../services/api";
import { data } from "react-router-dom";
import toast from "react-hot-toast";

export const NotesContext = createContext();

export const NotesProvider = ({children})=>{
const [notes, setNotes] = useState([]);
const [error, setError] = useState(null);
const [loading, setLoading] = useState(false);
const [searchQuery, setSearchQuery] = useState("");
const [fetching, setFetching] = useState(false);

const fetchNotes = async () => {
  if (fetching) return; // prevent overlap
  try {
    setFetching(true);
    setLoading(true);
    const res = await API.get('/notes');
    setNotes(res.data.notes || []);
  } 
  catch (err) {
    console.error("error fetching notes", err);
    setError(err.response?.data?.message || "Failed to load notes");
    toast.error("Failed to load notes");
  } finally {
    setLoading(false);
    setFetching(false);
  }
};

const searchNotes = async (query) => {
  if (!query.trim()) return fetchNotes();

  try {
    setLoading(true);
    const res = await API.get(`/notes/search?query=${encodeURIComponent(query)}`);
    setNotes(res.data.notes || []);
  } catch (err) {
    console.error("Search Error", err);
    setError(err.response?.data?.message || "Failed to search notes");
    toast.error("Failed to search notes");
  } finally {
    setLoading(false);
  }
};


//create new note
const addNote = async(title, content)=>{
    try{
        const res = await API.post('/notes', {title, content});
        // setNotes((prev)=>[res.data.note, ...prev]);
        fetchNotes();
        setError(null);
        toast.success("Note added successfully!");
        return res.data.note;
    }
    catch(err){
        const message = err.response?.data?.message || "Failed to add note";
        toast.error(message);
        throw message;
    }
}


//Edit Note
const updateNote = async(id, updateData)=>{
try{
    const res = await API.put(`/notes/${id}`, updateData);
      setNotes((prev) => prev.map((note) => (note._id === id ? res.data.note : note)));
      toast.success("Note updated successfully!");
      return res.data.note;
}
catch(err){
      const message = err.response?.data?.message || "Failed to update note";
      toast.error(message);
      throw message;
}
}


//delete note
const deleteNote = async (id) => {
  try {
    await API.delete(`/notes/${id}`);
    setNotes((prev) => prev.filter((note) => note._id !== id));
    toast.success("Note deleted successfully!");
  } catch (err) {
    toast.error(err.response?.data?.message || "Failed to delete note");
    throw err.response?.data?.message || "Failed to delete note";
  }
};

return (
    <NotesContext.Provider
    value={{notes, loading, error, fetchNotes, addNote,updateNote, deleteNote, searchNotes, searchQuery, setSearchQuery,}}
    >{children}
    </NotesContext.Provider>
);
};
