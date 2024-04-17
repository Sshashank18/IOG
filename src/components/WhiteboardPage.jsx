import React, { useState, useRef } from 'react'
import Whiteboard from './Whiteboard';
import '../styles/WhiteboardPage.css';

function WhiteboardPage() {

    const canvasRef = useRef(null);
    const ctxRef = useRef(null);

    const [tool, setTool] = useState('pencil');
    const [color, setColor] = useState('black');
    const [elements, setElements] = useState([]);
    const [history, setHistory] = useState([]);

    const handleClearCanvas = ()=>{
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.fillRect = "white";
        ctx.clearRect(0,0, canvasRef.current.width, canvasRef.current.height)

        setElements([]);
    }

    const undo = ()=>{
        setHistory((prevHistory) => [...prevHistory, elements[elements.length - 1]]);
        setElements((prevElem) => prevElem.slice(0, prevElem.length - 1));
    }

    const redo = ()=>{
        setElements((prevElem) => [...prevElem, history[history.length - 1]]);
        setHistory((prevHistory) => prevHistory.slice(0, prevHistory.length - 1));
    }

    return (    
        <div className='row'>
            <div className="row justify-content-center align-items-center text-center py-2 ">
                <div className="col-md-3">
                    <div className="d-flex gap-1 align-items-center">
                        <label for="pencil">Pencil</label>
                        <input type="radio" id="pencil" checked={tool === "pencil"} className='mt-1' name="tool" value="pencil" onChange={(e) => setTool(e.target.value)} />
                    </div>
                    <div className="d-flex gap-1 align-items-center">
                        <label for="line">Line</label>
                        <input type="radio" id="line" checked={tool === "line"} className='mt-1' name="tool" value="line" onChange={(e) => setTool(e.target.value)} />
                    </div>
                    <div className="d-flex gap-1 align-items-center">
                        <label for="rect">Rectangle</label>
                        <input type="radio" id="rect"  checked={tool === "rect"} className='mt-1' name="tool" value="rect" onChange={(e) => setTool(e.target.value)} />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="d-flex align-items-center justify-content-center">
                        <label htmlFor='color'>Select Color: </label>
                        <input type='color' id = "color" className='mt-1 ms-3' value={color} onChange={(e)=>setColor(e.target.value)}/>
                    </div>
                </div>
                <div className="col-md-2">
                    <button className="btn btn-primary mt-1" disabled={elements.length === 0} onClick={()=>undo()}>Undo</button>
                    <button className="btn btn-outline-primary mt-1" disabled={history.length < 1} onClick={()=>redo()}>Redo</button>
                </div>
                <div className="col-md-1">
                    <button className="btn btn-danger" onClick={handleClearCanvas}>
                        Clear Canvas
                    </button>
                </div>
            </div>
            <div className="mx-auto mt-4 canvas-box">
                <Whiteboard canvasRef={canvasRef} ctxRef={ctxRef} elements={elements} setElements={setElements} tool={tool} color={color}/>
            </div>
        </div>
    )
}

export default WhiteboardPage
