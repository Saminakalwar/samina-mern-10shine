import React, { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import Modal from "react-modal";
import NoteCard from "../components/NoteCard";
import EditNotes from "../components/EditNotes";
import useNotes from "../hooks/useNotes";
import useAuth from "../hooks/useAuth";

Modal.setAppElement("#root");

const Home = () => {
  const { getUserInfo } = useAuth();
  const { notes, fetchNotes, deleteNote, loading, searchQuery } = useNotes();
  const [openModel, setOpenModel] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const modalStyles = {
  overlay: {
    backgroundColor: "rgba(0,0,0,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 50,
  },
};

      useEffect(() => {
        Promise.allSettled([
        fetchNotes(),
        getUserInfo()]);
    
  }, []);

  return (
    <>
      <div className="h-screen relative flex flex-col bg-[#F5EBE0] dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 overflow-hidden">

        {/* Total Notes Counter */}
        <div className="sticky top-[60px] z-30 flex justify-end px-10 mt-2">
          <div
            key={notes.length}
            className="bg-[#8C7E73] dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white text-xs font-semibold rounded-full shadow-md px-4 py-2 animate-expand"
          >
            Total Notes: {notes.length}
          </div>
        </div>

        <div className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 pt-13 pb-20 overflow-y-auto">

          {/* Loading Skeleton Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div
                  key={idx}
                  className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
                ></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6 transition-all duration-300">
              {notes.map((note) => (
            <div key={note._id} className="animate-fadeInUp">
              <NoteCard
                title={note.title}
                content={note.content}
                date={new Date(note.updatedAt).toLocaleDateString()}
                onDelete={() => deleteNote(note._id)}
                onEdit={() =>
                  setOpenModel({ isShown: true, type: "edit", data: note })
                }
              />
            </div>
          ))}

            {!loading && notes.length === 0 && (
              <p className="text-gray-400 text-center col-span-3 mt-10">
                {searchQuery
                  ? "No matching notes found for your search."
                  : "No notes found. Click + to add one."}
              </p>
            )}
          </div>
        )}
        </div>

        {/* Add Notes Button */}
        <button
          onClick={() =>
            setOpenModel({ isShown: true, type: "add", data: null })
          }
          className="w-16 h-16 flex items-center justify-center rounded-2xl bg-[#8C7E73] hover:bg-[#8C7E80] dark:bg-indigo-600 dark:hover:bg-indigo-700 fixed right-10 bottom-10 shadow-lg transition-all duration-300"
        >
          <MdAdd className="text-[32px] text-white" />
        </button>

        {/* Modal */}
                <Modal
            isOpen={openModel.isShown}
            onRequestClose={() =>
              setOpenModel({ isShown: false, type: "add", data: null })
            }
            style={modalStyles}
            className="bg-white rounded-xl shadow-lg p-6 max-w-lg w-full mx-auto"
            contentLabel={openModel.type === "add" ? "Add Note" : "Edit Note"}
          >

          <EditNotes
            type={openModel.type}
            noteData={openModel.data}
            onClose={() =>
              setOpenModel({ isShown: false, type: "add", data: null })
            }
            fetchNotes={fetchNotes}
          />
        </Modal>
      </div>
    </>
  );
};

export default Home;