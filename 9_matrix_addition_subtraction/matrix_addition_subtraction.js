document.addEventListener('DOMContentLoaded', function () {
    function createMatrixInputs() {
        const rows = parseInt($('#rows').val());
        const cols = parseInt($('#cols').val());
        createMatrixForm('A', rows, cols);
        createMatrixForm('B', rows, cols);
    }

    function createMatrixForm(matrixLetter, rows, cols) {
        const matrixForm = $(`#matrix-form${matrixLetter}`);
        matrixForm.empty();

        const title = $(`<h4>Matrix ${matrixLetter}</h4>`);
        matrixForm.append(title);
    
        for (let i = 0; i < rows; i++) {
            const row = $('<div class="matrix-row"></div>');
            for (let j = 0; j < cols; j++) {
                const input = $(`<input type="number" class="matrix-element" data-row="${i}" data-col="${j}" data-matrix="${matrixLetter}">`);
                row.append(input);
            }
            matrixForm.append(row);
        }
    }

    function calculateAdditionSubtraction() {
        const rows = parseInt($('#rows').val());
        const cols = parseInt($('#cols').val());
        const operation = $('#operation').val();
        const matrixA = getMatrix('A', rows, cols);
        const matrixB = getMatrix('B', rows, cols);
    
        const resultMatrix = [];
        for (let i = 0; i < rows; i++) {
            const resultRow = [];
            for (let j = 0; j < cols; j++) {
                if (operation === 'add') {
                    resultRow.push(matrixA[i][j] + matrixB[i][j]);
                } else if (operation === 'subtract') {
                    resultRow.push(matrixA[i][j] - matrixB[i][j]);
                }
            }
            resultMatrix.push(resultRow);
        }
    
        const resultDiv = $('#result');
        resultDiv.empty();
    
        const title = $('<h3>Result Matrix</h3>');
        resultDiv.append(title);
        
        for (let row of resultMatrix) {
            const rowDiv = $('<div class="matrix-row"></div>');
            for (let elem of row) {
                const resultInput = $('<input type="number" class="matrix-element" readonly>');
                resultInput.val(elem);
                rowDiv.append(resultInput);
            }
            resultDiv.append(rowDiv);
        }
    }

    function getMatrix(matrixLetter, rows, cols) {
        const matrix = [];
        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < cols; j++) {
                row.push(parseFloat($(`.matrix-element[data-row="${i}"][data-col="${j}"][data-matrix="${matrixLetter}"]`).val()));
            }
            matrix.push(row);
        }
        return matrix;
    }

    // Assign the createMatrixInputs and calculateAdditionSubtraction functions to the global scope
    window.createMatrixInputs = createMatrixInputs;
    window.calculateAdditionSubtraction = calculateAdditionSubtraction;
});