function checkWin(board, currentPlayer) {
    const winningCombinations = [
        // Linhas em cada camada (X) - 9 combinações por camada × 3 camadas = 27
        // Camada 0 (Z=0)
        [[0, 0, 0], [0, 0, 1], [0, 0, 2]],
        [[0, 1, 0], [0, 1, 1], [0, 1, 2]],
        [[0, 2, 0], [0, 2, 1], [0, 2, 2]],
        // Camada 1 (Z=1)
        [[1, 0, 0], [1, 0, 1], [1, 0, 2]],
        [[1, 1, 0], [1, 1, 1], [1, 1, 2]],
        [[1, 2, 0], [1, 2, 1], [1, 2, 2]],
        // Camada 2 (Z=2)
        [[2, 0, 0], [2, 0, 1], [2, 0, 2]],
        [[2, 1, 0], [2, 1, 1], [2, 1, 2]],
        [[2, 2, 0], [2, 2, 1], [2, 2, 2]],

        // Colunas em cada camada (Y) - 9 combinações por camada × 3 camadas = 27
        // Camada 0 (Z=0)
        [[0, 0, 0], [0, 1, 0], [0, 2, 0]],
        [[0, 0, 1], [0, 1, 1], [0, 2, 1]],
        [[0, 0, 2], [0, 1, 2], [0, 2, 2]],
        // Camada 1 (Z=1)
        [[1, 0, 0], [1, 1, 0], [1, 2, 0]],
        [[1, 0, 1], [1, 1, 1], [1, 2, 1]],
        [[1, 0, 2], [1, 1, 2], [1, 2, 2]],
        // Camada 2 (Z=2)
        [[2, 0, 0], [2, 1, 0], [2, 2, 0]],
        [[2, 0, 1], [2, 1, 1], [2, 2, 1]],
        [[2, 0, 2], [2, 1, 2], [2, 2, 2]],

        // Pilhas (Z) - conectando camadas - 9 combinações (uma para cada X,Y)
        [[0, 0, 0], [1, 0, 0], [2, 0, 0]],
        [[0, 0, 1], [1, 0, 1], [2, 0, 1]],
        [[0, 0, 2], [1, 0, 2], [2, 0, 2]],
        [[0, 1, 0], [1, 1, 0], [2, 1, 0]],
        [[0, 1, 1], [1, 1, 1], [2, 1, 1]],
        [[0, 1, 2], [1, 1, 2], [2, 1, 2]],
        [[0, 2, 0], [1, 2, 0], [2, 2, 0]],
        [[0, 2, 1], [1, 2, 1], [2, 2, 1]],
        [[0, 2, 2], [1, 2, 2], [2, 2, 2]],

        // Diagonais dentro de cada camada (2 por camada × 3 camadas = 6)
        // Camada 0
        [[0, 0, 0], [0, 1, 1], [0, 2, 2]],
        [[0, 0, 2], [0, 1, 1], [0, 2, 0]],
        // Camada 1
        [[1, 0, 0], [1, 1, 1], [1, 2, 2]],
        [[1, 0, 2], [1, 1, 1], [1, 2, 0]],
        // Camada 2
        [[2, 0, 0], [2, 1, 1], [2, 2, 2]],
        [[2, 0, 2], [2, 1, 1], [2, 2, 0]],

        // Diagonais entre camadas (4 diagonais espaciais)
        // Diagonais principais 3D
        [[0, 0, 0], [1, 1, 1], [2, 2, 2]],  // Diagonal principal
        [[0, 0, 2], [1, 1, 1], [2, 2, 0]],  // Diagonal secundária
        [[2, 0, 0], [1, 1, 1], [0, 2, 2]],  // Outra diagonal
        [[2, 0, 2], [1, 1, 1], [0, 2, 0]],  // Última diagonal

        // Diagonais laterais (mais 12 combinações)
        // Diagonais nas faces laterais
        // Face X=0
        [[0, 0, 0], [0, 1, 1], [0, 2, 2]],
        [[0, 0, 2], [0, 1, 1], [0, 2, 0]],
        // Face X=2
        [[2, 0, 0], [2, 1, 1], [2, 2, 2]],
        [[2, 0, 2], [2, 1, 1], [2, 2, 0]],
        // Face Y=0
        [[0, 0, 0], [1, 0, 1], [2, 0, 2]],
        [[0, 0, 2], [1, 0, 1], [2, 0, 0]],
        // Face Y=2
        [[0, 2, 0], [1, 2, 1], [2, 2, 2]],
        [[0, 2, 2], [1, 2, 1], [2, 2, 0]],
        // Face Z=0
        [[0, 0, 0], [1, 1, 0], [2, 2, 0]],
        [[0, 2, 0], [1, 1, 0], [2, 0, 0]],
        // Face Z=2
        [[0, 0, 2], [1, 1, 2], [2, 2, 2]],
        [[0, 2, 2], [1, 1, 2], [2, 0, 2]]
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        const win = board[a[0]][a[1]][a[2]] === currentPlayer
            && board[a[0]][a[1]][a[2]] === board[b[0]][b[1]][b[2]]
            && board[a[0]][a[1]][a[2]] === board[c[0]][c[1]][c[2]];
        if (win) {
            console.log("Combinaçao vencedora: ", combination);
        }
        return win;
    });
}

function checkDraw(board) {
    return board.flat(2).every(cell => cell !== '');
}

