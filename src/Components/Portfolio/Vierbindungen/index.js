import React, { useState, useEffect, useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import vierStyles from './Vierbindungen.module.css';
import cx from 'classnames';
import { useMachine } from '@xstate/react';
import V4Cell from './V4Cell';
import V4Disc from './V4Disc';
import { V4Machine } from './vierbindungenMachine.js';


export const Vierbindungen = (props) => {
    const [gridWidth] = useState(7);
    const [gridHeight] = useState(6);
    const [grid, setGrid] = useState();
    const [v4Current, v4Send] = useMachine(V4Machine);
    let rows = [];

    // setup board
    const setupBoard = useCallback(() => {
        
        let key = 0;
        // array to store the refs to the board columns (so I can position the preview
        // disc over them)
        let colRefs = [];
        for(let i = 0; i < gridWidth; i++) {
            let row = [];
            for(let j = 0; j < gridHeight; j++) {
                key++;
                row.push(<V4Cell key={i + "_" + j} x={i} y={j} />);
            }
            rows.push(<div ref={(ref) => {colRefs.push(ref)}} key={key}>{row}</div>);
        }
        
        
    }, [gridHeight, gridWidth, rows]);
    

    useEffect(() => {
        setupBoard();
        setGrid(<div className={cx("d-flex", "justify-content-center", vierStyles['v4container'])}>
                {rows}
            </div>);
    }, [setupBoard, rows]);
    
    
    // end setup board -------
    // send START signal to machine when start button is clicked
    function handleStartClick() {
        v4Send('START');
        console.log(v4Current);
    }


    return(
        <div className={cx("d-flex", "justify-content-center", "flex-column", "align-items-center")}>
            <div style={{top:"0"}} className={cx("position-absolute")}>
                <V4Disc color="red" />
            </div>

            {grid}
            
            <div className={cx("mt-4", vierStyles['v4button'])}>
                <span className={cx("mr-4", vierStyles['v4playerIndicOff'])}>Player 1</span>
                <Button onClick={handleStartClick}>Start Game</Button>
                <span className={cx("ml-4", vierStyles['v4playerIndicOff'])}>Player 2</span>
            </div>
            
            {/* <Button className={cx(vierStyles['v4button'])} onClick={createDisc}>Create Disc</Button> */}
        </div>
    );
}

export default Vierbindungen;