import React from 'react';
import cx from 'classnames';
import cellStyles from './Cell.module.css';

const Cell = (props) => {
    return (
        <div className={cx(cellStyles['cell'], cellStyles[props.gridPos])} onClick={props.onClick} data-pos={props.dataPos}>
            { props.cellDisplay }
        </div>
    );
};

export default Cell;