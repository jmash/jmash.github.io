import { Machine, assign } from 'xstate';

const switchToPlayerOne = assign({
  playerTurn: (context) => context.playerTurn = 0,
});

const switchToPlayerTwo = assign({
  playerTurn: (context) => context.playerTurn = 1,
});

const switchToPlayerOneDiscColor = assign({
  ghostDiscColor: (context) => context.ghostDiscColor = "blue"
});

const switchToPlayerTwoDiscColor = assign({
  ghostDiscColor: (context) => context.ghostDiscColor = "red"
});

const resetPlayers = assign({
  playerTurn: (context) => context.playerTurn = 0,
  ghostDiscColor: (context) => context.ghostDiscColor = "red"
});

const logIt = (context) => {
  console.log(context);
}

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

const isPlayerOneTurn = (context) => {
  return context.playerTurn === 0;
}

const isPlayerTwoTurn = (context) => {
  return context.playerTurn === 1;
}

export const V4Machine =
  Machine({
    id: "V4Machine",
    context: {
      playerTurn: 0,
      ghostDiscColor: "red"
    },
    initial: 'gameOff',
    states: {
      gameOff: {
        on: {
          START: {
            target: 'playerOneTurn',
            actions: 'resetPlayers'
          }
        }
      },
      playerOneTurn: {
        on: {
          OFF: {
            target: 'gameOff'
          },
          START_ANIM: {
            target: 'discDropAnim'
          },
          NEXT_TURN: [
            {
              target: 'playerOneVictory',
              cond: checkVictory,
            },
            {
              target: 'playerTwoTurn',
              actions: ['switchToPlayerTwo', 'switchToPlayerTwoDiscColor'] 
            }
          ],
        }
      },
      playerTwoTurn: {
        on: {
          OFF: {
            target: 'gameOff'
          },
          START_ANIM: {
            target: 'discDropAnim'
          },
          NEXT_TURN: [
            {
              target: 'playerTwoVictory',
              cond: checkVictory
            },
            {
              target: 'playerOneTurn',
              actions: ['switchToPlayerOne', 'switchToPlayerOneDiscColor'] 
            }
          ]
        }
      },
      playerOneVictory: {
        on: {
          RESET: [
            {
              target: 'gameOff',
            }
          ]
        }
      },
      playerTwoVictory: {
        on: {
          RESET: [
            {
              target: 'gameOff',
            }
          ]
        }
      },
      discDropAnim: {
        on: {
          FINISH: [
            {
              target: 'playerOneTurn',
              actions: ['switchToPlayerOne', 'switchToPlayerOneDiscColor'],
              cond: isPlayerOneTurn
            },
            {
              target: 'playerTwoTurn',
              actions: ['switchToPlayerTwo', 'switchToPlayerTwoDiscColor'], 
              cond: isPlayerTwoTurn
            }
          ]
        }
      }
    },
  }, 
  {
  actions: {
      switchToPlayerOne, 
      switchToPlayerTwo,
      switchToPlayerOneDiscColor,
      switchToPlayerTwoDiscColor,
      resetPlayers,
      logIt
    }
  });