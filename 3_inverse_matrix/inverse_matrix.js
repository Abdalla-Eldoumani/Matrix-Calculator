document.addEventListener('DOMContentLoaded', function () {
    function createMatrixInputs() {
        const size = parseInt($('#matrix-size').val());
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

    function inverseMatrixMethod() {
        const size = parseInt($('#matrix-size').val());
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

        let inverseMatrix = invert(matrix);
        
        if (inverseMatrix) {
            const resultDiv = $('#result');
            resultDiv.empty();

            for (let i = 0; i < inverseMatrix.length; i++) {
                const rowDiv = $('<div class="matrix-row"></div>');
                for (let j = 0; j < inverseMatrix[i].length; j++) {
                    const cellDiv = $(`<span class="matrix-cell"></span>`);
                    cellDiv.text(inverseMatrix[i][j].toFixed(2));
                    rowDiv.append(cellDiv);
                }
                resultDiv.append(rowDiv);
            }
        } else {
            alert('The matrix is singular and cannot be inverted.');
        }
    }
    
    function invert(matrix) {
        const size = matrix.length;
        const identityMatrix = Array.from({ length: size }, (_, i) => Array.from({ length: size }, (_, j) => i === j ? 1 : 0));
        
        for (let i = 0; i < size; i++) {
            let maxEl = Math.abs(matrix[i][i]);
            let maxRow = i;
    
            for (let k = i + 1; k < size; k++) {
                if (Math.abs(matrix[k][i]) > maxEl) {
                    maxEl = Math.abs(matrix[k][i]);
                    maxRow = k;
                }
            }
    
            if (maxEl === 0) {
                return null;
            }
    
            for (let k = 0; k < size; k++) {
                [matrix[i][k], matrix[maxRow][k]] = [matrix[maxRow][k], matrix[i][k]];
                [identityMatrix[i][k], identityMatrix[maxRow][k]] = [identityMatrix[maxRow][k], identityMatrix[i][k]];
            }
    
            const pivot = matrix[i][i];
    
            for (let k = 0; k < size; k++) {
                matrix[i][k] /= pivot;
                identityMatrix[i][k] /= pivot;
            }
    
            for (let k = 0; k < size; k++) {
                if (k !== i) {
                    const factor = matrix[k][i];
    
                    for (let j = 0; j < size; j++) {
                        matrix[k][j] -= factor * matrix[i][j];
                        identityMatrix[k][j] -= factor * identityMatrix[i][j];
                    }
                }
            }
        }
        return identityMatrix;
    }
    
    
    // Assign the createMatrixInputs and inverseMatrixMethod functions to the global scope
    window.createMatrixInputs = createMatrixInputs;
    window.inverseMatrixMethod = inverseMatrixMethod;
});