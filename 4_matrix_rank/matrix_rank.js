document.addEventListener('DOMContentLoaded', function () {
    function createMatrixInputs() {
        const rows = parseInt($('#rows').val());
        const cols = parseInt($('#cols').val());
        const matrixForm = $('#matrix-form');
        const inputMatrixDiv = $('#input-matrix');
        matrixForm.empty();
        inputMatrixDiv.empty();
    
        for (let i = 0; i < rows; i++) {
            const row = $('<div class="matrix-row"></div>');
            const inputRowDiv = $('<div class="matrix-row"></div>');
            for (let j = 0; j < cols; j++) {
                const input = $(`<input type="number" class="matrix-element" data-row="${i}" data-col="${j}">`);
                row.append(input);
                
                const cellDiv = $(`<span class="matrix-cell" data-row="${i}" data-col="${j}"></span>`);
                inputRowDiv.append(cellDiv);
            }
            matrixForm.append(row);
            inputMatrixDiv.append(inputRowDiv);
        }
    }

    function calculateMatrixRank() {
        const rows = parseInt($('#rows').val());
        const cols = parseInt($('#cols').val());
        const matrix = [];
    
        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < cols; j++) {
                const val = parseFloat($(`.matrix-element[data-row="${i}"][data-col="${j}"]`).val());
                $(`.matrix-cell[data-row="${i}"][data-col="${j}"]`).text(val);
                row.push(val);
            }
            matrix.push(row);
        }
        
        const rank = rankOfMatrix(matrix);

        $('#result').text('Rank: ' + rank);
    }

    function rankOfMatrix(matrix) {
        const size = Math.min(matrix.length, matrix[0].length);
        let rank = 0;

        for (let r = 0; r < size; r++) {
            let pivot = matrix[r][r];
            let pivotRow = r;

            for (let i = r + 1; i < size; i++) {
                if (Math.abs(matrix[i][r]) > Math.abs(pivot)) {
                    pivot = matrix[i][r];
                    pivotRow = i;
                }
            }

            if (Math.abs(pivot) < 1e-8) {
                continue;
            }

            [matrix[r], matrix[pivotRow]] = [matrix[pivotRow], matrix[r]];

            for (let i = r + 1; i < size; i++) {
                const factor = matrix[i][r] / pivot;
                for (let j = r; j < size; j++) {
                    matrix[i][j] -= factor * matrix[r][j];
                }
            }

            rank++;
        }

        return rank;
    }

    // Assign the createMatrixInputs and calculateMatrixRank functions to the global scope
    window.createMatrixInputs = createMatrixInputs;
    window.calculateMatrixRank = calculateMatrixRank;
});
