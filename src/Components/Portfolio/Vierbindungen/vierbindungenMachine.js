import { Machine } from 'xstate';

/**
 * @desc Checks the victory condition for the game.
 * @param {Object} context 
 * @param {Object} event
 */
const checkVictory = (_, event) => {
    const grid = event.gameGrid

    // ---------------- Check Horizontals --------------------
    console.log("horizontals");
    // limit hardcoded as 42 because 7*6=42; the dimensions never change.
    let victoryCount = 0; // number of adjacent discs of same color per row
    for(let i = 0; i < 42; i++) {
      // every seventh disc, drop to next row and reset count.
      if(i % 7 === 0) victoryCount = 0;
      // if the grid contains something
      if(grid[i]) {
        // and if there are two adjacent, like discs horizontally
        // (it also has to check and make sure the next disc isn't on the next line)
        if((grid[i] === grid[i+1]) && ((i+1) % 7 !== 0)) { 
          victoryCount++; console.log(victoryCount); 
          if(victoryCount === 3) return true; // 1 means two adjacent discs, so 3 means four adjacent
        } // increase the count of adjacent discs
        else victoryCount = 0; // if there is a disc of another color inbetween, reset to 0
      } else victoryCount = 0; // if there is a gap, reset adjacent disc count to 0
    }

    // ---------------- Check Verticals --------------------
    console.log("verticals");
    victoryCount = 0; // reset adjacent disc count
    for(let i = 0; i < 7; i++) {
      let j = i; // column position
      // the limit is set to 42+7 [one row ahead] - (7-i)[to correct for the column position]
      // this is done because the column counter increments by 7 each time, so in order to account
      // for the bottom row, the limit must be increased by one row ahead.
      while(j < 49-(7-i)) {
        // console.log(j + ": " + grid[j])
        // if the grid contains something
        if(grid[j]) {
          // and if there are two adjacent, like discs vertically
          if(grid[j] === grid[j+7]) { 
            victoryCount++; console.log(victoryCount);// increase the count of adjacent discs
            if(victoryCount === 3) return true; // 1 means two adjacent discs, so 3 means four adjacent
          } else victoryCount = 0; // if there is a disc of another color inbetween, reset to 0
        } else victoryCount = 0; // if there is a gap, reset adjacent disc count to 0
        j += 7; // jump counter to next row
      }
    }

    // ---------------- Check Backward Diagonals (\) --------------------
    console.log("backward diags");
  victoryCount = 0; // reset adjacent disc count
  // Check the diagonals that start at row 1 up to row 3. Rows 4-6 are pointless to check because
  // they don't have four possible spaces for discs anyway.
  for(let i = 0; i < 15; i += 7) {
    let j = i; // column position
    while(j < 42) {
      // if the grid contains something
      if(grid[j]) {
        // and if there are two adjacent, like discs diagonally. (worth noting, it's adding 8 because
        // getting to the same column on the row would be an increase of 7, so an increase of 8 would get
        // to the next row but one column over.)
        if(grid[j] === grid[j+8]) {
          victoryCount++; console.log(victoryCount); // increase the count of adjacent discs
          if(victoryCount === 3) return true; // 1 means two adjacent discs, so 3 means four adjacent
        } else victoryCount = 0; // if there is a disc of another color inbetween, reset to 0
      } else victoryCount = 0; // if there is a gap, reset adjacent disc count to 0
      j += 8; // jump counter to next row, one column over
    }
  }
  // Check the backward diagonals that start at column 1 and go up to column 3. Columns 4-6 are pointless
  // to check.
  for(let i = 1; i < 4; i++) {
    let j = i; // column position
    // The limit for the loop is structured specifically for column 3, where stopping at 42 would cause
    // the diagonal check to bleed over into the left hand side of the board after the 4th row.
    // To account for this, 1 is subtracted from the column position (to correct for zero-indexing), then
    // the amount is multiplied by 7 (the width of a row), and that number is then subtracted from 42.
    // It's the same as subtracting n columns worth of rows from the total number of spaces. 
    while(j < 42-(i-1)*7) {
      // if the grid contains something
      if(grid[j]) {
        if(grid[j] === grid[j+8]) {
          victoryCount++; console.log(victoryCount); // increase the count of adjacent discs
          if(victoryCount === 3) return true; // 1 means two adjacent discs, so 3 means four adjacent
        } else victoryCount = 0; // if there is a disc of another color inbetween, reset to 0
      } else victoryCount = 0; // if there is a gap, reset adjacent disc count to 0
      j += 8; // jump counter to next row, one column over
    }
  }
  // ---------------- Check Forward Diagonals (/) --------------------
  console.log("forward diags");
  victoryCount = 0; // reset adjacent disc count
  // Check the forward diagonals starting from column 4 up to column 7. Column 1-3 diagonals are pointless
  // to check because they don't contain at least four spaces.
  for(let i = 3; i < 7; i++) {
    let j = i;
    // this looks very bizarre, but what's happening is that, in order to prevent the diagonal count
    // from bleeding into the right side of the board, it has to be stopped just prior to that.
    // This takes the column's position relative to the right side of the board (hence the subtraction
    // from the column position), multiplies that value by 7, then adds one to make sure the limit is
    // correct. It then subtracts that value from 42. It's the same as removing n-1 columns worth of
    // rows from the bottom of the grid.
    while(j < 42-((6-i)*7+1)) {
      // if the grid contains something
      if(grid[j]) {
        // and if there are two adjacent, like discs diagonally. (it's adding 6 because
        // getting to the same column on the row would be an increase of 7, so an increase of 6 would get
        // to the next row but one column behind.)
        if(grid[j] === grid[j+6]) {
          victoryCount++; // increase the count of adjacent discs
          if(victoryCount === 3) return true; // 1 means two adjacent discs, so 3 means four adjacent
        } else victoryCount = 0; // if there is a disc of another color inbetween, reset to 0
      } else victoryCount = 0; // if there is a gap, reset adjacent disc count to 0
      j += 6; // jump counter to next row, one column behind
    }
  }
  // Check the forward diagonals on the first 3 rows, starting from the right side of the board.
  for(let i = 13; i < 21; i += 7) {
    let j = i;
    // it's okay to go all the way down, the numbers will never bleed over.
    while(j < 42) {
      // if the grid contains something
      if(grid[j]) {
        // and if they're alike diagonally
        if(grid[j] === grid[j+6]) {
          victoryCount++; // increase the count of adjacent discs
          if(victoryCount === 3) return true; // 1 means two adjacent discs, so 3 means four adjacent
        } else victoryCount = 0; // if there is a disc of another color inbetween, reset to 0
      } else victoryCount = 0; // if there is a gap, reset adjacent disc count to 0
      j += 6;
    }
  }
  return false;
}

const isPlayerOneTurn = (context) => {
  if(context.playerTurn === 0) return true;
  return false;
}

const isPlayerTwoTurn = (context) => {
  if(context.playerTurn === 1) return true;
  return false;
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
              actions: 'switchPlayers'
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
              actions: 'switchPlayers'
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
              cond: isPlayerOneTurn
            },
            {
              target: 'playerTwoTurn',
              cond: isPlayerTwoTurn
            }
          ]
        }
      }
    },
  }, 
  {
  actions: 
    {
      switchPlayers: (context) => {
        if(context.playerTurn === 0) {
          context.playerTurn = 1;
          context.ghostDiscColor = "blue";
        }
        else {
          context.playerTurn = 0;
          context.ghostDiscColor = "red";
        }
      },
      resetPlayers: (context) => {
        context.playerTurn = 0;
        context.ghostDiscColor = "red";
      }
    }
  });