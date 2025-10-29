import React from "react";
import "./Loader.css";

const Loader=() =>{
    return(
         <div className="lds-ring loader-container">
            <div></div><div></div><div></div><div></div>
         </div>
    );
}


export default Loader;