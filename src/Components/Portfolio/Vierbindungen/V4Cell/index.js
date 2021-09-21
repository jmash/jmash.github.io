import React from 'react';
import cx from 'classnames';
import v4Styles from './V4Cell.module.css';

const V4Cell = (props) => {
    let discColor;
    if(props.color === ""){
        discColor = "rgba(0, 0, 0, 0)";
    } else {
        discColor = props.color;
    }
    
    return(
        <div onMouseEnter={props.onMouseEnter} 
             onMouseLeave={props.onMouseLeave}
             onClick={props.onClick} 
             className={cx(v4Styles['cell'], "mx-0", "px-0")}
            >
            <span style={{position:'absolute'}}>{props.i}</span>
            <svg width="48" height="48" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <defs>
                    <mask id="hollow">
                        <rect width="48" height="48" fill="white" />         
                        <circle r="20" cx="24" cy="24" />
                    </mask>
                </defs>
                <rect width="48" height="48" fill="grey" mask="url(#hollow)" z-index="1"/>
                <circle r="20" cx="24" cy="24" fill={discColor} />
            </svg>
        </div>
        
    );
}

export default V4Cell;