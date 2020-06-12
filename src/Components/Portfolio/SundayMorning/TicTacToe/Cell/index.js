import React from 'react';
import cx from 'classnames';
import cellStyles from './Cell.module.css';

const Cell = (props) => {
    return (
        <div className={cx(cellStyles[''])}>
            { props.cellState }
        </div>
    );
};

export default Cell;