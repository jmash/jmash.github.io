import { Machine } from 'xstate';

const inputValid = (context, event) => {
    if(event.input.length === 0) return true;
    const validRE = /^[a-zA-Z0-9\s]+$/g;
    let noSpecialChars = validRE.test(event.input);
    return noSpecialChars;
}

export const palindromeMachine = Machine({
    id: 'palindrome',
    initial: 'execAllowed',
    states: {
        execAllowed: {
            on: { 
                CHANGE: [
                    {
                        target: 'execAllowed',
                        cond:  inputValid,
                    },
                    {
                        target: 'execDisallowed'
                    }
                ]
            }
        },
        execDisallowed: {
            on: { 
                CHANGE: [
                    {
                        target: 'execAllowed',
                        cond:  inputValid,
                    },
                    {
                        target: 'execDisallowed'
                    }
                ]
            }
        }
    },
    guards: {
        inputValid
    }
});