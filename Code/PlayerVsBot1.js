class PlayerVsBot1 extends Phaser.Scene {
    constructor() {
        super('PlayerVsBot1');
        this.currentPlayer = 'X';
        this.gameStarted = false;
        this.startTime = 0;
        this.board = null;
        this.errorRate = 0.10; // Taxa de erro do bot
        this.score = 0;
        this.gameOver = false;
        this.tipo = 1;
    }

    preload() {
        this.load.image('background1', 'Assets/backgroundClean.png');
        this.load.image('bt_home', 'Assets/bt_home.png');
        this.load.image('fullscreenBT-1', 'Assets/fullscreeBT-1.png');
        this.load.image('fullscreenBT-2', 'Assets/fullscreeBT-2.png');
        this.load.image('PvE1', 'Assets/bt-level1.png');
    }

    create() {
        const width = this.game.config.width;
        const height = this.game.config.height;

        // Configuração do background
        this.background = this.add.sprite(0.5 * width, 0.5 * height, 'background1').setScale(1.5);

        // Criação do tabuleiro
        this.board = createBoard(this);
        this.blockMiddleCell();

        // Elementos da UI
        this.setupUI(width, height);
        this.setupEventListeners();

        // Inicialização de variáveis
        this.gameStarted = false;
        this.startTime = 0;
    }

    makeRandomMove() {
        const emptyCells = this.getEmptyCells(this.board);

        if (emptyCells.length > 0) {
            const randomIndex = Math.floor(Math.random() * emptyCells.length);
            const randomMove = emptyCells[randomIndex];

            const cellInfo = this.board.cellData.find(c =>
                c.layer === randomMove.layer &&
                c.row === randomMove.row &&
                c.col === randomMove.col
            );

            if (cellInfo) {
                this.makeMove(cellInfo, 'O');
                this.currentPlayer = 'X';
                this.turnText.setText('Tua vez!');
            }
        }
    }

    blockMiddleCell() {
        this.board[1][1][1] = 'Blocked';
        const middleCell = this.board.cellData.find(cell =>
            cell.layer === 1 && cell.row === 1 && cell.col === 1
        );

        if (middleCell) {
            const graphics = this.add.graphics();
            graphics.fillStyle(0xff0000, 0.6);
            graphics.fillPoints(middleCell.polygon.points, true);
        }
    }

    setupUI(width, height) {
        // Botões e textos
        this.bt_home = this.add.sprite(0.07 * width, 0.9 * height, 'bt_home')
            .setScale(1)
            .setInteractive({ useHandCursor: true });

        // Modo de jogo atual
        this.PvP = this.add.sprite(0.91 * width, 0.1 * height, 'PvE1');
        this.PvP.setScale(0.9);

        // FullscreenBTFull
        this.fullscreenBT1 = this.add.sprite(0.07 * width, 0.1 * height, 'fullscreenBT-1');
        this.fullscreenBT1.setScale(0.9);
        this.fullscreenBT1.setInteractive({ useHandCursor: true });

        // FullscreenBTNFull
        this.fullscreenBT2 = this.add.sprite(0.07 * width, 0.1 * height, 'fullscreenBT-2');
        this.fullscreenBT2.setScale(0.9);
        this.fullscreenBT2.setInteractive({ useHandCursor: true });

        // Ola MSG
        this.ola = this.add.text(0.85 * game.config.width, 0.17 * game.config.height, "Olá, " + nome2, {
            fontFamily: 'Arial',
            fontSize: 38,
            color: '#FFFFFF',
            align: 'center'
        })
        this.ola.visible = false;

        // Textos do jogo
        this.turnText = this.add.text(width / 2, 220, 'Tua vez!', {
            fontSize: '64px',
            color: '#ffffff',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.timerText = this.add.text(width / 2, 100, 'Aguardando primeira jogada...', {
            fontSize: '48px',
            color: '#ffffff',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Eventos de hover
        this.input.on('gameobjectover', (pointer, gameObject) => {
            gameObject.displayHeight += 5;
            gameObject.displayWidth += 5;
        });

        this.input.on('gameobjectout', (pointer, gameObject) => {
            gameObject.displayHeight -= 5;
            gameObject.displayWidth -= 5;
        });
        this.input.on('gameobjectdown', function (pointer, gameObject) {
            switch (gameObject) {
                case this.bt_home:
                    winx = 0;
                    wino = 0;
                    this.scene.stop();
                    this.scene.start('Menu');
                    break;
                case this.fullscreenBT1:
                    this.scale.startFullscreen();
                    this.fullscreenBT1.setVisible(false);
                    this.fullscreenBT2.setVisible(true);
                    break;
                case this.fullscreenBT2:
                    this.scale.stopFullscreen();
                    this.fullscreenBT1.setVisible(true);
                    this.fullscreenBT2.setVisible(false);
                    break;
            }
        }, this);
    }

    setupEventListeners() {
        // Eventos de clique
        this.input.on('gameobjectdown', (pointer, gameObject) => {
            switch (gameObject) {
                case this.bt_home:
                    this.scene.stop();
                    this.scene.transition('Menu');
                    break;
                case this.fullscreenBT1:
                    this.scale.startFullscreen();
                    this.fullscreenBT1.setVisible(false);
                    this.fullscreenBT2.setVisible(true);
                    break;
                case this.fullscreenBT2:
                    this.scale.stopFullscreen();
                    this.fullscreenBT1.setVisible(true);
                    this.fullscreenBT2.setVisible(false);
                    break;
            }
        });

        this.input.on('pointerdown', (pointer) => {
            // Verifica se foi clique em botão
            const isButtonClick = [
                this.bt_home,
                this.fullscreenBT1,
                this.fullscreenBT2
            ].some(btn => btn.getBounds().contains(pointer.x, pointer.y));

            if (isButtonClick) return;

            // Processa apenas cliques em células
            for (let i = 0; i < this.board.cellData.length; i++) {
                const cell = this.board.cellData[i];
                if (Phaser.Geom.Polygon.Contains(cell.polygon, pointer.x, pointer.y)) {
                    this.handleCellClick(cell.layer, cell.row, cell.col, cell);
                    break;
                }
            }
        });
    }

    handleCellClick(layer, row, col, cell) {
        if (this.currentPlayer !== 'X') return;

        if (this.board[layer][row][col] === 'Blocked') return;
        if (this.board[layer][row][col] !== '') return;

        if (!this.gameStarted) {
            this.gameStarted = true;
            this.startTime = this.time.now;
            this.timerText.setText('Tempo: 0.00s');
        }

        this.makeMove(cell, 'X');

        if (!checkWin(this.board, 'X') && !checkDraw(this.board)) {
            this.currentPlayer = 'O';
            this.turnText.setText('Bot a pensar...').setAlpha(1);
            this.time.delayedCall(500, () => this.botMove());
        }
    }

    botMove() {
        const randomValue = Math.random();
        const emptyCells = this.getEmptyCells(this.board);

        if (emptyCells.length === 8) { // Tabuleiro quase vazio
            const corners = [
                { layer: 0, row: 0, col: 0 }, { layer: 0, row: 0, col: 2 },
                { layer: 0, row: 2, col: 0 }, { layer: 0, row: 2, col: 2 },
                { layer: 2, row: 0, col: 0 }, { layer: 2, row: 0, col: 2 },
                { layer: 2, row: 2, col: 0 }, { layer: 2, row: 2, col: 2 }
            ];

            const availableCorners = corners.filter(corner =>
                this.board[corner.layer][corner.row][corner.col] === ''
            );

            if (availableCorners.length > 0) {
                const randomCorner = availableCorners[Math.floor(Math.random() * availableCorners.length)];
                const cellInfo = this.findCellVisualData(randomCorner.layer, randomCorner.row, randomCorner.col);
                this.makeMove(cellInfo, 'O');
                return;
            }
        }
        if (randomValue < this.errorRate) {
            console.log('Bot fazendo jogada aleatória1');
            this.makeRandomMove();
            return;
        }
        // Para as jogadas subsequentes, mantemos a inteligência
        const moveCount = this.getEmptyCells(this.board).length;
        const depth = moveCount > 18 ? 3 : 4;
        const boardCopy = this.copyBoard(this.board);

        const bestMove = this.minimax(boardCopy, depth, -Infinity, Infinity, true);
        if (bestMove.cell) {
            const cellInfo = this.board.cellData.find(c =>
                c.layer === bestMove.cell.layer &&
                c.row === bestMove.cell.row &&
                c.col === bestMove.cell.col
            );
            if (cellInfo) {
                this.makeMove(cellInfo, 'O');
                this.currentPlayer = 'X';

            }
        }
    }

    copyBoard(board) {
        return board.map(layer =>
            layer.map(row => [...row])
        );
    }

    findCellVisualData(layer, row, col) {
        return this.board.cellData.find(cell =>
            cell.layer === layer &&
            cell.row === row &&
            cell.col === col
        );
    }


    makeMove(cell, player) {
        this.board[cell.layer][cell.row][cell.col] = player;
        this.add.text(cell.x, cell.y, player, {
            fontSize: `${Math.floor(cell.width * 0.2)}px`,
            fontFamily: 'Arial Black',
            color: '#000'
        }).setOrigin(0.5);

        const winningCombo = checkWin(this.board, player);
        if (winningCombo) {
            this.handleGameEnd(player, winningCombo);
        } else if (checkDraw(this.board)) {
            this.handleDraw();
        }
    }

    minimax(board, depth, alpha, beta, maximizingPlayer) {
        if (checkWin(board, 'O')) return { score: 1000 - (4 - depth) };
        if (checkWin(board, 'X')) return { score: -1000 + (4 - depth) };
        if (checkDraw(board) || depth === 0) return { score: this.evaluateBoard(board, 'O', 'X') };

        const moves = this.getEmptyCells(board);
        let bestMove = { score: maximizingPlayer ? -Infinity : Infinity };

        for (const move of moves) {
            const tempBoard = board.map(layer =>
                layer.map(row => row.slice())
            );

            tempBoard[move.layer][move.row][move.col] = maximizingPlayer ? 'O' : 'X';

            const res = this.minimax(tempBoard, depth - 1, alpha, beta, !maximizingPlayer);
            const currentScore = res.score;

            if (maximizingPlayer) {
                if (currentScore > bestMove.score) {
                    bestMove = { cell: move, score: currentScore };
                }
                alpha = Math.max(alpha, currentScore);
            } else {
                if (currentScore < bestMove.score) {
                    bestMove = { cell: move, score: currentScore };
                }
                beta = Math.min(beta, currentScore);
            }

            if (beta <= alpha) break;
        }

        return bestMove;
    }

    evaluateBoard(board, aiPlayer, humanPlayer) {
        const winningCombinations = getWinningCombinations();
        let score = 0;

        for (const line of winningCombinations) {
            const values = line.map(([z, y, x]) => board[z][y][x]);

            const aiCount = values.filter(v => v === aiPlayer).length;
            const humanCount = values.filter(v => v === humanPlayer).length;
            const emptyCount = values.filter(v => v === '').length;

            if (aiCount === 3) return 100;
            if (humanCount === 3) return -100;

            if (aiCount === 2 && emptyCount === 1) score += 10;
            else if (humanCount === 2 && emptyCount === 1) score -= 10;
            else if (aiCount === 1 && emptyCount === 2) score += 1;
            else if (humanCount === 1 && emptyCount === 2) score -= 1;
        }

        return score;
    }

    getEmptyCells(board) {
        const emptyCells = [];
        for (let layer = 0; layer < 3; layer++) {
            for (let row = 0; row < 3; row++) {
                for (let col = 0; col < 3; col++) {
                    if (layer === 1 && row === 1 && col === 1) continue;
                    if (board[layer][row][col] === '') {
                        emptyCells.push({ layer, row, col });
                    }
                }
            }
        }
        return emptyCells;
    }

    getAllLines(board) {
        const lines = [];

        // Linhas, colunas e diagonais em cada layer
        for (let layer = 0; layer < 3; layer++) {
            for (let i = 0; i < 3; i++) {
                // Linhas
                lines.push([[layer, i, 0], [layer, i, 1], [layer, i, 2]]);
                // Colunas
                lines.push([[layer, 0, i], [layer, 1, i], [layer, 2, i]]);
            }
            // Diagonais
            lines.push([[layer, 0, 0], [layer, 1, 1], [layer, 2, 2]]);
            lines.push([[layer, 0, 2], [layer, 1, 1], [layer, 2, 0]]);
        }

        // Verticais entre layers
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                lines.push([[0, row, col], [1, row, col], [2, row, col]]);
            }
        }

        return lines;
    }

    handleGameEnd(player, winningCombo) {
        const endTime = this.time.now;
        const totalTime = (endTime - this.startTime) / 1000; // tempo em segundos
        this.score = Math.max(0, Math.floor(100000 - totalTime * 100));
        this.turnText.setText("");
        this.gameOver = true;
        this.add.text(this.game.config.width / 2, 220, `${player} Ganhou!`, {
            fontSize: '64px',
            fontFamily: 'Arial',
            fill: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        winningCombo.forEach(cellIndices => {
            const [l, r, c] = cellIndices;
            const winCell = this.board.cellData.find(cell =>
                cell.layer === l && cell.row === r && cell.col === c
            );
            if (winCell) {
                const highlight = this.add.graphics();
                highlight.fillStyle(0x00FF00, 0.5); // Verde com 50% de opacidade
                highlight.fillPoints(winCell.polygon.points, true);
                highlight.depth = 1; // Colocar atrás do texto
            }
        });
        if (player === 'X') {
            console.log("Score do jogador X: " + this.score);
            verificaRecords(infoUser.user, infoUser.turma, infoUser.escola, this.score, this, this.tipo);
            gravaRecords(infoUser.user, infoUser.turma, infoUser.escola, this.score, this.tipo);
        }

        this.input.off('pointerdown');
        this.input.once('pointerdown', () => {
            this.scene.restart();
        });
    }

    handleDraw() {
        this.turnText.setText("");
        this.gameOver = true;
        this.add.text(this.game.config.width / 2, 220, 'Empate!', {
            fontSize: '64px',
            fontFamily: 'Arial',
            fill: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.input.off('pointerdown');
        this.gameOver = true;
        this.input.once('pointerdown', () => {
            this.scene.restart();
        });
    }

    update() {
        if (this.gameStarted && !checkWin(this.board, 'X') && !checkWin(this.board, 'O') && !checkDraw(this.board)) {
            const elapsedTime = (this.time.now - this.startTime) / 1000;
            this.timerText.setText(`Tempo: ${elapsedTime.toFixed(2)}s`);
        }
        if (this.currentPlayer === 'X') {
            if (!this.gameOver) {
                this.turnText.setText('Tua vez!');
            }
        }

        if (this.currentPlayer === 'O' && this.turnText) {
            this.turnText.setAlpha(Math.abs(Math.sin(this.time.now * 0.005)));
        } else if (this.turnText) {
            this.turnText.setAlpha(1);
        }

        if (this.scale.isFullscreen) {
            this.fullscreenBT1.visible = false;
            this.fullscreenBT2.visible = true;
        }
        else {
            this.fullscreenBT1.visible = true;
            this.fullscreenBT2.visible = false;
        }

        if (infoUser.user != '' && infoUser.user != 'prof') {
            nome = infoUser.firstName.split(" ");
            nome2 = nome[0];
            this.ola.setText(["Olá, " + nome2]);
            this.ola.visible = true;
        }
    }
}

