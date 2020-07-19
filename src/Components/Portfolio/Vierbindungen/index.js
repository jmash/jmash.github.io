import React, { useRef, useState, useEffect } from 'react';
import V4Cell from './V4Cell';


export const Vierbindungen = (props) => {
    const [gridWidth, setGridWidth] = useState(7);
    const [gridHeight, setGridHeight] = useState(6);
    const [gameState, setGameState] = useState(0);
    
    let rows = [];
    
    for(let i = 0; i < gridWidth; i++) {
        let row = [];
        for(let j = 0; j < gridHeight; j++) {
            row.push(<V4Cell x={i} y={j} />);
        }
        rows.push(row);
    }
    let grid = <div class="d-flex justify-content-center v4container">{rows.map(row => <div class="flex-row">{row}</div>)}</div>
    
    return(
        <div class="">
            <p>Vierbindungen</p>
            {grid}
        </div>
    );
}

export default Vierbindungen;