const fs = require('fs');

function decodeYValue(value, base) {
    return parseInt(value, base);
}

function lagrangeInterpolation(points, k) {
    let constantTerm = 0;

    for (let i = 0; i < k; i++) {
        let [x_i, y_i] = points[i];
        let term = y_i;

        for (let j = 0; j < k; j++) {
            if (i !== j) {
                let [x_j] = points[j];
                term *= -x_j / (x_i - x_j);
            }
        }
        constantTerm += term;
    }

    return Math.round(constantTerm);
}


function readAndProcessInput(filename) {
        const data = JSON.parse(fs.readFileSync(filename, 'utf8'));
        const n = data.keys.n;
        const k = data.keys.k;
        const points = [];

        for (let i = 1; i <= n; i++) {
            const pointData = data[i.toString()];

            if (!pointData) {
                continue;  
            }

            const base = parseInt(pointData["base"]);
            const yValue = pointData["value"];
            const x = i; 
            const y = decodeYValue(yValue, base);
            points.push([x, y]);
        }

        return lagrangeInterpolation(points, k);
}

const secret1 = readAndProcessInput('./testcase1.json');
const secret2= readAndProcessInput('./testcase2.json');
console.log('Secret for testcase1:', secret1);
console.log('Secret for testcase2:', secret2);
