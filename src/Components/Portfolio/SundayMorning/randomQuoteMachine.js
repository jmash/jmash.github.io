import { Machine } from 'xstate';

const checkQuoteResponse = (context, event) => {
    
}

export const randomQuoteMachine = Machine({
    id: 'randomquote',
    initial: 'idle',
    states: {
        idle: {
            on: { 
                ACTIVATE: [
                    {
                        target: 'loading'
                    }
                ]
            }
        },
        loading: {
            on: { 
                RESPONSE: [
                    {
                        target: 'idle',
                        cond: checkQuoteResponse
                    },
                    {
                        target: 'error'
                    }
                ]
            }
        },
        error:{
            on: {
                ACTIVATE: [
                    {
                        target: 'loading',
                        cond: checkQuoteResponse
                    }
                ]
            }
        }
    },
    guards: {
         checkQuoteResponse
    }
});