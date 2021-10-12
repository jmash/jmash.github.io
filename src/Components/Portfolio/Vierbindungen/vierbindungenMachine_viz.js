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
    return 0;
}

const isPlayerOneTurn = (context) => {
  return context.playerTurn === 0;
}

const isPlayerTwoTurn = (context) => {
  return context.playerTurn === 1;
}

const V4Machine =
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