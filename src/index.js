module.exports = function(matrix) {
    solveSudoku(matrix);
    return matrix;
}

function solveSudoku(matrix) {
    let row, column, number, bool;
    for (row = 0; row < 9; row++) {
        for (column = 0; column < 9; column++) {
            //проверка подходящих данных
            if (matrix[row][column] == 0) {
                for (number = 1; number < 10; number++) {
                    if (insertNumber(matrix, row, column, number)) {
                        matrix[row][column] = number;
                        // рекурсивный вызов(продвижение перебора)
                        bool = solveSudoku(matrix);
                        
                        if (bool){
                          return true; // очистка стека
                        }
                        // обнуление текущей позиции, если bool = false
                        matrix[row][column] = 0;
                    }
                }
                // возврат к предыдущему вызову функции
                return false; 
            }
        }
    }
    // возвращается, если нет нулей и помещается в предыдущий вызов bool = solveSudoku();
    // служит для завершения рекурсии
    return true;
}

function insertNumber(matrix, row, column, number) {
    //проверка рядов и колонок на подходящее число
    let i, j;
    for (i = 0; i < 9; i++) {
        if (matrix[i][column] == number || matrix[row][i] == number) {
            return false;
        }
    }
    //проверка квадратов 3 на 3
    let y = Math.floor((row / 3)) * 3,
        x = Math.floor((column / 3)) * 3;
    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            if (matrix[i + y][j + x] == number) {
                return false;
            }
        }
    }
    return true;
}