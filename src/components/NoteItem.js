import React, { useContext } from 'react';
import noteContext from '../context/noteContext';

const NoteItem = (props) => {
    const { note, updateNote } = props;
    const context = useContext(noteContext);
    const {deleteNote} = context;
    return (
        <div className="max-w-sm rounded-md overflow-hidden shadow-lg mx-auto bg-white gap-5 relative">
            <div className='flex justify-end items-end px-6 py-4 absolute top-0 right-0 opacity-0 group transition-opacity duration-300 hover:opacity-100'>
                <i className="fa-solid fa-trash" onClick={()=>{deleteNote(note._id)}}></i>
                <i className="fa-solid fa-pen-to-square mx-3" onClick={()=>{updateNote(note)}}></i>
            </div>
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{note.title}</div>
                <p className="text-gray-700 text-base">
                    {note.description}
                </p>
            </div>

            <div className="px-6 py-4">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{note.tag}</span>
            </div>
        </div>
    );
}

export default NoteItem;
