import { useHttp } from "../hooks/http-hook"
import React, { useCallback, useContext, useEffect } from "react"
import {useState} from "react"
import CreateArea from "./CreateArea"
import Note from "./Note"
import {AuthContext} from '../context/authContext'
import { v4 as uuidv4 } from 'uuid'




export const Notes = () => {
const auth = useContext(AuthContext)
  const {request} = useHttp()



const [note, setNote] = useState([]);

const getNotes = useCallback( async() => {

try {
const get = await request('/api/note', 'GET', null, {Authorization: `Bearer ${auth.userToken}`})

setNote(get)

}

catch(e){}

}, [auth.userToken, request])


useEffect(() => {getNotes()},[getNotes])


const addNote = async (inputNote) => {

try {
console.log(inputNote)
  const data = await request('/api/note/create', 'POST', {title: inputNote.title, content: inputNote.content}, {
    Authorization: `Bearer ${auth.userToken}`
  })
console.log(data)

const get = await request('/api/note', 'GET', null, {Authorization: `Bearer ${auth.userToken}`})

setNote(get)



}

catch(e) {}
  
  };


  const deleteNote = async (id) => {

    try {
    console.log('id is ', id)
      const data = await request('/api/note/delete', 'DELETE', {_id: id}, {
        Authorization: `Bearer ${auth.userToken}`
      })
    console.log(data)
    
    const get = await request('/api/note', 'GET', null, {Authorization: `Bearer ${auth.userToken}`})
    
    setNote(get)
    
    
    
    }
    
    catch(e) {}
      
      };

     


return (
  <div>
    
    <CreateArea
     
      addNote={addNote}
      
    />

    
{note.map((x, index) => (
      <Note
        key={uuidv4()}
        id={x._id}
        title={x.title}
        content={x.content}
        date={x.date.split(['T'])[0]}
        deleteNote={deleteNote}
        
      />
    ))}
    
    
  </div>
);
    }