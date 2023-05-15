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

    function calculateDeterminant() {
        const size = parseInt($('#size').val());
        const matrix = [];

        for (let i = 0; i < size; i++) {
            const row = [];
            for (let j = 0; j < size; j++) {
                const val = parseFloat($(`.matrix-element[data-row="${i}"][data-col="${j}"]`).val());
                $(`.matrix-cell[data-row="${i}"][data-col="${j}"]`).text(val);
                row.push(val);
            }
            matrix.push(row);
        }

        const result = determinant(matrix);
        $('#result').text(result);
    }

    function determinant(matrix) {
        const size = matrix.length;

        if (size === 2) {
            return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
        }

        let det = 0;
        for (let i = 0; i < size; i++) {
            det += matrix[0][i] * cofactor(matrix, 0, i);
        }
        return det;
    }

    function cofactor(matrix, row, col) {
        const subMatrix = matrix.slice(0, row).concat(matrix.slice(row + 1)).map(row => {
            return row.slice(0, col).concat(row.slice(col + 1));
        });
        return ((row + col) % 2 ? -1 : 1) * determinant(subMatrix);
    }

    window.createMatrixInputs = createMatrixInputs;
    window.calculateDeterminant = calculateDeterminant;
});
