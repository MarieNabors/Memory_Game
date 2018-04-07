import React from "react";
import './memoryCrds.css';

const MemoryCards = props => (
    // template for cards, passing on click method and the json object properties

   <div className="card" onClick={() => props.handleClick(props.id)} id={props.id}>
        <img alt={props.name} src={props.url} className="img" />
    </div>
);
  
// exporting memory cards component
export default MemoryCards;