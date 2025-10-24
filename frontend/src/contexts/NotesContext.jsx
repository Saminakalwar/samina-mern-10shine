import { createContext, useEffect, useState } from "react"
import API from "../services/api";

export const NotesContext = createContext();

export const NotesProvider = ({children})=>{
const [notes, setNotes] = useState([]);
const [error, setError] = useState(null);
const [loading, setLoading] = useState(false);

//fetch all notes 
const fetchNotes = async ()=>{
try{
    setLoading(true);
    const res = await API.get('/notes');
    setNotes(res.data.notes || []);
    setError(null);
}
catch(err){
    console.error("error fetching notes", err);
    setError(err.response?.data?.message || "Failed to load notes");
}finally{
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
        return res.data.note;
    }
    catch(err){
        throw err.response?.data?.message || "Failed to add note";
    }
}

//Edit Note
const updateNote = async(id, updateData)=>{
try{
const res = await API.put(`/notes/${id}`, updateData);
setNotes((prev)=>
    prev.map((note)=>(note._id===id ? res.data.note: note))
);
return res.data.note;
}
catch(err){
    throw err.response?.data?.message || "Failed to update note";
}
}

//delete note

const deleteNote = async(id)=>{
try{
      await API.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
}
catch(err){
      throw err.response?.data?.message || "Failed to delete note";
}
}

//autoFetch  notes when already logged in
// useEffect(()=>{
//     fetchNotes();
// },[]);

return (
    <NotesContext.Provider
    value={{notes, loading, error, fetchNotes, addNote,updateNote, deleteNote}}
    >{children}</NotesContext.Provider>
);
};

