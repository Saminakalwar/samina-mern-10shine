import React, { useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import useNotes from "../hooks/useNotes";
import { FaBold, FaItalic, FaUnderline, FaStrikethrough,FaListUl,FaListOl} from "react-icons/fa";


  const Toolbar = ({ editor }) => {
  if (!editor) return null;

  const buttonClass =
     "p-2 rounded transition text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700";
  const activeClass = "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400";

  return (
    <div className="flex flex-wrap justify-between items-center bg-[#D6CCC2] dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700 rounded-b-lg p-2">
      <div className="flex gap-1">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`${buttonClass} ${
            editor.isActive("bold") ? activeClass : ""
          }`}
          title="Bold"
        >
          <FaBold />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`${buttonClass} ${
            editor.isActive("italic") ? activeClass : ""
          }`}
          title="Italic"
        >
          <FaItalic />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`${buttonClass} ${
            editor.isActive("underline") ? activeClass : ""
          }`}
          title="Underline"
        >
          <FaUnderline />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`${buttonClass} ${
            editor.isActive("strike") ? activeClass : ""
          }`}
          title="Strikethrough"
        >
          <FaStrikethrough />
        </button>

        {/* Working bullet + numbered lists */}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${buttonClass} ${
            editor.isActive("bulletList") ? activeClass : ""
          }`}
          title="Bullet List"
        >
          <FaListUl />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`${buttonClass} ${
            editor.isActive("orderedList") ? activeClass : ""
          }`}
          title="Numbered List"
        >
          <FaListOl />
        </button>

      </div>
    </div>
  );
};

const EditNotes = ({ noteData, type, onClose, fetchNotes }) => {

  const {addNote, updateNote} = useNotes();
  const [title, setTitle] = useState(noteData?.title || "");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false); 


  const editor = useEditor({
    extensions: [
      //  Disable built-in lists before re-importing
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
        listItem: false,
        underline:false,
      }),
      Underline,
      BulletList,
      OrderedList,
      ListItem,

    ],
    content: noteData?.content || "",
    editorProps: {
      attributes: {
        class:
           "ProseMirror w-full min-h-[200px] p-3 outline-none text-sm bg-[#D6CCC2] text-gray-900 dark:bg-gray-800 dark:text-gray-100 rounded-t-lg",
      },
    },
  });

  const handleSaveNote =async()=>{
    const content = editor?.getHTML();
    if(!title.trim())
      return setError("Please enter a title");
    
   if(!content || content ==="<p></p>")
      return setError("Please add some content");
      setError("");
      setSaving(true);

      try{
        if(type === "add"){
          await addNote(title, content);
          fetchNotes();// refresh after add/update
        }
        else if(type ==="edit" && noteData?._id){
          await updateNote(noteData._id, {title, content})
        }
        onClose();
      }
      catch(err){
        setError(err.response?.data?.message || "Error saving note");
      }finally{
        setSaving(false);
      }
    
  }

  return (
<div className="fixed inset-0 flex items-center justify-center bg-transparent z-50" onClick={onClose}>
   
      <div className="w-full max-w-lg bg-[#E3D5CA] text-gray-900 dark:bg-gray-900 dark:text-gray-100 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-xl relative" onClick={(e) => e.stopPropagation()}>
       
      {/* Close Button */}
      <button
        className="w-8 h-8 rounded-full flex items-center justify-center absolute -top-3 -right-3 bg-gray-700 hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 text-white"
        onClick={onClose}
      >
        <MdClose className="text-lg" />
      </button>

      {/* Title */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-600 dark:text-gray-400">TITLE</label>
        <input
          type="text"
          className="text-2xl bg-transparent text-gray-900 dark:text-gray-100 border-b border-gray-300 dark:border-gray-700 pb-1 focus:border-blue-500 transition outline-none"
          placeholder="Enter note title..."
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 mt-4">
        <label className="text-sm text-gray-600 dark:text-gray-400">CONTENT</label>
        <div className="rounded-lg border border-gray-300 dark:border-gray-700 overflow-hidden flex flex-col">
          <EditorContent editor={editor} />
          <Toolbar editor={editor}/>
        </div>
      </div>

      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

      <button
        className="w-full mt-6 p-3 rounded-lg font-medium bg-[#8C7E73] hover:bg-[#8C7E80] dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white transition"
        onClick={handleSaveNote}
        disabled={saving}
      >
        {saving ? "Saving..." : type === "edit" ? "Update Note" : "Add Note"}
      </button>
    </div>
    </div>
  );
};

export default EditNotes;
