import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>  
);

const view = function( e ) {
    e.preventDefault()
    fetch('/view', {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

window.onload = function() {
    console.log("HERE")
    let viewButton = document.querySelectorAll(".view-button")
    viewButton.forEach(element => {
        element.onclick = view
    });
}
