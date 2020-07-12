import { Machine } from 'xstate';

const checkVictory = (context, event) => {
    console.log(event.display);
    // check horizontals
    for(let i = 0; i <= 2; i++) {
        let sameCount = 0;
        for(let j = 0; j <= 2; j++) {
            if(event.display[i][j]) {
                if(event.display[i][j] === event.display[i][j+1]) sameCount++;
            }
        }
        if(sameCount === 2) return true;
    }
    // check verticals
    for(let j = 0; j <= 2; j++) {
        let sameCount = 0;
        for(let i = 0; i <= 1; i++) {
            if(event.display[i][j]) {
                if(event.display[i][j] === event.display[i+1][j]) sameCount++;
            }
        }
        if(sameCount === 2) return true;
    }
    // check diagonals
    let sameCount = 0;
    for(let i = 0; i <= 1; i++) {
        if(event.display[i][i]) {
            if(event.display[i][i] === event.display[i+1][i+1]) sameCount++;
        }
        if(sameCount === 2) return true;
    }
    sameCount = 0;
    for(let i = 0; i <= 1; i++) {
        if(event.display[i][2-i]) {
            if(event.display[i][2-i] === event.display[i+1][1-i]) sameCount++;
        }
        if(sameCount === 2) return true;
    }
    return false;
    // check if draw
}

const checkDraw = (context, event) => {
    let drawCount = 0;
    for(let i = 0; i <= 2; i++) {
        for(let j = 0; j <= 2; j++) {
            if(event.display[i][j] !== '') {
                drawCount++;
            }
        }
    }
    if(drawCount === 9) return true;
    return false;
}
// const checkResetGame = (context, event) => {
//     if(event.resetFlag) return true;
//     return false;
// }

export const tictactoeMachine = Machine({
    id: 'tictactoe',
    initial: 'reset',
    states: {
        reset: {
            on: { 
                START_GAME: [
                    {
                        target: 'playerOneTurn',
                    },
                ]
            }
        },
        resetAnim: {
            on: {
                ANIM_FINISH: {
                    target: 'reset'
                }
            }
        },
        playerOneTurn: {
            on: { 
                TURN_TAKEN: [
                    {
                        target: 'playerOneVictory',
                        cond: checkVictory
                    },
                    {
                        target: 'gameDraw',
                        cond: checkDraw
                    },
                    {
                        target: 'playerTwoTurn'
                    }
                ],
                RESET: [
                    {
                        target: 'resetAnim'
                    }
                ]
            }
        },
        playerTwoTurn:{
            on: {
                TURN_TAKEN: [
                    {
                        target: 'playerTwoVictory',
                        cond: checkVictory
                    },
                    {
                        target: 'gameDraw',
                        cond: checkDraw
                    },
                    {
                        target: 'playerOneTurn'
                    }
                ],
                RESET: [
                    {
                        target: 'resetAnim'
                    }
                ]
            }
        },
        playerOneVictory:{
            on: {
                RESET: [
                    {
                        target: 'resetAnim'
                    }
                ]
            }
        },
        playerTwoVictory:{
            on: {
                RESET: [
                    {
                        target: 'resetAnim'
                    }
                ]
            }
        },
        gameDraw: {
            on: {
                RESET: [
                    {
                        target: 'resetAnim'
                    }
                ]
            }
        }
    },
});