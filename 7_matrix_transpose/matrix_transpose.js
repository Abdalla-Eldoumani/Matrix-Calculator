document.addEventListener('DOMContentLoaded', function () {
    function createMatrixInputs() {
        const rows = parseInt($('#rows').val());
        const cols = parseInt($('#cols').val());
        const matrixForm = $('#matrix-form');
        matrixForm.empty();

        for (let i = 0; i < rows; i++) {
            const row = $('<div class="matrix-row"></div>');
            for (let j = 0; j < cols; j++) {
                const input = $(`<input type="number" class="matrix-element" data-row="${i}" data-col="${j}">`);
                row.append(input);
            }
            matrixForm.append(row);
        }
    }

    function calculateTranspose() {
        const rows = parseInt($('#rows').val());
        const cols = parseInt($('#cols').val());
        let matrix = [];

        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < cols; j++) {
                row.push(parseFloat($(`#matrix-form .matrix-element[data-row="${i}"][data-col="${j}"]`).val()));
            }
            matrix.push(row);
        }

        let resultMatrix = matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));

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

    window.createMatrixInputs = createMatrixInputs;
    window.calculateTranspose = calculateTranspose;
});
