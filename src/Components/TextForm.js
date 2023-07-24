import React, { useState } from 'react';

export default function TextForm(props) {

    const handleUpClick = (event) => {
        const newText = text.toUpperCase();
        setPreviewText(newText);
        setText(newText);
        props.showAlert("Converted to Uppercase!", "success");
    }
    const handleLowClick = (event) => {
        const newText = text.toLowerCase();
        setPreviewText(newText);
        setText(newText);
        props.showAlert("Converted to Lowercase!", "success");
    }
    const handleClearClick = (event) => {
        const newText = "";
        setPreviewText(newText)
        setText(newText);
        props.showAlert("Cleared...!", "success");
    }

    const handleCopy = () => {
        try {
            const text = document.getElementById("myBox");
            text.select();
            navigator.clipboard.writeText(text.value);
            // if (text.value) {
            //     const btn = document.getElementById("cpyBtn");
            //     btn.style.backgroundColor = "#5C636A";
            //     btn.style.color = "white";
            //     btn.innerHTML = "copied!";
            // }
            props.showAlert("Copied to clipboard...!", "success");
        } catch (error) {
            props.showAlert("Mobile version not supported..!!", "danger");
        }
    }

    const handleExtraSpaces = () => {
        const newText = text.split(/[ ]+/);
        setPreviewText(newText.join(" "));
        setText(newText.join(" "));
    }

    const handleOnChange = (event) => {
        console.log("OnChange");
        setText(event.target.value)
        setPreviewText(event.target.value)
    }

    const [text, setText] = useState("");
    const [previewText, setPreviewText] = useState("");
    return (
        <div style={{ color: (props.mode === "dark") ? "white" : "black" }}>
            <div className="container" >
                <h2>{props.heading}</h2>
                <div className="mb-3">
                    <textarea className="form-control my-3" value={text} onChange={handleOnChange} id="myBox" rows="6" placeholder="Enter text here" style={{
                        backgroundColor: (props.mode === "dark") ? "#2E2E2E" : "white",
                        color: (props.mode === "dark") ? "white" : "black",
                    }}></textarea>
                    <button disabled={text.length === 0} className="btn btn-primary my-1 mx-2" onClick={handleUpClick}>Convert To Uppercase</button>

                    <button disabled={text.length === 0} className="btn btn-primary mx-2 my-1" onClick={handleLowClick}>Convert To Lowercase</button>

                    <button disabled={text.length === 0} className="btn btn-primary mx-2 my-1" onClick={handleClearClick}>Clear Text</button>

                    <button disabled={text.length === 0} className="btn btn-primary mx-2 my-1" id="cpyBtn" onClick={handleCopy}>Copy</button>

                    <button disabled={text.length === 0} className="btn btn-primary mx-2 my-1" id="rmSpc" onClick={handleExtraSpaces}>Remove Extra Spaces</button>
                </div>
            </div>
            <div className="container">
                <h2>Text Summary</h2>
                <p><strong>{text.split(/\s+/).filter((element) => { return element.length !== 0 }).length}</strong> Words And <strong>{text.length}</strong> Characters</p>
                <p><strong>{0.48 * text.split(/[ ]+/).filter((element) => { return element.length !== 0 }).length}</strong> Seconds to read</p>
                <h2>Preview</h2>
                {/* <p className="preview ">{previewText}</p> */}
                <textarea className="preview form-control my-3" value={(text.length > 0) ? previewText : "Nothing To Preview"} id="myBox" rows="5" disabled></textarea>
            </div>
        </div >
    )
}