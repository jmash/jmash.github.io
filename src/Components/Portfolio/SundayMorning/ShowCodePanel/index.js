import React, { useRef, useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Highlight from 'react-highlight.js';
import cx from 'classnames';
// eslint-disable-next-line import/no-webpack-loader-syntax
import FizzBuzzRaw from '!!raw-loader!../FizzBuzz/index.js';
// eslint-disable-next-line import/no-webpack-loader-syntax
import LetterAnalyzerRaw from '!!raw-loader!../LetterAnalyzer/index.js'
// eslint-disable-next-line import/no-webpack-loader-syntax
import PalindromeRaw from '!!raw-loader!../Palindrome/index.js'
// eslint-disable-next-line import/no-webpack-loader-syntax
import RandomQuoteRaw from '!!raw-loader!../RandomQuote/index.js'
// eslint-disable-next-line import/no-webpack-loader-syntax
import TicTacToeRaw from '!!raw-loader!../TicTacToe/index.js'
import showCodePanelStyles from './ShowCodePanel.module.css';

const ShowCodePanel = (props) => {
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
        <Card ref={backCardRef} style={{position: 'absolute', minWidth: props.displayWidth, width: props.displayWidth, height: props.displayHeight, margin: 0, padding: 0}}>
            <Highlight style={{maxHeight: props.displayHeight}} className={cx(showCodePanelStyles['codeDisplay'])} language={'javascript'}>
                { showRawComp }
            </Highlight>
        </Card>

    );
};

export default ShowCodePanel;

/*
<Col className={cx(showCodePanelStyles['paddingor'])}>
    <div ref={displayRef} style={{width: 0, height: props.panelHeight, margin: 0}} className={cx(showCodePanelStyles['panelDisplaySide'], "javascript")}>
        <pre ref={preRef} style={{height: props.panelHeight, margin: 0}}>
            <code>
                <p className={cx(showCodePanelStyles['codeDisplay'])}>{ showRawComp }</p>
            </code>
        </pre>
    </div>
</Col>
*/