import React from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip'
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';



export default function Note(props){
    
    return (

        
        <div className="note">



        <h1>{props.title}</h1>
<p>{props.content}</p>
<button 
onClick={(e) => {
    //console.log('this is delete click and props are:', props)
    
              props.deleteNote(props.id);
              
            }}

>
<Tooltip title='delete'>
<IconButton aria-label='delete'>
<DeleteIcon />
</IconButton>
</Tooltip>
</button>



<Tooltip title={props.date}>
        <IconButton aria-label={props.date}>
          <InfoIcon />
        </IconButton>
      </Tooltip>
        </div>
    )
}
