import { Machine, assign } from 'xstate';

const checkVictory = (_, event) => {
  const grid = event.gameGrid
  const rowMax = 6;
  const colMax = 7;

  function checkHorizontals() {
    let victoryCount = 0;
    const checkLength = 4;
    
    for(let i = 0; i < rowMax; i++) {
      for(let j = 0; j < colMax - (checkLength - 1); j++) {
        victoryCount = 0;
        let compCell = grid[i*colMax+j];
        if(compCell) {
          for(let k = 0; k < checkLength; k++) {
            if((grid[i*colMax + (j + k)] === grid[i*colMax + ((j + k) + 1)] && 
                grid[i*colMax + (j + k)] === compCell)) {
              victoryCount++;
            }

            if(victoryCount === 3) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }

  function checkVerticals() {
    let victoryCount = 0;
    const checkLength = 4;

    for(let i = 0; i < colMax; i++) {
      for(let j = 0; j < (rowMax-(checkLength-1)); j++) {
        victoryCount = 0;
        let compCell = grid[i+j*colMax];
        if(compCell) {
          for(let k = 0; k < checkLength; k++) {
            if(grid[i + (j + k)*colMax] === grid[i + (j + k + 1)*colMax] && 
              grid[i + (j + k)*colMax] === compCell) {
              victoryCount++;

              if(victoryCount === 3) {
                return true;
              }
            }
          }
        }
      }
    }
    return false;
  }
  
  function checkBackwardDiagonals() {
    let victoryCount = 0;
    const checkLength = 4;
    const rowOffset = rowMax - checkLength;

    for(let i = colMax*rowOffset; i >= 0; i -= colMax) {
      for(let k = 0; k < checkLength; k++) {
        victoryCount = 0;
        let compCell = grid[i + k];
        if(compCell) {
          for(let j = i + k; j < i + checkLength*(colMax-1); j += colMax+1) {
            if(grid[j] === grid[j + (colMax + 1)] && grid[j + (colMax + 1)] === compCell){
                victoryCount++;
            }
            
            if(victoryCount === 3) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }

  function checkForwardDiagonals() {
    let victoryCount = 0;
    const checkLength = 4;
    const rowOffset = rowMax - checkLength;
    const colOffset = colMax - checkLength;

    for(let i = colMax*rowOffset+colOffset; i >= 0; i -= colMax) {
      for(let k = 0; k < checkLength; k++) {
        victoryCount = 0;
        let compCell = grid[i + k];
        if(compCell) {
          for(let j = i + k; j < i + checkLength*(colMax-colOffset); j += colMax-1) {
            if(grid[j] === grid[j + (colMax - 1)] && grid[j + (colMax - 1)] === compCell){
                victoryCount++;
            }
            
            if(victoryCount === 3) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }
  console.log(checkHorizontals() || checkVerticals() || checkBackwardDiagonals() || checkForwardDiagonals());
  return(checkHorizontals() || checkVerticals() || checkBackwardDiagonals() || checkForwardDiagonals());
}

const changeToPlayerOneColor = assign({
  ghostDiscColor: (context) => context.ghostDiscColor = "red"
});

const changeToPlayerTwoColor = assign({
  ghostDiscColor: (context) => context.ghostDiscColor = "blue"
});

export const V4Machine =
  Machine({
    id: "V4Machine",
    initial: "gameOff",
    context: {
      ghostDiscColor: "red"
    },
    states: {
      gameOff: {
        on: {
          START: {
            target: 'gameOn'
          }
        }
      },
      gameOn: {
        initial: 'playerOneTurn',
        on: {
          RESET: {
            target: 'gameOff'
          },
          PLAYER_ACTION: {
            target: 'dropDiscAnim'
          },
        },
        states: {
          playerOneTurn: {
            entry: 'changeToPlayerOneColor',
            on: {
              NEXT_TURN: [
                {
                  target: 'playerOneVictory',
                  cond: checkVictory
                },
                {
                  target: 'playerTwoTurn'
                }
              ]
            }
          },
          playerTwoTurn: {
            entry: 'changeToPlayerTwoColor',
            on: {
              NEXT_TURN: [
                {
                  target: 'playerTwoVictory',
                  cond: checkVictory
                },
                {
                  target: 'playerOneTurn'
                }
              ]
            }
          },
          playerOneVictory: {
          },
          playerTwoVictory: {
          },
          
          hist: {
            type: 'history',
            history: 'shallow'
          }
        }
      },

      dropDiscAnim: {
        on: {
          FINISH: {
            target: 'gameOn.hist',
          }
        }
      },
    },
    
}, {
  actions: {
    changeToPlayerOneColor,
    changeToPlayerTwoColor
  }
});