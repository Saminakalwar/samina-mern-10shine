import React from 'react';
import { MdCreate, MdDelete } from 'react-icons/md';

const NoteCard = ({ title, content, date, onEdit, onDelete }) => {
  return (
    <>
      <div className=" group relative rounded-xl p-4 bg-[#E3D5CA] dark:bg-gray-800 shadow-md hover:shadow-xl hover:scale-[1.08] transition-transform duration-300 ease-in-out cursor-pointer min-h-[130px] max-h-[130px] flex flex-col justify-between">

        {/* Title Section */}
        <h6 className="note-title-gradient text-sm font-semibold">{title}</h6>


          <p  className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-3"
      dangerouslySetInnerHTML={{ __html: content }}  ></p>
   

        {/* Bottom Row — Date (left) and Icons (right) */}
        <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-200 dark:border-gray-700">
          <span className="text-xs text-slate-500">{date}</span>

          <div className="flex gap-2">
            <MdCreate data-testid="edit-icon" className="icon-btn text-green-500 hover:text-green-600 " onClick={onEdit} />
            <MdDelete data-testid="delete-icon" className="icon-btn text-red-700 hover:text-red-500" 
            onClick={() => {
              if (window.confirm("Are you sure you want to delete this note?")) {
                onDelete();
              }
            }}
            />
          </div>
        </div>

      </div>
    </>
  );
};

export default NoteCard;
