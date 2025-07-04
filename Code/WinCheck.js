function checkWin(board, currentPlayer) {
    const winningCombinations = getWinningCombinations();
    for (let i = 0; i < winningCombinations.length; i++) {
        const combination = winningCombinations[i];
        const [a, b, c] = combination;
        if (board[a[0]][a[1]][a[2]] === currentPlayer &&
            board[a[0]][a[1]][a[2]] === board[b[0]][b[1]][b[2]] &&
            board[a[0]][a[1]][a[2]] === board[c[0]][c[1]][c[2]]) {
            return combination; // Retorna a combinação vencedora
        }
    }
    return null; // Nenhuma combinação vencedora
}

function getWinningCombinations(){
    const winningCombinations = [
        // Linhas em cada camada (X) - 9 combinações por camada × 3 camadas = 27
        // Camada 0 (Z=0)
        [[0, 0, 0], [0, 0, 1], [0, 0, 2]],
        [[0, 1, 0], [0, 1, 1], [0, 1, 2]],
        [[0, 2, 0], [0, 2, 1], [0, 2, 2]],
        // Camada 1 (Z=1)
        [[1, 0, 0], [1, 0, 1], [1, 0, 2]],
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
        [[0, 1, 2], [1, 1, 2], [2, 1, 2]],
        [[0, 2, 0], [1, 2, 0], [2, 2, 0]],
        [[0, 2, 1], [1, 2, 1], [2, 2, 1]],
        [[0, 2, 2], [1, 2, 2], [2, 2, 2]],

        // Diagonais dentro de cada camada (2 por camada × 3 camadas = 6)
        // Camada 0
        [[0, 0, 0], [0, 1, 1], [0, 2, 2]],
        [[0, 0, 2], [0, 1, 1], [0, 2, 0]],

        // Camada 2
        [[2, 0, 0], [2, 1, 1], [2, 2, 2]],
        [[2, 0, 2], [2, 1, 1], [2, 2, 0]],

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

    return winningCombinations;
}

function checkDraw(board) {
    return board.flat(2).every(cell => cell !== '');
}

