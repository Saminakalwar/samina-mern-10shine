import React from 'react';
import { MdCreate, MdDelete } from 'react-icons/md';

const NoteCard = ({ title, content, date, onEdit, onDelete }) => {
  return (
    <>
      <div className="rounded-xl mt-4 p-4 bg-white shadow-md hover:shadow-xl hover:scale-[1.02] transition-transform ease-in-out duration-300">

        {/* Title Section */}
        <h6 className="text-sm font-medium">{title}</h6>

       <p
  className="text-xs text-slate-600 mt-2 line-clamp-3"
  dangerouslySetInnerHTML={{ __html: content }}
></p>


        {/* Bottom Row , Date in left and Icons in right */}
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-slate-500">{date}</span>

          <div className="flex gap-2">
            <MdCreate className="icon-btn text-green-500 hover:text-green-600" onClick={onEdit} />
            <MdDelete className="icon-btn text-red-400 hover:text-red-500" onClick={onDelete} />
          </div>
        </div>

      </div>
    </>
  );
};

export default NoteCard;
