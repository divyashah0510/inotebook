import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/noteContext'
import NoteItem from './NoteItem';
import AddNote from './AddNote';

const Notes = () => {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    useEffect(() => {
        getNotes();
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

    const updateNote = (currentNote) => {
        toggleModal();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }
    const handleClick = (e) => {
        e.preventDefault();
        editNote(note.id, note.etitle, note.edescription, note.etag);
        setTimeout(() => {
            toggleModal();
        }, 3000);

    }

    const toggleModal = () => {
        setModalOpen(!isModalOpen);
    };

    return (
        <div>
            <AddNote />


            <button
                data-modal-target="crud-modal"
                onClick={toggleModal}
                className="hidden text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
            >
                Toggle modal
            </button>
            {isModalOpen && (
                <div className="fixed inset-0 mx-auto flex items-center justify-center backdrop-opacity-95 backdrop-blur-md">
                    <div
                        id="crud-modal"
                        tabIndex="-1"
                        ref={ref}
                        aria-hidden="true"
                        className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
                    >
                        <div className="relative p-4 w-full max-w-md max-h-full">
                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Update the Note
                                    </h3>
                                    <button
                                        type="button"
                                        onClick={toggleModal}
                                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                        <svg
                                            className="w-3 h-3"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 14 14"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                            />
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>
                                <form className="p-4 md:p-5">
                                    {/* Your form content */}
                                    <div className="mb-5">
                                        <label htmlFor="etitle" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                        <input name='etitle' type="text" placeholder='John Doe' id="etitle" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={note.etitle} onChange={onChange} minLength={5} required />
                                    </div>
                                    <div className="mb-5">
                                        <label htmlFor="edescription" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                        <input name='edescription' type="text" placeholder='Describe your notes here...' id="edescription" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={note.edescription} onChange={onChange} minLength={5} required />

                                    </div>
                                    <div>
                                        <label htmlFor="etag" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tag</label>
                                        <input name='etag' type="text" placeholder='Personal, Group, etc..' id="etag" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={note.etag} onChange={onChange} minLength={5} required />

                                    </div>
                                    <div>
                                        <button className="mt-5 w-28 bg-green-500 hover:bg-green-700 text-white font-extrabold py-2 px-4 rounded-xl" onClick={handleClick}>Update</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            <h1 className='text-center text-3xl font-extrabold mt-9 mb-9'>Your Notes</h1>
            <div className='text-center container mx-auto'>
                {notes.length === 0 && <p className='text-center mx-auto text-2xl'>No notes to display 🤫</p>}
            </div>
            <div className=' justify-center items-center grid grid-rows-4 grid-cols-4'>
                {notes.map((note) => {
                    return (
                        <NoteItem note={note} updateNote={updateNote} key={note._id} />
                    )
                })}
            </div>

        </div>
    )
}

export default Notes