import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
    const noteInitial = []

    const [notes, setnotes] = useState(noteInitial);

    // Get all notes

    const getNotes = async () => {
        // API call
        const response = await fetch(`${process.env.REACT_APP_HOSTNAME}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkMzE4MGNiNmJlYzc5NzU0NGMxOGIzIn0sImlhdCI6MTcwODMzMzA5OX0.UENZheZJulY1gERVd0j6hujbTNNjSqn-Z4gQ5HtPrVM"
            }
        });
        const json = await response.json();
        console.log("Response from server: ", json);
        setnotes(json);
    }

    // Add a note

    const addNotes = async(title, description, tag) => {
        // API call
        console.log("Adding the note with title: " + title);
        const response = await fetch(`${process.env.REACT_APP_HOSTNAME}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        console.log("Response from server: ", json);

        // Login to add client side
        const note = {
            "_id": "65df4842a23e8c7813e01be6",
            "user": "65d3180cb6bec797544c18b3",
            "title": "The Great Gatsby",
            "description": "The story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan, of lavish parties on Long Island at a time when The New York Times noted “gin was the national drink and sex the national obsession,” it is an exquisitely crafted tale of America in the 1920s.Here updated version. updated",
            "tag": "personal",
            "date": "2024-02-28T14:50:42.646Z",
            "__v": 0
        }
        setnotes(notes.concat(note))
    }

    // Edit a note

    const editNote = async(id, title, description, tag) => {
        console.log("Editing the note with id: " + id);
        // API call
        const response = await fetch(`${process.env.REACT_APP_HOSTNAME}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })

        });
        const json = await response.json();
        console.log("Response from server: ", json);



        // Login to edit client side
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
                break;
            }
        }
    }

    // Delete a note

    const deleteNote = async(id) => {
        console.log("Deleting the note with id: " + id);
        // API call
        const response = await fetch(`${process.env.REACT_APP_HOSTNAME}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkMzE4MGNiNmJlYzc5NzU0NGMxOGIzIn0sImlhdCI6MTcwODMzMzA5OX0.UENZheZJulY1gERVd0j6hujbTNNjSqn-Z4gQ5HtPrVM"
            }
        });
        const json = await response.json();
        console.log("Response from server: ", json);

        const newNotes = notes.filter((note) => { return note._id !== id })
        setnotes(newNotes);
    }

    return (
        <noteContext.Provider value={{ notes,getNotes, setnotes, addNotes, editNote, deleteNote }}>
            {props.children}
        </noteContext.Provider>
    )
};
export default NoteState;