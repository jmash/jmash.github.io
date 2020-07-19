const checkVictory = (context, event) => {
    return true;
  }

const K4Machine =
  Machine({
    id: "K4Machine",
    initial: 'gameOff',
    states: {
      gameOff: {
        on: {
          START: {
            target: 'gameOn'
          }
        }
      },
      gameOn: {
        on: {
          OFF: {
            target: 'gameOff'
          },
          NEXT_TURN: [
            {
              target: 'playerOneTurn',
              cond: 'isPlayerOneTurn'
            },
            {
              target: 'playerTwoTurn',
              cond: 'isPlayerTwoTurn'
            }
          ]
        }
      },
      playerOneTurn: {
        on: {
          OFF: {
            target: 'gameOff'
          },
          NEXT_TURN: [
          {
            target: 'gameEnd',
            cond: 'checkVictory'
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
            target: 'gameEnd',
            cond: 'checkVictory'
          },
          {
            target: 'playerOneTurn'
          }
          ]
        }
      },
      gameEnd: {
        on: {
          START: {
            target: 'gameOn'
          }
        }
      }
    },
    guards: {
      isPlayerOneTurn: (context) => context.turn === 'playerOne',
      isPlayerTwoTurn: (context) => context.turn === 'playerTwo'
    }
  });