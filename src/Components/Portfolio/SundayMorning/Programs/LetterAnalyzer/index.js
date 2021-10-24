import React, { Component } from 'react';
import Chart from 'chart.js';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import letterAnalyzerStyles from './LetterAnalyzer.module.css';
import cx from 'classnames';
import { interpret } from 'xstate';
import { letterAnalyzerMachine } from './letterAnalyzerMachine';
import { Subject } from 'rxjs';

const letterAnalyzerSubj = new Subject();

class LetterAnalyzerLogic {
    static createGraph = (cxt, xs, ys) => {
        const laOptions = {
            type: 'bar',
            data: {
                labels: xs,
                datasets: [{
                    label: 'Letter Analysis',
                    data: ys,
                    backgroundColor: '#112233',
                    borderColor: '#112233'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        }

        return new Chart(cxt, laOptions);
    }

    static dumpGraph(graph) {
        graph.data.labels.pop();
        graph.data.datasets.forEach((dataset) => {
            dataset.data.pop();
        });
        graph.update();
    }

    static updateGraph(xs, ys, graph) {
        graph.data.labels = xs;
        graph.data.datasets[0].data.push(ys);
        graph.data.datasets[0].label = "Letter Analysis";
        graph.data.datasets[0].data = ys;
        graph.update();
    }
}

export default class LetterAnalyzer extends Component {
    constructor() {
        super();

        this.letterAnalyzerService = interpret(letterAnalyzerMachine).onTransition(laCurrent =>
            this.setState({ laCurrent })
        );

        this.laRef = React.createRef();
        this.canvasRef = React.createRef();

        this.state = {
            laCharMax: 10000,
            laCharCount: 0,
            laUpdateCount: 0,
            laInput: "",
            laCurrent: letterAnalyzerMachine.initialState,
            laDisplayHeight: 0,
            laDisplayWidth: 0,
            laShowCodeActive: false
        }
    }

    componentDidMount() {
        letterAnalyzerSubj.isStopped = false;
        let letterAnalyzerGraph = LetterAnalyzerLogic.createGraph(this.canvasRef.current, [], []);

        this.letterAnalyzerService.start();

        letterAnalyzerSubj.subscribe({
            next: () => {
                let letterBreakdown = {};
                let characters = this.state.laInput.split('');
                characters = characters.map(c => c.toLowerCase());
                characters = characters.sort();
                
                for(let char in characters) {
                    if(letterBreakdown[characters[char]]) {
                        if(characters[char].toUpperCase() !== characters[char].toLowerCase())
                            letterBreakdown[characters[char]]++;
                    } else {
                        if(characters[char].toUpperCase() !== characters[char].toLowerCase())
                            letterBreakdown[characters[char]] = 1;
                    }
                }
                let xs = [];
                let ys = [];
                for(let l in letterBreakdown) {
                    xs.push(l);
                    ys.push(letterBreakdown[l]);
                }

                LetterAnalyzerLogic.dumpGraph(letterAnalyzerGraph);
                LetterAnalyzerLogic.updateGraph(xs, ys, letterAnalyzerGraph);                
            }
        });
    }

    componentWillUnmount() {
        this.letterAnalyzerService.stop();
        letterAnalyzerSubj.complete();
    }

    handleLAInputChange = (e) => {
        this.setState({
            laCharCount: e.target.value.length,
            laInput: e.target.value
        }, () => {
            this.letterAnalyzerService.send({ type: 'CHANGE', length: this.state.laCharCount });
            console.log(this.state.laCharCount);
        });
    }

    handleShowCodeButtonClick = (e) => {
        this.setState(prevState => ({
            laShowCodeActive: !prevState.laShowCodeActive
        }));
    }

    render() {
        return (
            <Card.Body>
                <Form.Group>
                    <Form.Control className={cx(letterAnalyzerStyles['no-resize'])} as="textarea" rows={5} onChange={this.handleLAInputChange} />
                        <Form.Text>Limit of 10000 characters - {this.state.laCharCount}/{this.state.laCharMax} characters left</Form.Text>
                    <Button className="my-1"
                        disabled={this.state.laCurrent.matches('error') ||
                                    this.state.laCurrent.matches('start') } 
                        onClick={() => letterAnalyzerSubj.next() }>
                            Generate Letter Analysis
                    </Button>
                </Form.Group>
                <div className={cx(letterAnalyzerStyles['letterAnalyzer'])}>
                    <canvas ref={this.canvasRef} id="letterAnalyzerChart" width="200" height="200"/>
                </div>
            </Card.Body>
        )
    }
}