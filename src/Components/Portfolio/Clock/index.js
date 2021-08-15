import React from 'react';
import Sketch from 'react-p5';

const Clock = () => {
    const maxWidth = 400;
    const maxHeight = 400;
    let date = new Date();
    let currentSecond = date.getSeconds();
    let currentMinute = date.getMinutes();
    let currentHour = date.getHours();

    const updateTime = () => {
        date = new Date();
        currentSecond = date.getSeconds();
        currentMinute = date.getMinutes();
        currentHour = date.getHours();
    }

    const translateToCenter = (p5) => {
        p5.translate(maxWidth/2, maxHeight/2);
    }

    const drawClockBorder = (p5) => {
        p5.stroke('black');
        p5.circle(0, 0, (maxWidth/2)+2);
    }

    const drawCenterKnob = (p5) => {
        p5.strokeWeight(6);
        p5.point(0, 0);
    }

    const drawClockGraduations = (p5) => {
        for(let i = 0; i < 360; i++) {
            p5.strokeCap(p5.PROJECT);
            p5.strokeWeight(1);
            if(i % 30 === 0) {
                p5.push();
                p5.textAlign(p5.CENTER, p5.CENTER);
                p5.text((((i+60)/30)%12+1).toString(), 80*p5.cos(i), 80*p5.sin(i));
                p5.pop();
              p5.strokeWeight(3);
            }
            if(i % 6 === 0) { 
              p5.line(95*p5.cos(i), 95*p5.sin(i), 100*p5.cos(i), 100*p5.sin(i));
            }
        }
    }

    const drawSecondsHand = (p5) => {
        p5.strokeWeight(1);
        p5.line(0, 0, 90*p5.cos(currentSecond*6-90), 90*p5.sin(currentSecond*6-90));
    }

    const drawMinutesHand = (p5) => {
        p5.strokeWeight(3);
        p5.line(0, 0, 90*p5.cos((currentMinute+(currentSecond/60))*6-90), 90*p5.sin((currentMinute+(currentSecond/60))*6-90));
    }

    const drawHoursHand = (p5) => {
        p5.strokeWeight(4);
        p5.line(0, 0, 60*p5.cos((currentHour+(currentMinute/60)+(currentSecond/3600))*30-90), 60*p5.sin((currentHour+(currentMinute/60)+(currentSecond/3600))*30-90));
    }

    const updateClockFrame = (p5) => {
        updateTime();
        translateToCenter(p5);
        drawClockBorder(p5);
        drawCenterKnob(p5);
        drawClockGraduations(p5);
        drawSecondsHand(p5);
        drawMinutesHand(p5);
        drawHoursHand(p5);
    }

    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(maxWidth, maxHeight).parent(canvasParentRef);
        p5.angleMode(p5.DEGREES);
    }

    const draw = (p5) => {
        p5.background(220);
        updateClockFrame(p5);
    }

    return <Sketch className={'text-center mt-3'} setup={setup} draw={draw} />;
}

export default Clock;