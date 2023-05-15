document.addEventListener('DOMContentLoaded', function () {
    function createMatrixInputs() {
        const rowsA = parseInt($('#rowsA').val());
        const rowsB = parseInt($('#rowsB').val());
        const colsA = parseInt($('#colsA').val());
        const colsB = parseInt($('#colsB').val());
        
        if (colsA !== rowsB) {
            alert('The number of columns of Matrix A must equal the number of rows of Matrix B for multiplication.');
            return;
        }

        createMatrix('A', rowsA, colsA);
        createMatrix('B', rowsB, colsB);
    }

    function createMatrix(matrixId, rows, cols) {
        const matrixForm = $(`#matrix-form${matrixId}`);
        matrixForm.empty();

        const title = $(`<h4>Matrix ${matrixId}</h4>`);
        matrixForm.append(title);

        for (let i = 0; i < rows; i++) {
            const row = $('<div class="matrix-row"></div>');
            for (let j = 0; j < cols; j++) {
                const input = $(`<input type="number" class="matrix-element" data-row="${i}" data-col="${j}">`);
                row.append(input);
            }
            matrixForm.append(row);
        }
    }

    function calculateMultiplication() {
        const rowsA = parseInt($('#rowsA').val());
        const colsA = parseInt($('#colsA').val());
        const rowsB = parseInt($('#rowsB').val());
        const colsB = parseInt($('#colsB').val());
    
        if (colsA !== rowsB) {
            alert('The number of columns of Matrix A must equal the number of rows of Matrix B for multiplication.');
            return;
        }
    
        let matrixA = [];
        let matrixB = [];
        for (let i = 0; i < rowsA; i++) {
            const row = [];
            for (let j = 0; j < colsA; j++) {
                row.push(parseFloat($(`#matrix-formA .matrix-element[data-row="${i}"][data-col="${j}"]`).val()));
            }
            matrixA.push(row);
        }
    
        for (let i = 0; i < rowsB; i++) {
            const row = [];
            for (let j = 0; j < colsB; j++) {
                row.push(parseFloat($(`#matrix-formB .matrix-element[data-row="${i}"][data-col="${j}"]`).val()));
            }
            matrixB.push(row);
        }
    
        const resultMatrix = multiplyMatrices(matrixA, matrixB);
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
    

    function multiplyMatrices(A, B) {
        const result = [];
        const rowsA = A.length;
        const colsA = A[0].length;
        const colsB = B[0].length;

        for (let i = 0; i < rowsA; i++) {
            const row = [];
            for (let j = 0; j < colsB; j++) {
                let sum = 0;
                for (let k = 0; k < colsA; k++) {
                    sum += A[i][k] * B[k][j];
                }
                row.push(sum);
            }
            result.push(row);
        }

        return result;
    }

    window.createMatrixInputs = createMatrixInputs;
    window.calculateMultiplication = calculateMultiplication;
});
