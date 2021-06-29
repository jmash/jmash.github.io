import React from 'react';
import Sketch from 'react-p5';

const Clock = () => {
    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(500, 500).parent(canvasParentRef);
    }

    const draw = (p5) => {
        p5.background(0);
        p5.ellipse(50, 50, 70, 70);
    }

    return <Sketch setup={setup} draw={draw} />;
}

export default Clock;