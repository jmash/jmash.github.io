import { Machine } from 'xstate';

const inputValid = (context, event) => {
    return event.query <= 9999 && event.query > 0;
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