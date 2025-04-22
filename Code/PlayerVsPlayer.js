let winx = 0;
let wino = 0;

class PlayerVsPlayer extends Phaser.Scene {
    constructor() {
        super('PlayerVsPlayer');
    }

    preload() {
        this.load.image('background', 'Assets/Background-tictactoe3d.jpg');
        this.load.image('bt_home', 'Assets/bt_home.png');
        this.load.image('fullscreenBT-1', 'Assets/fullscreeBT-1.png');
        this.load.image('fullscreenBT-2', 'Assets/fullscreeBT-2.png');
        // this.load.image('bt_restart', 'Assets/bt_restart.png');
        this.load.image('PvP', 'Assets/bt-level0.png');
    }

    create() {
        this.board = createBoard(this);
        this.currentPlayer = 'X';
        const cellData = this.board.cellData;

        const width = this.game.config.width;
        const height = this.game.config.height;

        // Background
        this.background = this.add.sprite(0.5 * width, 0.5 * height, 'background');
        this.background.setScale(1.4);

        this.turnText = this.add.text(this.game.config.width / 2, 150, `Vez de: ${this.currentPlayer}`, {
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

        // Block the middle square of the middle board - Needed because X always
        this.board[1][1][1] = 'Blocked';

        const middleCell = cellData.find(cell => cell.layer === 1 && cell.row === 1 && cell.col === 1);

        if (middleCell) {
            const graphics = this.add.graphics();
            graphics.fillStyle(0xff0000, 0.6); // Cor vermelha com 70% de opacidade
            graphics.fillPoints(middleCell.polygon.points, true); // Preenche o polígono com os pontos da célula
        }

        // Home Button
        this.bt_home = this.add.sprite(0.1 * width, 0.1 * height, 'bt_home');
        this.bt_home.setScale(1);
        this.bt_home.setInteractive({ useHandCursor: true });

        // Modo de jogo atual
        this.PvP = this.add.sprite(0.9 * width, 0.1 * height, 'PvP');
        this.PvP.setScale(0.75);

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
                    this.scene.stop('PlayerVsPlayer');
                    this.scene.transition({
                        target: 'Menu',
                        duration: 100
                    });
                    break;
            }
        }, this);
    }

    handleCellClick(layer, row, col, cell) {
        if (this.board[layer][row][col] === 'Blocked') {
            return;
        }

        if (this.board[layer][row][col] !== '') {
            return;
        }

        this.board[layer][row][col] = this.currentPlayer;
        this.add.text(cell.x, cell.y, this.currentPlayer, {
            fontSize: `${Math.floor(cell.width * 0.2)}px`,
            fontFamily: 'Arial Black',
            color: '#000'
        }).setOrigin(0.5);

        if (checkWin(this.board, this.currentPlayer)) {
            if (this.currentPlayer === 'X') {
                winx++;
            }
            else {
                wino++;
            }
            this.winxText.setText(`Vitórias X: ${winx}`);
            this.winoText.setText(`Vitórias O: ${wino}`);

            this.turnText.setText("");
            this.add.text(this.game.config.width / 2, 150, `${this.currentPlayer} Ganhou!`, { fontSize: '64px', fontFamily: 'Arial', fill: '#ffffff', fontStyle: 'bold' }).setOrigin(0.5);
            this.input.off('pointerdown');
            this.time.delayedCall(2000, () => this.scene.start('PlayerVsPlayer'), [], this);

        } else if (checkDraw(this.board)) {
            this.add.text(this.game.config.width / 2 + 30, (this.game.config.height / 2) - 350, 'Empate!', { fontSize: '64px', fontFamily: 'Arial', fill: '#000' }).setOrigin(0.5);
            this.input.off('pointerdown');
            this.time.delayedCall(2000, () => this.scene.start('PlayerVsPlayer'), [], this);
        } else {
            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
            this.turnText.setText(`Vez de: ${this.currentPlayer}`);
        }
    }

    update() {

    }
}
