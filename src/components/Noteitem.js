import React, { useContext } from 'react'
import noteContext from "../context/notes/noteContext"

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;

    const { note, updateNote } = props

    return (
        <div className="col-md-3">
            <div className="card my-3" >
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        <span onClick={() => { updateNote(note) }} className='mx-2'><i className="far fa-edit" style={{ cursor: 'pointer' }}></i></span>
                        <span onClick={() => { deleteNote(note._id); props.showAlert('Note Deleted','success') }} className='mx-2'><i className="far fa-trash-alt" style={{ cursor: 'pointer' }}></i></span>
                    </div>
                    <p className="card-text">{note.description}</p>

                </div>
            </div>
        </div>
    )
}

export default Noteitem