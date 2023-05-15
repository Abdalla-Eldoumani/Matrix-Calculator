document.addEventListener('DOMContentLoaded', function () {
    function createMatrixInputs() {
        const size = parseInt($('#size').val());
        const matrixForm = $('#matrix-form');
        matrixForm.empty();

        const inputMatrixDiv = $('#input-matrix');
        inputMatrixDiv.empty();

        for (let i = 0; i < size; i++) {
            const row = $('<div class="matrix-row"></div>');
            const inputRowDiv = $('<div class="matrix-row"></div>');

            for (let j = 0; j < size; j++) {
                const input = $(`<input type="number" class="matrix-element" data-row="${i}" data-col="${j}">`);
                row.append(input);

                const cellDiv = $(`<span class="matrix-cell" data-row="${i}" data-col="${j}"></span>`);
                inputRowDiv.append(cellDiv);
            }

            matrixForm.append(row);
            inputMatrixDiv.append(inputRowDiv);
        }
    }

    function multiplyMatrices(A, B) {
        let result = new Array(A.length).fill(0).map(row => new Array(B[0].length).fill(0));

        return result.map((row, i) => {
            return row.map((val, j) => {
                return A[i].reduce((sum, elm, k) => sum + (elm*B[k][j]) ,0)
            })
        });
    }

    function calculatePower() {
        const size = parseInt($('#size').val());
        const power = parseInt($('#power').val());
        let matrix = [];

        for (let i = 0; i < size; i++) {
            const row = [];
            for (let j = 0; j < size; j++) {
                const val = parseFloat($(`.matrix-element[data-row="${i}"][data-col="${j}"]`).val());
                $(`.matrix-cell[data-row="${i}"][data-col="${j}"]`).text(val);
                row.push(val);
            }
            matrix.push(row);
        }

        let resultMatrix = matrix;

        for(let p = 1; p < power; p++) {
            resultMatrix = multiplyMatrices(resultMatrix, matrix);
        }

        const resultDiv = $('#result');
        resultDiv.empty();

        for (let i = 0; i < resultMatrix.length; i++) {
            const rowDiv = $('<div class="matrix-row"></div>');
            for (let j = 0; j < resultMatrix[i].length; j++) {
                const cellDiv = $(`<span class="matrix-cell"></span>`);
                cellDiv.text(resultMatrix[i][j]);
                rowDiv.append(cellDiv);
            }
            resultDiv.append(rowDiv);
        }
    }

    window.createMatrixInputs = createMatrixInputs;
    window.calculatePower = calculatePower;
});
