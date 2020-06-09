import { Machine } from 'xstate';

const inputValid = (context, event) => {
    if(event.input.length === 0) return true;
    const validRE = /^\d+$/g;
    let noLetters = validRE.test(event.input);
    let inputNum = parseInt(event.input);
    return noLetters && inputNum > 0 && inputNum <= 9999;
}

export const fizzbuzzMachine = Machine({
    id: 'fizzbuzz',
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