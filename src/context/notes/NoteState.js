import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const [notes, setNotes] = useState([])

    //0. Get all Notes
    const getNotes = async () => {
        // Api call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json=await response.json()
        setNotes(json)
    }

    //1. Add a note
    const addNote = async (title, description, tag) => {
        // Api call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag})
        });
        const note=await response.json()
        setNotes(notes.concat(note))
    }

    //2. Edit a note
    const editNote = async (id, title, description, tag) => {
        // Api call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag})
        });
        const json = await response.json();
      
        // Logic
        let newNotes=JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < notes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes)
    }

    //3. Delete a note
    const deleteNote = async (id) => {
        // Api call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();

        // Logic
        const newNotes = notes.filter((note) => {
            return note._id !== id
        })
        setNotes(newNotes)
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote,getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;