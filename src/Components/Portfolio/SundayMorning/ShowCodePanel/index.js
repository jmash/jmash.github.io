import React, { useRef, useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import gsap from 'gsap';
import cx from 'classnames';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/github.css';
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
    

    let displayRef = useRef(null);
    const preRef = useRef(null);

    useEffect(() => {
        hljs.registerLanguage('javascript', javascript);
        hljs.highlightBlock(preRef.current);
    });
    


    const [panelAnimation, setPanelAnimation] = useState(null);
    const [panelActive, setPanelActive] = useState(false);
    const [panelHeight, setPanelHeight] = useState(props.panelHeight);

    if(props.active !== panelActive) {
        setPanelActive((prevState) => !prevState);
        console.log(props.active);
        panelAnimation.play();        
    }

    
    useEffect(() => {
        if(panelActive) {
            setPanelAnimation(
                gsap.timeline()
                    .to(displayRef.current, {duration: 0.25, width: '100%', opacity: 0.75 })
                    .to(displayRef.current, {duration: 0.25, height: '500px', opacity: 1})
                            
            )
        } else {
            setPanelAnimation(
                gsap.to(displayRef.current, {duration: 0.5, width: '0', height: panelHeight, opacity: 0})
            )
        }
    }, [panelActive, panelHeight]);

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
            <div ref={displayRef} style={{width: 0, height: props.panelHeight}} className={cx(showCodePanelStyles['panelDisplaySide'])}>
                <pre ref={preRef}>
                    <code className="javascript">
                        <p className={cx(showCodePanelStyles['codeDisplay'])}>{ showRawComp }</p>
                    </code>
                </pre>
            </div>
        </Col>
    );
};

export default ShowCodePanel;