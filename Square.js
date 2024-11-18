import React from "react";
import "./styles.css"; 

function Square(props) {  
   return (
      <button className={props.player} onClick={props.click}>
         {props.player}
      </button>
   );
}

export default Square;
