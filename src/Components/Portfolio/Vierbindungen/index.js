import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import vierStyles from './Vierbindungen.module.css';
import cx from 'classnames';
import { useMachine } from '@xstate/react';
import V4Cell from './V4Cell';
import V4Disc from './V4Disc';
import { V4Machine } from './vierbindungenMachine.js';


export const Vierbindungen = (props) => {
    const [gridWidth, setGridWidth] = useState(7);
    const [gridHeight, setGridHeight] = useState(6);
    const [v4Current, v4Send] = useMachine(V4Machine);

    // setup board -------
    let rows = [];
    let key = 0;

    for(let i = 0; i < gridWidth; i++) {
        let row = [];
        for(let j = 0; j < gridHeight; j++) {
            key++;
            row.push(<V4Cell key={i + "_" + j} x={i} y={j} />);
        }
        rows.push(<div key={key}>{row}</div>);
    }

    let grid =  <div className={cx("d-flex", "justify-content-center", vierStyles['v4container'])}>
                    {rows}
                </div>
    // end setup board -------
    
    // send START signal to machine when start button is clicked
    function handleStartClick() {
        v4Send('START');
        console.log(v4Current);
    }

    // 
    function createDisc() {
        console.log("createDisc");
    }

    return(
        <div className={cx("d-flex", "justify-content-center", "flex-column", "align-items-center")}>
            <div className={cx("position-absolute")}>
                <V4Disc />
            </div>
            {grid}
            
            <div className={cx("mt-4", vierStyles['v4button'])}>
                <span className={cx("mr-4", vierStyles['v4playerIndicOff'])}>Player 1</span>
                <Button onClick={handleStartClick}>Start Game</Button>
                <span className={cx("ml-4", vierStyles['v4playerIndicOff'])}>Player 2</span>
            </div>
            
            <Button className={cx(vierStyles['v4button'])} onClick={createDisc}>Create Disc</Button>
        </div>
    );
}

export default Vierbindungen;