import React, {useState, useEffect} from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import Split from "react-split"
import {nanoid} from "nanoid"
import './App.css'

export default function App() {
    
    const [notes, setNotes] = useState(
      () =>  JSON.parse(localStorage.getItem('notes')) || []
    )
    const [currentNoteId, setCurrentNoteId] = useState(
        (notes[0] && notes[0].id) || ""
    )
    
    const createNewNote = () => {
        const newNote = {
            id: nanoid(),
            body: "# Type your markdown note's title here"
        }
        setNotes(prevNotes => [newNote, ...prevNotes])
        setCurrentNoteId(newNote.id)
    }
    
    const updateNote = (text) => {
        const retArr = []

        for(let i = 0; i < notes.length; i++) {
            const currNote = notes[i]
            if(currNote.id === currentNoteId) {
                retArr.unshift({...currNote, body: text})
            }
            else {
                retArr.push(currNote)
            }
        }

        setNotes(retArr)
    }
    
    const findCurrentNote = () => {
        return notes.find(note => {
            return note.id === currentNoteId
        }) || notes[0]
    }

    const deleteNote = (e, id) => {
        e.stopPropagation()
        setNotes(prevNotes => prevNotes.filter(note => note.id !== id)) 
    }

    useEffect(() => {
      localStorage.setItem("notes", JSON.stringify(notes))
    }, [notes])
    
    return (
        <main>
        {
            notes.length > 0 
            ?
            <Split 
                sizes={[30, 70]} 
                direction="horizontal" 
                className="split"
            >
                <Sidebar
                    notes={notes}
                    currentNote={findCurrentNote()}
                    setCurrentNoteId={setCurrentNoteId}
                    newNote={createNewNote}
                    deleteNote={deleteNote}
                />
                {
                    currentNoteId && 
                    notes.length > 0 &&
                    <Editor 
                        currentNote={findCurrentNote()} 
                        updateNote={updateNote} 
                    />
                }
            </Split>
            :
            <div className="no-notes">
                <h1>You have no notes</h1>
                <button 
                    className="first-note" 
                    onClick={createNewNote}
                >
                    Create one now
                </button>
            </div>
            
        }
        </main>
    )
}
