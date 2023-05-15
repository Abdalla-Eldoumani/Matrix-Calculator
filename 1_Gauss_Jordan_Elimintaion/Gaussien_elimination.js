document.addEventListener('DOMContentLoaded', function () {
    function createMatrixInputs() {
        const rows = parseInt($('#rows').val());
        const cols = parseInt($('#cols').val());
        const matrixForm = $('#matrix-form');
        matrixForm.empty();
    
        for (let i = 0; i < rows; i++) {
            const row = $('<div class="matrix-row"></div>');
            for (let j = 0; j < cols; j++) {
                if (j === cols - 1) {
                    row.append('<span class="augmented-divider">|</span>');
                }
                const input = $(`<input type="number" class="matrix-element" data-row="${i}" data-col="${j}">`);
                row.append(input);
            }
            matrixForm.append(row);
        }
    }

    function gaussJordanElimination() {
        const rows = parseInt($('#rows').val());
        const cols = parseInt($('#cols').val());
        const matrix = [];
    
        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < cols; j++) {
                row.push(parseFloat($(`.matrix-element[data-row="${i}"][data-col="${j}"]`).val()));
            }
            matrix.push(row);
        }
    
        const resultMatrix = gaussJordan(matrix);
        const resultDiv = $('#result');
        resultDiv.empty();
    
        for (let row of resultMatrix) {
            resultDiv.append($('<div></div>').text(row.slice(0, -1).join(' ') + ' | ' + row.slice(-1)));
        }
    }

    function gaussJordan(matrix) {
        const rowCount = matrix.length;
        const colCount = matrix[0].length;
        
        for (let i = 0; i < rowCount; i++) {
            // Find the maximum element in the current column
            let maxEl = Math.abs(matrix[i][i]);
            let maxRow = i;
            for (let k = i + 1; k < rowCount; k++) {
                if (Math.abs(matrix[k][i]) > maxEl) {
                    maxEl = Math.abs(matrix[k][i]);
                    maxRow = k;
                }
            }
        
            // Swap the current row with the row containing the maximum element
            if (maxRow != i) {
                let temp = matrix[i];
                matrix[i] = matrix[maxRow];
                matrix[maxRow] = temp;
            }
        
            // Set the pivot element to 1 by dividing the entire row by pivot
            let pivot = matrix[i][i];
            if (pivot == 0) { // This should not happen if matrix is invertible
                return null;
            }
        
            for (let j = 0; j < colCount; j++) {
                matrix[i][j] /= pivot;
            }
        
            // Set the elements above and below the pivot element to 0
            for (let k = 0; k < rowCount; k++) {
                if (k != i) {
                    let factor = matrix[k][i];
                    for (let j = 0; j < colCount; j++) {
                        matrix[k][j] -= factor * matrix[i][j];
                    }
                }
            }
        }
    
        return matrix;
    }
    

    window.createMatrixInputs = createMatrixInputs;
    window.gaussJordanElimination = gaussJordanElimination;
});