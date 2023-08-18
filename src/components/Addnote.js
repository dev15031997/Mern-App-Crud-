import React, { useContext, useState } from 'react'
import noteContext from "../context/notes/noteContext"

const Addnote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({title:"",description:"",tag:""})

    const onChange=(e)=>{
        const {name,value}=e.target;
        setNote({...note,[name]:value})
    }

    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag)
        setNote({title:"",description:"",tag:""})
        props.showAlert('Note added Successfully','success')
    }
    return (
        <div className="container my-3">
            <h2>Add a Note</h2>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" onChange={onChange} className="form-control" id="title" name="title" value={note.title} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" onChange={onChange} className="form-control" id="description" name="description" value={note.description} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" onChange={onChange} className="form-control" id="tag" name="tag" value={note.tag} minLength={5} required />
                </div>
                <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick} style={{ cursor: 'pointer' }}>Add note </button>
            </form>
        </div>
    )
}

export default Addnote