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
<<<<<<< HEAD

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
=======
>>>>>>> 74c5f47e0f9786c89b45061db8dfa96a3f64d55e
