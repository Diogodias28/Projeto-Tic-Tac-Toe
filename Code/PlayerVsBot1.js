class PlayerVsBot1 extends Phaser.Scene {
    constructor() {
        super('PlayerVsBot1');
        this.currentPlayer = 'X';
        this.gameStarted = false;
        this.startTime = 0;
        this.board = null;
    }

    preload() {
        this.load.image('background', 'Assets/Background-tictactoe3d.jpg');
        this.load.image('bt_home', 'Assets/bt_home.png');
        this.load.image('fullscreenBT-1', 'Assets/fullscreeBT-1.png');
        this.load.image('fullscreenBT-2', 'Assets/fullscreeBT-2.png');
        this.load.image('PvE1', 'Assets/bt-level1.png');
    }

    create() {
        const width = this.game.config.width;
        const height = this.game.config.height;

        // Configuração do background
        this.background = this.add.sprite(0.5 * width, 0.5 * height, 'background').setScale(1.5);

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
        this.bt_home = this.add.sprite(0.08 * width, 0.9 * height, 'bt_home')
            .setScale(0.8)
            .setInteractive({ useHandCursor: true });

        this.PvP = this.add.sprite(0.92 * width, 0.1 * height, 'PvE1').setScale(0.65);

        // Elementos de fullscreen
        this.fullscreenBT1 = this.add.sprite(0.08 * width, 0.1 * height, 'fullscreenBT-1')
            .setScale(0.7)
            .setInteractive({ useHandCursor: true });

        this.fullscreenBT2 = this.add.sprite(0.08 * width, 0.1 * height, 'fullscreenBT-2')
            .setScale(0.7)
            .setInteractive({ useHandCursor: true })
            .setVisible(false);

        // Textos do jogo
        this.turnText = this.add.text(width / 2, 150, 'Sua vez!', {
            fontSize: '64px',
            color: '#ffffff',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.timerText = this.add.text(width / 2, 50, 'Aguardando primeira jogada...', {
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
    }

    setupEventListeners() {
        // Eventos de clique
        this.input.on('gameobjectdown', (pointer, gameObject) => {
            switch (gameObject) {
                case this.bt_home:
                    this.scene.transition({ target: 'Menu', duration: 100 });
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
            this.turnText.setText('Bot pensando...');
            this.time.delayedCall(500, () => this.botMove());
        }
    }

    botMove() {
        const bestMove = this.minimax(this.board, 3, -Infinity, Infinity, true);
        if (bestMove.cell) { // Garanta que existe movimento válido
            this.makeMove(bestMove.cell, 'O');
            this.currentPlayer = 'X';
            this.turnText.setText('Sua vez!');
        }
    }

    makeMove(cell, player) {
        this.board[cell.layer][cell.row][cell.col] = player;
        this.add.text(cell.x, cell.y, player, {
            fontSize: `${Math.floor(cell.width * 0.2)}px`,
            fontFamily: 'Arial Black',
            color: '#000'
        }).setOrigin(0.5);

        if (checkWin(this.board, player)) {
            this.handleGameEnd(player);
        } else if (checkDraw(this.board)) {
            this.handleDraw();
        }
    }

    minimax(board, depth, alpha, beta, maximizingPlayer) {
        if (depth === 0 || checkWin(board, 'O') || checkWin(board, 'X') || checkDraw(board)) {
            return { score: this.evaluateBoard(board) };
        }

        const moves = this.getEmptyCells(board);
        let bestMove = { score: maximizingPlayer ? -Infinity : Infinity };

        for (const move of moves) {
            // Cria cópia segura sem perder referências
            const tempBoard = JSON.parse(JSON.stringify(board));
            tempBoard[move.layer][move.row][move.col] = maximizingPlayer ? 'O' : 'X';

            const currentScore = this.minimax(tempBoard, depth - 1, alpha, beta, !maximizingPlayer).score;

            // Atualiza melhor movimento
            if ((maximizingPlayer && currentScore > bestMove.score) ||
                (!maximizingPlayer && currentScore < bestMove.score)) {
                bestMove = { cell: move, score: currentScore };
            }

            // Poda alpha-beta
            if (maximizingPlayer) {
                alpha = Math.max(alpha, currentScore);
            } else {
                beta = Math.min(beta, currentScore);
            }

            if (beta <= alpha) break;
        }
        return bestMove;
    }

    evaluateBoard(board) {
        if (checkWin(board, 'O')) return 100;
        if (checkWin(board, 'X')) return -100;
        return 0;
    }

    getEmptyCells(board) {
        const emptyCells = [];
        for (let layer = 0; layer < 3; layer++) {
            for (let row = 0; row < 3; row++) {
                for (let col = 0; col < 3; col++) {
                    // Ignora a célula bloqueada do meio
                    if (layer === 1 && row === 1 && col === 1) continue;

                    if (board[layer][row][col] === '') {
                        // Encontra os dados da célula correspondente
                        const cellInfo = this.board.cellData.find(c =>
                            c.layer === layer &&
                            c.row === row &&
                            c.col === col
                        );

                        if (cellInfo) {
                            emptyCells.push({
                                layer: layer,
                                row: row,
                                col: col,
                                x: cellInfo.x,
                                y: cellInfo.y,
                                width: cellInfo.width
                            });
                        }
                    }
                }
            }
        }
        return emptyCells;
    }

    handleGameEnd(player) {
        this.add.text(this.game.config.width / 2, 150, `${player} Ganhou!`, {
            fontSize: '64px',
            fontFamily: 'Arial',
            fill: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.input.off('pointerdown');
        this.time.delayedCall(2000, () => {
            this.scene.restart();
        });
    }

    handleDraw() {
        this.add.text(this.game.config.width / 2, 150, 'Empate!', {
            fontSize: '64px',
            fontFamily: 'Arial',
            fill: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.input.off('pointerdown');
        this.time.delayedCall(2000, () => {
            this.scene.restart();
        });
    }

    update() {
        if (this.gameStarted && !checkWin(this.board, 'X') && !checkWin(this.board, 'O') && !checkDraw(this.board)) {
            const elapsedTime = (this.time.now - this.startTime) / 1000;
            this.timerText.setText(`Tempo: ${elapsedTime.toFixed(2)}s`);
        }

        if (this.currentPlayer === 'O' && this.turnText) {
            this.turnText.setAlpha(Math.abs(Math.sin(this.time.now * 0.005)));
        }
    }
}