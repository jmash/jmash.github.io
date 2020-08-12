import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import vierStyles from './Vierbindungen.module.css';
import cx from 'classnames';
import { useMachine } from '@xstate/react';
import V4Cell from './V4Cell';
// import V4Disc from './V4Disc';
import { V4Machine } from './vierbindungenMachine.js';


export const Vierbindungen = () => {
    const defaultGridState = new Array(42).fill("");
    const [grid, setGrid] = useState(defaultGridState);
    const [v4Current, v4Send, v4Service] = useMachine(V4Machine);
    let j = -1;
    
    /**
     * @desc send START signal to machine when start button is clicked
     * @return void
     */
    function handleStartClick() {
        switch(v4Current.value) {
            case 'gameOff':
                v4Send('START');
                break;
            case 'playerOneTurn':
                resetGrid();
                v4Send('OFF');
                break;
            case 'playerTwoTurn':
                resetGrid();
                v4Send('OFF');
                break;
            case 'playerOneVictory':
                resetGrid();
                v4Send('RESET');
                break;
            case 'playerTwoVictory':
                resetGrid();
                v4Send('RESET');
                break;
            default:
                break;
        }
    }

    /**
     * @desc Hook that logs most recent state (temporary)
     */
    useEffect(() => {
        const subscription = v4Service.subscribe(state => {
            console.log(state.event);
        });

        return subscription.unsubscribe;
    }, [v4Service]);

    useEffect(() => {
        console.log(grid);
        v4Send({type: 'NEXT_TURN', gameGrid: grid});
    }, [grid, v4Send]);

    /**
     * @desc Handles the event where the user clicks on a game cell.
     * @param {Number} cellXVal
     * @return void
     */
    function handleCellClick(cellXVal) {
        // check that the game is not off or finished first before letting the click do anything.
        if(!v4Current.matches('gameOff')  
        && !v4Current.matches('playerOneVictory') 
        && !v4Current.matches('playerTwoVictory')) {
            // set the cell we're going to check equal to the clicked cell's x value
            let checkedCell = cellXVal;
            // we want to check all the cells down to the last column. since every
            // row is 7 cells long, if we add 7 to the cell index we're checking,
            // we'll be at the next column down.
            while(checkedCell < 35) {
                // check one row ahead to see if it's occupied. if it is, don't keep going.
                if(grid[checkedCell+7]) break;
                // if not, go down one space in the column.
                if(!grid[checkedCell]) {checkedCell += 7;}
            }
            const newGrid = grid.map((cell, index) => {
                if (index === checkedCell) {
                    // this is temporary until the disc animations are implemented
                    if(v4Current.matches('playerOneTurn')) return "red";
                    else if(v4Current.matches('playerTwoTurn')) return "blue";
                }
                return cell;
            });
            // If the topmost cell in the column is empty, continue as usual. Otherwise,
            // do nothing.
            if(!grid[cellXVal]) { 
                setGrid(newGrid);
                
            }
        }    
    }

    /**
     * @desc Resets the game grid back to default.
     * @return void
     */
    function resetGrid() {
        // I love that I can just do this. Thanks Linsy! :D <3
        setGrid(defaultGridState);
    }

    /**
     * @desc For dev only; fills test grid to test certain conditions
     * @return void
     */
    function fillTestGrid() {
        let testGrid = new Array(42).fill("");
        testGrid[4] = "red";
        testGrid[12] = "red";
        testGrid[20] = "red";
        testGrid[28] = "red";
        testGrid[36] = "red";
        testGrid[11] = "blue";
        testGrid[19] = "blue";
        testGrid[27] = "blue";
        testGrid[18] = "blue";
        testGrid[26] = "blue";
        testGrid[34] = "blue";
        testGrid[25] = "red";
        testGrid[32] = "red";
        testGrid[39] = "red";
        testGrid[33] = "red";
        testGrid[40] = "red";
        testGrid[41] = "red";
        setGrid(testGrid);
    }

    let startText = v4Current.matches("gameOff") ? "Start Game" : "Reset";
    // let activePlayerStyle = vierStyles['v4playerActiveOn'];

    return(
        <div style={{display: "flex", justifyContent: "center"}}>
            <div style={{width: "350px", display: "flex", flexWrap: "wrap"}}>
                { grid.map((cell, i) => {
                    // the modulus (%) is giving me the remainder of the division by 7.
                    // since the width of the rows never changes, I can always know the
                    // x value of the cell I clicked by finding the remainder of the index's
                    // division by 7 (the length of the row).
                    if (i % 7 === 0) j++;
                    return <V4Cell x={i % 7} y={j} color={cell} onClick={ () => handleCellClick(i % 7) } key={i} />
                })}
                
                <div className={cx("mt-4", "mx-auto", vierStyles['v4button'])}>
                    <span className={cx("mr-4", vierStyles['v4playerIndicOff'])}>Player 1</span>
                    <Button onClick={handleStartClick}>{ startText }</Button>
                    <Button onClick={fillTestGrid}>Test</Button>
                    <span className={cx("ml-4", vierStyles['v4playerIndicOff'])}>Player 2</span>
                </div>
                
            </div>
        </div>
    );
}

export default Vierbindungen;
/* <V4Cell color={"red"} /> */
/* <div style={{top:"200", zIndex:"1"}} className={cx("position-absolute")}>
                {/* <V4Disc color="red" /> */
            // </div> */}

// setGrid(<div className={cx("d-flex", "justify-content-center", vierStyles['v4container'])}>
//                 {rows}
//             </div>);
// className={cx("d-flex", "justify-content-center", "flex-column", "align-items-center")}