import React from 'react';
import cx from 'classnames';
import cellStyles from './Cell.module.css';

const Cell = React.forwardRef((props, ref) => {
    return (
        <div className={cx(cellStyles['cell'], cellStyles[props.gridPos])} onClick={props.onClick} data-pos={props.dataPos}>
            <div ref={ref}>
                <span >{ props.cellDisplay }</span>
            </div>
        </div>
    );
});

export default Cell;