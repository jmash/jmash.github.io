import React from 'react';
import cx from 'classnames';
import showCodePanelStyles from './ShowCodePanel.module.css';

const ShowCodePanel = (props) => {
    console.log(showCodePanelStyles);
    let codeText = readFileFromJS("./ShowCodePanel.module.css");
    return (
        <div>
            <code className={cx(showCodePanelStyles['codeDisplay'])}>{ codeText }</code>
        </div>
    );
};

function readFileFromJS (fileName) {
    let codeText = "blah";
    // fetch(showCodePanelStyles)
    //     .then(res => res.text())
    //     .then(text => console.log(text));
    // console.log(codeText);
    return codeText;
}

export default ShowCodePanel;