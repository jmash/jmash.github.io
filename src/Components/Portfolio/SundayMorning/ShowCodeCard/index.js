import React from 'react';
import ShowCodeButton from '../ShowCodeButton';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Card from 'react-bootstrap/Card';
// eslint-disable-next-line import/no-webpack-loader-syntax
import FizzBuzzRaw from '!!raw-loader!../Programs/FizzBuzz/index.js';
// eslint-disable-next-line import/no-webpack-loader-syntax
import LetterAnalyzerRaw from '!!raw-loader!../Programs/LetterAnalyzer/index.js'
// eslint-disable-next-line import/no-webpack-loader-syntax
import PalindromeRaw from '!!raw-loader!../Programs/Palindrome/index.js'
// eslint-disable-next-line import/no-webpack-loader-syntax
import RandomQuoteRaw from '!!raw-loader!../Programs/RandomQuote/index.js'
// eslint-disable-next-line import/no-webpack-loader-syntax
import TicTacToeRaw from '!!raw-loader!../Programs/TicTacToe/index.js'

const ShowCodeCard = React.forwardRef((props, ref) => {
    let showRawComp;

    switch(props.programTitle) {
        case "FizzBuzz": showRawComp = FizzBuzzRaw; break;
        case "Palindrome Checker": showRawComp = PalindromeRaw; break;
        case "Random Quote Machine": showRawComp = RandomQuoteRaw; break;
        case "Letter Analyzer": showRawComp = LetterAnalyzerRaw; break;
        case "TicTacToe": showRawComp = TicTacToeRaw; break;
        default: showRawComp = FizzBuzzRaw; break;
    }

    return (
        <Card ref={props.refs.scRef} style={{backFaceVisibility:'hidden', visibility:'hidden', rotationY:-180, maxHeight: props.displayHeight}} className={'w-100 position-absolute'}>
            <ShowCodeButton icon={'back'} onClick={props.onClick} />
            <SyntaxHighlighter showLineNumbers={true} language={'javascript'} style={dark}>
                { showRawComp }
            </SyntaxHighlighter>
        </Card>
    );
});

export default ShowCodeCard;