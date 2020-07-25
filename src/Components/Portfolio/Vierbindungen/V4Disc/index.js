import React from 'react';
import cx from 'classnames';
import v4Styles from './V4Disc.module.css';

const V4Disc = (props) => {
    return(
        <div className={cx(v4Styles['cell'], "mx-0", "px-0")}>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                <circle cx="20" cy="20" r="20" fill="red" z-index="0"/>
            </svg>
        </div>
        
    );
}

export default V4Disc;