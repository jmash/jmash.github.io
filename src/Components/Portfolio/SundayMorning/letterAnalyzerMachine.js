import { Machine } from 'xstate';

const checkEntryEmpty = (context, event) => {
    if(event.length === 0) return true;
    return false;
}

const checkEntryOverflow = (context, event) => {
    if(event.length > 10000) return true;
    return false;
}

export const letterAnalyzerMachine = Machine({
    id: 'letteranalyzer',
    initial: 'start',
    states: {
        start: {
            on: { 
                CHANGE: [
                    {
                        target: 'start',
                        cond: checkEntryEmpty
                    },
                    {
                        target: 'error',
                        cond: checkEntryOverflow
                    },
                    {
                        target: 'execAllowed'
                    }
                ]
            }
        },
        execAllowed: {
            on: { 
                CHANGE: [
                    {
                        target: 'start',
                        cond: checkEntryEmpty
                    },
                    {
                        target: 'error',
                        cond: checkEntryOverflow
                    },
                    {
                        target: 'execAllowed'
                    }
                ]
            }
        },
        error:{
            on: {
                CHANGE: [
                    {
                        target: 'start',
                        cond: checkEntryEmpty
                    },
                    {
                        target: 'error',
                        cond: checkEntryOverflow
                    },
                    {
                        target: 'execAllowed'
                    }
                ]
            }
        }
    }
});