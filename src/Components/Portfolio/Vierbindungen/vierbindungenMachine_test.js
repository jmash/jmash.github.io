import { Machine, assign } from 'xstate';

// const switchToPlayerOne = assign({
//   playerTurn: (context) => context.playerTurn = 0,
// });

// const switchToPlayerTwo = assign({
//   playerTurn: (context) => context.playerTurn = 1,
// });

// const switchToPlayerOneDiscColor = assign({
//   ghostDiscColor: (context) => context.ghostDiscColor = "blue"
// });

// const switchToPlayerTwoDiscColor = assign({
//   ghostDiscColor: (context) => context.ghostDiscColor = "red"
// });

// const resetPlayers = assign({
//   playerTurn: (context) => context.playerTurn = 0,
//   ghostDiscColor: (context) => context.ghostDiscColor = "red"
// });

// const logIt = (context) => {
//   console.log(context);
// }

const checkVictory = (_, event) => {
    return 0;
}

// const isPlayerOneTurn = (context) => {
//   return context.playerTurn === 0;
// }

// const isPlayerTwoTurn = (context) => {
//   return context.playerTurn === 1;
// }

const V4Machine =
  Machine({
    id: "V4Machine",
    initial: "gameOff",
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
          }
        },
        states: {
          playerOneTurn: {
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
            target: 'gameOn.hist'
          }
        }
      },
    }    
});