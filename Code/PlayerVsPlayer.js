let winx = 0;
let wino = 0;

class PlayerVsPlayer extends Phaser.Scene {
    constructor() {
        super('PlayerVsPlayer');
    }

    preload() {
        this.load.image('background1', 'Assets/backgroundClean.png');
        this.load.image('bt_home', 'Assets/bt_home.png');
        this.load.image('fullscreenBT-1', 'Assets/fullscreeBT-1.png');
        this.load.image('fullscreenBT-2', 'Assets/fullscreeBT-2.png');
        this.load.image('PvP', 'Assets/bt-level0.png');
    }

    create() {
        this.gameStarted = false;  // Flag para controlar se o jogo começou
        this.startTime = 0;        // Zeramos o startTime inicialmente
        this.board = createBoard(this);
        this.currentPlayer = 'X';
        const cellData = this.board.cellData;

        const width = this.game.config.width;
        const height = this.game.config.height;

        // Background
        this.background = this.add.sprite(0.5 * width, 0.5 * height, 'background1');
        this.background.setScale(1.5);

        // Botão home
        this.bt_home = this.add.sprite(0.07 * width, 0.9 * height, 'bt_home')
            .setScale(1)
            .setInteractive({ useHandCursor: true });

        // Modo de jogo atual
        this.PvP = this.add.sprite(0.91 * width, 0.1 * height, 'PvP');
        this.PvP.setScale(0.9);

        //FullscreenBTFull
        this.fullscreenBT1 = this.add.sprite(0.07 * width, 0.1 * height, 'fullscreenBT-1');
        this.fullscreenBT1.setScale(0.9);
        this.fullscreenBT1.setInteractive({ useHandCursor: true });

        //FullscreenBTNFull
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

        this.turnText = this.add.text(this.game.config.width / 2, 220, `Vez de: ${this.currentPlayer}`, {
            fontSize: '64px',
            color: '#ffffff',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.winxText = this.add.text(this.game.config.width / 2 - 200, this.game.config.height - 200, `Vitórias X: ${winx}`, {
            fontSize: '64px',
            color: '#ffffff',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.winoText = this.add.text(this.game.config.width / 2 + 200, this.game.config.height - 200, `Vitórias O: ${wino}`, {
            fontSize: '64px',
            color: '#ffffff',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.timerText = this.add.text(this.game.config.width / 2, 100, 'Aguardando primeira jogada...', {
            fontSize: '48px',
            color: '#ffffff',
            fontFamily: 'Arial',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.blockMiddleCell();

        this.input.on('gameobjectover', function (pointer, gameObject) {
            gameObject.displayHeight += 5;
            gameObject.displayWidth += 5;
        }, this);

        this.input.on('gameobjectout', function (pointer, gameObject) {
            gameObject.displayHeight -= 5;
            gameObject.displayWidth -= 5;
        }, this);

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
                    break;
                case this.fullscreenBT2:
                    this.scale.stopFullscreen();
                    break;
            }
        }, this);
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

    handleCellClick(layer, row, col, cell) {
        if (this.board[layer][row][col] === 'Blocked') return;

        if (this.board[layer][row][col] !== '') return;

        // Inicia o temporizador na primeira jogada válida
        if (!this.gameStarted) {
            this.gameStarted = true;
            this.startTime = this.time.now;
            this.timerText.setText('Tempo: 0.00s');
        }

        this.board[layer][row][col] = this.currentPlayer;
        this.add.text(cell.x, cell.y, this.currentPlayer, {
            fontSize: `${Math.floor(cell.width * 0.2)}px`,
            fontFamily: 'Arial Black',
            color: '#000'
        }).setOrigin(0.5);

        const winningCombo = checkWin(this.board, this.currentPlayer);

        if (winningCombo) {
            const endTime = this.time.now;
            const totalTime = (endTime - this.startTime) / 1000;
            console.log(`Tempo total: ${totalTime.toFixed(2)} segundos`);

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

            if (this.currentPlayer == 'X') {
                winx++;
            } else {
                wino++;
            }

            this.winxText.setText(`Vitórias X: ${winx}`);
            this.winoText.setText(`Vitórias O: ${wino}`);

            this.turnText.setText("");
            this.add.text(this.game.config.width / 2, 220, `${this.currentPlayer} Ganhou!`, {
                fontSize: '64px',
                fontFamily: 'Arial',
                fill: '#ffffff',
                fontStyle: 'bold'
            }).setOrigin(0.5);

            this.input.off('pointerdown');
            this.time.delayedCall(3000, () => {
                this.scene.stop('PlayerVsPlayer');
                this.scene.start('PlayerVsPlayer');
            }, [], this);
        } else if (checkDraw(this.board)) {
            this.add.text(this.game.config.width / 2, 220, 'Empate!', {
                fontSize: '64px',
                fontFamily: 'Arial',
                fill: '#000'
            }).setOrigin(0.5);

            this.input.off('pointerdown');
            this.time.delayedCall(3000, () => {
                this.scene.stop('PlayerVsPlayer');
                this.scene.start('PlayerVsPlayer');
            }, [], this);
        } else {
            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
            this.turnText.setText(`Vez de: ${this.currentPlayer}`);
        }
    }

    update() {
        if (this.gameStarted && !checkWin(this.board, 'X') && !checkWin(this.board, 'O') && !checkDraw(this.board)) {
            const elapsedTime = (this.time.now - this.startTime) / 1000;
            this.timerText.setText(`Tempo: ${elapsedTime.toFixed(2)}s`);
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