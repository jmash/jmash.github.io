import React from 'react';
import ShowCodeButton from '../ShowCodeButton';
import Card from 'react-bootstrap/Card';
import Highlight from 'react-highlight.js';
import cx from 'classnames';
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
import showCodeCardStyles from './ShowCodeCard.module.css';

const ShowCodeCard = (props) => {
    let showRawComp;
    const { backCardRef } = props;

    switch(props.showComp) {
        case "FizzBuzz": showRawComp = FizzBuzzRaw; break;
        case "Palindrome": showRawComp = PalindromeRaw; break;
        case "LetterAnalyzer": showRawComp = LetterAnalyzerRaw; break;
        case "RandomQuote": showRawComp = RandomQuoteRaw; break;
        case "TicTacToe": showRawComp = TicTacToeRaw; break;
        default: showRawComp = FizzBuzzRaw; break;
    }
    
    return (
        <Card ref={backCardRef} style={{maxHeight: props.displayHeight}} className={'w-75 position-absolute'}>
            <ShowCodeButton />
            <Highlight language={'javascript'}>
                { showRawComp }
            </Highlight>
        </Card>
    );
};

export default ShowCodeCard;