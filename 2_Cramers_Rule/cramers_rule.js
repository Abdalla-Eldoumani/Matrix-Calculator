document.addEventListener('DOMContentLoaded', function () {
    function createMatrixInputs() {
        const size = parseInt($('#matrix-size').val());
        const matrixForm = $('#matrix-form');
        matrixForm.empty();
    
        for (let i = 0; i < size; i++) {
            const row = $('<div class="matrix-row"></div>');
            for (let j = 0; j < size + 1; j++) {
                if (j === size) {
                    row.append('<span class="augmented-divider">|</span>');
                }
                const input = $(`<input type="number" class="matrix-element" data-row="${i}" data-col="${j}">`);
                row.append(input);
            }
            matrixForm.append(row);
        }
    }

    function cramersRule() {
        const size = parseInt($('#matrix-size').val());
        const matrix = [];
        const constants = [];

        for (let i = 0; i < size; i++) {
            const row = [];
            for (let j = 0; j < size; j++) {
                row.push(parseFloat($(`.matrix-element[data-row="${i}"][data-col="${j}"]`).val()));
            }
            matrix.push(row);
            constants.push(parseFloat($(`.matrix-element[data-row="${i}"][data-col="${size}"]`).val()));
        }

        const det = determinant(matrix);

        if (det === 0) {
            alert("Determinant is zero, Cramer's rule cannot be applied.");
            return;
        }

        const result = [];
        for (let i = 0; i < size; i++) {
            const tempMatrix = matrix.map((row, rowIndex) => {
                const newRow = [...row];
                newRow[i] = constants[rowIndex];
                return newRow;
            });
            result.push(determinant(tempMatrix) / det);
        }

        const resultDiv = $('#result');
        resultDiv.empty();
        resultDiv.append(result.map((val, index) => `<div>x${index + 1} = ${val.toFixed(2)}</div>`).join(''));
    }

    function determinant(matrix) {
        const size = matrix.length;
        if (size === 1) {
            return matrix[0][0];
        } else if (size === 2) {
            return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
        } else {
            let det = 0;
            for (let i = 0; i < size; i++) {
                const subMatrix = matrix.slice(1).map(row => row.filter((_, colIndex) => colIndex !== i));
                det += (i % 2 === 0 ? 1 : -1) * matrix[0][i] * determinant(subMatrix);
            }
            return det;
        }
    }

    // Assign the createMatrixInputs and cramersRule functions to the global scope
    window.createMatrixInputs = createMatrixInputs;
    window.cramersRule = cramersRule;
});