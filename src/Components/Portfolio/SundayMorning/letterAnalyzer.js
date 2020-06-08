import Chart from 'chart.js';

export default class LetterAnalyzer {
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