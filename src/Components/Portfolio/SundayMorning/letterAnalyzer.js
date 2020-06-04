import Chart from 'chart.js';

export default class LetterAnalyzer {
    constructor(xs, ys, cxt) {
        this.xs = xs;
        this.ys = ys;
        this.cxt = cxt;
    }

    createGraph = () => {
        console.log(this.xs, this.ys, this.cxt);
        const letterAnalysis = new Chart(this.cxt, {
            type: 'bar',
            data: {
                labels: this.xs,
                datasets: [{
                    label: 'Letter Analysis',
                    data: this.ys,
                    backgroundColor: '#112233'
                }]
            }
        })
    }
}