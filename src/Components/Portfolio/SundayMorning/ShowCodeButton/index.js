import React from 'react';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import cx from 'classnames';
import showCodeButtonStyles from './ShowCodeButton.module.css';

const ShowCodeButton = (props) => {
    return (
        <div className={cx(showCodeButtonStyles[props.position])}>
            <Button className={cx(showCodeButtonStyles['orstyling'])}>
                <FontAwesomeIcon icon={faCode} color="green" />
                <FontAwesomeIcon className={cx(showCodeButtonStyles['showcodearrow'])} icon={ faCaretRight } color="green" />
            </Button>
        </div>
    );
};

export default ShowCodeButton;
//<div>
// <Button className={cx(fizzbuzzStyles['showCodeButton'])}><i class="fas fa-code"></i></Button>
// </div>