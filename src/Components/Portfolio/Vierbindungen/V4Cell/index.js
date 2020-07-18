import React from 'react';

export const K4Cell = (props) => {
    return(
        <div class="cell mx-0 px-0">
        <svg class="coutout" xmlns="http://www.w3.org/2000/svg" version="1.1">
            <defs>
            <mask id="hollow">
                <rect width="48" height="48" fill="white" />         
                <circle r="20" cx="24" cy="24" fill="black" />
            </mask>
            </defs>
            <rect width="48" height="48" fill="grey" mask="url(#hollow)"/>
        </svg>
        </div>
    );
}