import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import NoteCard from '../components/NoteCard'
import { MdAdd } from 'react-icons/md'
import EditNotes from '../components/EditNotes'
import { useState } from 'react'
import Modal from 'react-modal';
import useNotes from '../hooks/useNotes'
import useAuth from '../hooks/useAuth'
// import moment from "moment";

// required for accessibility (React Modal best practice)
Modal.setAppElement("#root");

const Home = () => {
    const {getUserInfo} = useAuth();
    // const {fetchNotes} = useNotes();
    const [openModel, setOpenModel] = useState({ isShown:false, type: "add", data: null });
    const {notes, fetchNotes, deleteNote, loading} = useNotes();

    useEffect(()=>{
      fetchNotes();  //from NotesContext
      getUserInfo();  //from AuthContext
    },[]);

  return(
   <>
   <Navbar/>

   <div className='container mx-auto px-4 sm:px-6 lg:px-8 pt-10'>
     {loading && <p className="text-gray-500">Loading notes...</p>}
    <div className='grid grid-cols-3 gap-4 mt-8'>
      {/* //to dynamically render notes from backend using map function on notes */}
      {
        notes.map((note)=>(

        <NoteCard 
        key={note._id}
        title={note.title}
        content={note.content}
        // date={moment(note.createdOn).format('Do MMM YYYY')}
        date={new Date(note.updatedAt).toLocaleDateString()}
        onDelete={()=>deleteNote(note._id)} //from NotesContext
        onEdit={()=>setOpenModel({isShown:true, type: "edit", data: note})}
        />

        ))
      }
      {/* when no notes found */}
     {!loading && notes.length === 0 && (
  <p className="text-gray-400 text-center col-span-3 mt-10">
    No notes found. Click + to add one.
  </p>
)}

        
    </div>
   </div> 
   
   {/* Add button to add notes */}
   <button className='w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 fixed right-10 bottom-10' 
           onClick={()=>{
                setOpenModel({isShown:true, type:"add", data: null})
                }}> 
            <MdAdd className=" text-[32px] text-white"/> 
   </button>

{/* Modal popup appearing on clicking the add /edit buttons to add or edit notes */}
   <Modal 
   isOpen={openModel.isShown} 
   onRequestClose={()=>{setOpenModel({ isShown: false, type: "add", data: null })}} 
   style={{
    overlay:{
        backgroundColor:"rgba(0,0,0,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
   },
   }}

   className="bg-white rounded-xl shadow-lg p-6 max-w-lg w-full mx-auto"
        contentLabel={
          openModel.type === "add" ? "Add Note" : "Edit Note"
        }
   >
    
{/* addNote and updateNote will be called here inside editNotes component*/}
  <EditNotes 
  type={openModel.type}
  noteData={openModel.data}
  onClose={()=>{setOpenModel({isShown:false, type:"add" , data: null })}} 
  fetchNotes ={fetchNotes}
  />
  
</Modal>
   </>
  );
};
export default Home


//    contentLabel={openModel.type === "add" ? "Add Note" : "Edit Note"}
//    className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"