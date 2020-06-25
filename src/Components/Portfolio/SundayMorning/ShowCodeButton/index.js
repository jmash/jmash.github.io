import React from 'react';
import Button from 'react-bootstrap/Button';
import cx from 'classnames';
import showCodeButtonStyles from './ShowCodeButton.module.css';

const ShowCodeButton = (props) => {
    console.log(showCodeButtonStyles);
    return (
        <div className={cx(showCodeButtonStyles[props.position], )}>
            <Button><i className={showCodeButtonStyles['orstyling']} className="fas fa-code"></i></Button>
        </div>
    );
};

export default ShowCodeButton;
//<div>
// <Button className={cx(fizzbuzzStyles['showCodeButton'])}><i class="fas fa-code"></i></Button>
// </div>