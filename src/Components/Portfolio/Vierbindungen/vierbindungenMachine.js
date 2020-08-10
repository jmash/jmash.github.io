import { Machine } from 'xstate';

/**
 * @desc Checks the victory condition for the game.
 * @param {Object} context 
 * @param {Object} event
 */
const checkVictory = (_, event) => {
    const grid = event.gameGrid

    // ---------------- Check Horizontals --------------------
    // limit hardcoded as 42 because 7*6=42; the dimensions never change.
    let victoryCount = 0; // number of adjacent discs of same color per row
    for(let i = 0; i < 42; i++) {
      // every seventh disc, drop to next row and reset count.
      if(i % 7 === 0) victoryCount = 0;
      // if the grid contains something
      if(grid[i]) {
        // and if there are two adjacent, like discs
        if(grid[i] === grid[i+1]) victoryCount++; // increase the count of adjacent discs
        else victoryCount = 0; // if there is a disc of another color inbetween, reset to 0
      } else victoryCount = 0; // if there is a gap, reset adjacent disc count to 0
      if(victoryCount === 3) return true; // 1 means two adjacent discs, so 3 means four adjacent
    }

    // ---------------- Check Verticals --------------------
    victoryCount = 0; // reset adjacent disc count
    console.log("check verticals");
    for(let i = 0; i < 7; i++) {
      let j = i; // column position
      while(j < 49-(7-i)) {
        console.log(j + ": " + grid[j])
        if(grid[j]) {
          if(grid[j] === grid[j+7]) { 
            victoryCount++;
            if(victoryCount === 3) return true;
          
          } else victoryCount = 0;
        } else victoryCount = 0;
        j += 7;
      }
    }
    return false;
  }

  // ---------------- Check Forward Diagonals --------------------
  

export const V4Machine =
  Machine({
    id: "V4Machine",
    initial: 'gameOff',
    states: {
      gameOff: {
        on: {
          START: {
            target: 'playerOneTurn'
          }
        }
      },
      playerOneTurn: {
        on: {
          OFF: {
            target: 'gameOff'
          },
          NEXT_TURN: [
            {
              target: 'playerOneVictory',
              cond: checkVictory
            },
            {
              target: 'playerTwoTurn'
            }
          ],
        }
      },
      playerTwoTurn: {
        on: {
          OFF: {
            target: 'gameOff'
          },
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
        on: {
          RESET: [
              {
                  target: 'gameOff'
              }
          ]
        }
      },
      playerTwoVictory: {
        on: {
          RESET: [
              {
                  target: 'gameOff'
              }
          ]
        }
      },
    },
  });