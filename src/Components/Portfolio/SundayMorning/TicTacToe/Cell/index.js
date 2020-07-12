import React from 'react';
import cx from 'classnames';
import cellStyles from './Cell.module.css';

const Cell = React.forwardRef((props, ref) => {
    return (
        <div className={cx(cellStyles['cell'], cellStyles[props.gridPos])} onClick={props.onClick} data-pos={props.dataPos}>
            <span ref={ref}>{ props.cellDisplay }</span>
        </div>
    );
});

export default Cell;