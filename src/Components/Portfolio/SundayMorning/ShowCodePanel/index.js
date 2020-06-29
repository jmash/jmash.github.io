import React, { useRef } from 'react';
import Col from 'react-bootstrap/Col';
import gsap from 'gsap';
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
import TicTacToeRaw from '!!raw-loader!../RandomQuote/index.js'
import showCodePanelStyles from './ShowCodePanel.module.css';

const ShowCodePanel = (props) => {
    let showRawComp;
    console.log(props);
    
    const displayRef = useRef(null);
    
    if(displayRef) {
        animateShowCode(props, displayRef);
    }
    switch(props.showComp) {
        case "FizzBuzz": showRawComp = FizzBuzzRaw; break;
        case "Palindrome": showRawComp = PalindromeRaw; break;
        case "LetterAnalyzer": showRawComp = LetterAnalyzerRaw; break;
        case "RandomQuote": showRawComp = RandomQuoteRaw; break;
        case "TicTacToe": showRawComp = TicTacToeRaw; break;
        default: showRawComp = FizzBuzzRaw; break;
    }

    return (
        <Col className={cx(showCodePanelStyles['paddingor'])}>
            <div ref={displayRef} style={{width: 0, height: props.panelHeight}} className={cx(showCodePanelStyles['panelDisplay'])}>
                <code>
                    <p className={cx(showCodePanelStyles['codeDisplay'])}>{ showRawComp }</p>
                </code>
            </div>
        </Col>
    );
};


function animateShowCode(props, ref) {
    if(props.showCodeActive) {
        gsap.to(ref.current, {duration: 1, width: '100%'});
    } else {
        gsap.to(ref.current, {duration: 1, width: 0});
    }
}

export default ShowCodePanel;