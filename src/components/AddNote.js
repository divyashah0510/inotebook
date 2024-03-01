import React, { useContext, useState } from 'react';
import noteContext from '../context/noteContext';

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNotes } = context;
    const [notes, setnotes] = useState({ title: "", description: "", tag: "" });

    const handleClick = (e) => {
        e.preventDefault();
        props.showAlert("Note Added Successfully", "green");
        addNotes(notes.title, notes.description, notes.tag);
    }
    const handleChange = (e) => {
        setnotes({ ...notes, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <h1 className='font-extrabold text-3xl text-center mt-5'>Enter your Note</h1>
            <form className="max-w-sm mx-auto">
                <div className="mb-5">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                    <input name='title' type="text" placeholder='John Doe' id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange} minLength={5} required />
                </div>
                <div className="mb-5">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                    <input name='description' type="text" placeholder='Describe your notes here...' id="description" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange} minLength={5} required />
                </div>
                <div>
                    <label htmlFor="tag" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tag</label>
                    <input name='tag' type="text" placeholder='Personal, Group, etc..' id="tag" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange} minLength={5} required />
                </div>
                <div>
                    <button className="mt-5 w-28 bg-green-500 hover:bg-green-700 text-white font-extrabold py-2 px-4 rounded-xl" disabled={notes.title.length < 5 || notes.description.length < 5} onClick={handleClick}>Add note</button>
                </div>
            </form>
        </div>
    )
}

export default AddNote