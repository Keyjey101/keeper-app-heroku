import React, { useState } from "react"
import AddIcon from "@material-ui/icons/Add"
import Fab from "@material-ui/core/Fab"
import { Zoom } from "@material-ui/core"

export default function CreateArea(props) {
  
  const [inputNote, setInputNote] = useState({
    title: "",
    content: "",
  });

  const [zoom, setZoom] = useState(false);

  function handleChange(event) {
    
     

    const { name, value } = event.target;
    
    
    return setInputNote((prev) => ({ ...prev, [name]: value }));
  }

  function zooming() {
    
    return setZoom(true);
  }




  return (
    <div>
      <form className="create-note" style={zoom ? null : {height: "60px"}}>
      <Zoom in={true}>
          <input
            name="title"
            maxLength="12"
            placeholder="Title"
            value={inputNote.title}
            onChange={handleChange}
            onClick={zooming}
           
          />
        </Zoom>
        <Zoom in={zoom}>
        
          <textarea
            name="content"
            placeholder="Take a note..."
            rows="3"
            value={inputNote.content}
            onChange={handleChange}
            disabled={!zoom}
          />
        </Zoom>
        <Zoom in={zoom}>
          <Fab
            onClick={(e) => {
              setZoom(!zoom)
              e.preventDefault();
              props.addNote(inputNote);
              setInputNote({
                title: "",
                content: "",
              });
            }}
          >
            <AddIcon />
            </Fab>
            </Zoom>
        
      </form>
    </div>
  );
}
