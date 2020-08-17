import React, { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import vierStyles from './Vierbindungen.module.css';
import cx from 'classnames';
import { useMachine } from '@xstate/react';
import V4Cell from './V4Cell';
import V4Disc from './V4Disc';
import gsap from 'gsap';
import { V4Machine } from './vierbindungenMachine.js';


export const Vierbindungen = () => {
    const defaultGridState = new Array(42).fill("");
    const [grid, setGrid] = useState(defaultGridState);
    const [v4Current, v4Send, v4Service] = useMachine(V4Machine);
    const ghostDiscRef = useRef(null);
    const gameGridRef = useRef(null);
    
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
        v4Send({type: 'NEXT_TURN', gameGrid: grid});
    }, [grid, v4Send]);

    /**
     * @desc Handles the event where the user clicks on a game cell.
     * @param {Number} cellXVal
     * @return void
     */
    function handleCellClick(cellXVal, cellYVal) {
        console.log(cellYVal);
        if(v4Current.matches("playerOneTurn") || v4Current.matches("playerTwoTurn")){
            v4Send({type: 'START_ANIM'});
            gsap.to(ghostDiscRef.current, {
                y: 305 - (5-cellYVal)*50,
                duration: 0.3,
                ease:"power1.in",
                onComplete: () => {
                    lockInCell(cellXVal);
                    gsap.to(ghostDiscRef.current, {
                        y: 0,
                        duration: 0,
                        onComplete: () => {
                            v4Send({type: 'FINISH'});
                        }
                    });
                }
            });
        }
    }

    function lockInCell(cellXVal) {
        // check that the game is not off or finished first before letting the click do anything.
        if(!v4Current.matches('gameOff')  
        && !v4Current.matches('playerOneVictory') 
        && !v4Current.matches('playerTwoVictory')) {
            let checkedCell = findYPos(cellXVal);
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
     * @desc Find the Y position of a cell in the game grid.
     * @return {Number} checkedCell 
     */
    function findYPos(cellXVal) {
        // set the cell we're going to check equal to the clicked cell's x value
        let yPos = cellXVal;
        // we want to check all the cells down to the last column. since every
        // row is 7 cells long, if we add 7 to the cell index we're checking,
        // we'll be at the next column down.
        while(yPos < 35) {
            // check one row ahead to see if it's occupied. if it is, don't keep going.
            if(grid[yPos+7]) break;
            // if not, go down one space in the column.
            if(!grid[yPos]) {yPos += 7;}
        }
        return yPos;
    }

    /**
     * @desc Handles the event where the user hovers over a column on the game grid
     * @return void
     */
    function handleCellHover(cellXVal) {
        ghostDiscRef.current.style.visibility = "visible";
        // get cell bounds
        const gameGridLeft = gameGridRef.current.getBoundingClientRect().x + 5;
        const gameGridTop = gameGridRef.current.getBoundingClientRect().y;
        const gameCellWidth = 50;
        const ghostDiscXPos = gameGridLeft + (gameCellWidth * cellXVal);
        ghostDiscRef.current.style.left = ghostDiscXPos + "px";
        ghostDiscRef.current.style.top = gameGridTop - 50 + "px";
    }

    /**
     * @desc Handles the event where the user stops hovering over a column on the game grid
     * @return void
     */
    function handleCellLeave() {
        // console.log('Leaving cell')
        ghostDiscRef.current.style.visibility = "hidden";
    }

    /**
     * @desc Resets the game grid back to default.
     * @return void
     */
    function resetGrid() {
        // I love that I can just do this. Thanks Linsy! :D <3
        setGrid(defaultGridState);
    }

    let startText = v4Current.matches("gameOff") ? "Start Game" : "Reset";
    // let activePlayerStyle = vierStyles['v4playerActiveOn'];

    return(
        <div style={{display: "flex", justifyContent: "center", marginTop:"50px"}}>
            <div ref={ gameGridRef } style={{width: "350px", display: "flex", flexWrap: "wrap"}}>
                { grid.map((cell, i) => {
                    // the modulus (%) is giving me the remainder of the division by 7.
                    // since the width of the rows never changes, I can always know the
                    // x value of the cell I clicked by finding the remainder of the index's
                    // division by 7 (the length of the row).
                    return <V4Cell 
                                color={cell} 
                                onClick={ () => handleCellClick(i % 7, Math.floor(findYPos(i % 7) / 7)) }
                                onMouseEnter={ () => handleCellHover(i % 7) }
                                onMouseLeave={ () => handleCellLeave(i % 7) } 
                                key={i} 
                            />
                })}

                <V4Disc ref={ ghostDiscRef } color={v4Current.context.ghostDiscColor} />
                
                <div className={cx("mt-4", "mx-auto", vierStyles['v4button'])}>
                    <span className={cx("mr-4", vierStyles['v4playerIndicOff'])}>Player 1</span>
                    <Button onClick={handleStartClick}>{ startText }</Button>
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