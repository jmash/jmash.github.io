import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import vierStyles from './Vierbindungen.module.css';
import cx from 'classnames';
import { interpret, useMachine } from 'xstate';
import V4Cell from './V4Cell';
import { V4Machine } from './vierbindungenMachine.js';


export const Vierbindungen = (props) => {
    const [gridWidth, setGridWidth] = useState(7);
    const [gridHeight, setGridHeight] = useState(6);
    const [current, send] = useMachine(V4Machine);

    useEffect(() => {
        v4MachineService.start();
        const v4MachineService = interpret(V4Machine).onTransition(v4Current => {
            setGameCurrent(v4Current);
        });

        return function cleanup() {
            v4MachineService.stop();
        }
    });
    
    let rows = [];
    
    for(let i = 0; i < gridWidth; i++) {
        let row = [];
        for(let j = 0; j < gridHeight; j++) {
            row.push(<V4Cell x={i} y={j} />);
        }
        rows.push(row);
    }
    let grid =  <div className={cx("d-flex", "justify-content-center", vierStyles['v4container'])}>
                    {rows.map((row, i) => <div key={i} className="flex-row">{row}</div>)}
                </div>
    
    function handleStartClick() {
        v4MachineService.send({ type: 'START' });
        console.log(v4MachineService._state);
    }

    return(
        <div className={cx("d-flex", "justify-content-center", "flex-column", "align-items-center")}>
            {grid}
            <div className={cx("mt-4")}>
                <span className={cx("mr-4", vierStyles['v4playerIndicOff'])}>Player 1</span>
                <Button onClick={handleStartClick}>Start Game</Button>
                <span className={cx("ml-4", vierStyles['v4playerIndicOff'])}>Player 2</span>
            </div>
        </div>
    );
}

export default Vierbindungen;