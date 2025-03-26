class PlayerVsPlayer extends Phaser.Scene {
    constructor() {
        super('PlayerVsPlayer');
    }

    preload() {
        this.load.image('background', 'Assets/Background-tictactoe3d.jpg');
        this.load.image('bt_home', 'Assets/bt_home.png');
        this.load.image('fullscreeBT-1', 'Assets/fullscreeBT-1.png');
        this.load.image('fullscreeBT-2', 'Assets/fullscreeBT-2.png');
    }

    create() {
        this.board = [
            [
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ],
            [
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ],
            [
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ]
        ];
        this.currentPlayer = 'X';

        const width = this.game.config.width;
        const height = this.game.config.height;

        // Background
        this.background = this.add.sprite(0.5 * width, 0.5 * height, 'background');
        this.background.setScale(1.5);

        // Home Button
        this.bt_home = this.add.sprite(0.1 * width, 0.1 * height, 'bt_home');
        this.bt_home.setScale(1);
        this.bt_home.setInteractive({ useHandCursor: true });

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
                    this.scene.transition({
                        target: 'Menu',
                        duration: 100
                    });
                    break;
            }
        }, this);

        // Create the Tic Tac Toe board
        this.createBoard();
    }

    createBoard() {
        const width = this.game.config.width;  // 1920
        const height = this.game.config.height; // 1080
        const cellSize = Math.min(width, height) / 9;
    
        this.cells = []; // Store cell references for resetting
    
        const shiftLeft = 150;
        const layerOffsets = [
            { x: width / 4 - width / 2 - shiftLeft, y: height / 2 - (cellSize * 3) / 2 },
            { x: width / 2 - width / 2 - shiftLeft, y: height / 2 - (cellSize * 3) / 2 },
            { x: (width / 4) * 3 - width / 2 - shiftLeft, y: height / 2 - (cellSize * 3) / 2 }
        ];
    
        for (let layer = 0; layer < 3; layer++) {
            const offsetX = layerOffsets[layer].x;
            const offsetY = layerOffsets[layer].y;
    
            for (let row = 0; row < 3; row++) {
                for (let col = 0; col < 3; col++) {
                    const x = col * cellSize + cellSize / 2 + offsetX + width / 2;
                    const y = row * cellSize + cellSize / 2 + offsetY;
                    const cell = this.add.rectangle(x, y, cellSize, cellSize, 0xffffff).setInteractive();
                    cell.on('pointerdown', () => this.handleCellClick(layer, row, col, cell));
                    this.cells.push(cell);
                }
            }

            // Grid lines
            for (let i = 0; i <= 3; i++) {
                // Vertical lines
                this.add.line(offsetX + width / 2, offsetY, i * cellSize, 0, i * cellSize, 3 * cellSize, 0x000000).setOrigin(0);
                // Horizontal lines
                this.add.line(offsetX + width / 2, offsetY, 0, i * cellSize, 3 * cellSize, i * cellSize, 0x000000).setOrigin(0);
            }
        }
    }    
    

    handleCellClick(layer, row, col, cell) {
        if (this.board[layer][row][col] !== '') {
            return;
        }

        this.board[layer][row][col] = this.currentPlayer;
        this.add.text(cell.x, cell.y, this.currentPlayer, { fontSize: `${cell.width-10}px`, fontFamily: 'Arial Black', color: '#000' }).setOrigin(0.5);

        if (this.checkWin()) {
            this.add.text(this.game.config.width / 2 + 30, (this.game.config.height / 2 - 350), `${this.currentPlayer} Wins!`, { fontSize: '64px', fontFamily: 'Arial Black', fill: '#000' }).setOrigin(0.5);
            this.input.off('pointerdown');
            this.time.delayedCall(2000, () => this.scene.start('PlayerVsPlayer'), [], this);
        } else if (this.checkDraw()) {
            this.add.text(this.game.config.width / 2 + 30, (this.game.config.height / 2) - 350, 'Draw!', { fontSize: '64px', fontFamily: 'Arial Black', fill: '#000' }).setOrigin(0.5);
            this.input.off('pointerdown');
            this.time.delayedCall(2000, () => this.scene.start('PlayerVsPlayer'), [], this);
        } else {
            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        }
    }

    checkWin() {
        const winningCombinations = [
            // Linhas em cada camada
            [[0, 0, 0], [0, 0, 1], [0, 0, 2]],
            [[0, 1, 0], [0, 1, 1], [0, 1, 2]],
            [[0, 2, 0], [0, 2, 1], [0, 2, 2]],
            [[1, 0, 0], [1, 0, 1], [1, 0, 2]],
            [[1, 1, 0], [1, 1, 1], [1, 1, 2]],
            [[1, 2, 0], [1, 2, 1], [1, 2, 2]],
            [[2, 0, 0], [2, 0, 1], [2, 0, 2]],
            [[2, 1, 0], [2, 1, 1], [2, 1, 2]],
            [[2, 2, 0], [2, 2, 1], [2, 2, 2]],

            // Linhas verticais em cada camada(XZ)
            [[0, 0, 0], [1, 0, 0], [2, 0, 0]],
            [[0, 0, 1], [1, 0, 1], [2, 0, 1]],
            [[0, 0, 2], [1, 0, 2], [2, 0, 2]],
            [[0, 1, 0], [1, 1, 0], [2, 1, 0]],
            [[0, 1, 1], [1, 1, 1], [2, 1, 1]],
            [[0, 1, 2], [1, 1, 2], [2, 1, 2]],
            [[0, 2, 0], [1, 2, 0], [2, 2, 0]],
            [[0, 2, 1], [1, 2, 1], [2, 2, 1]],
            [[0, 2, 2], [1, 2, 2], [2, 2, 2]],
            
            // Linhas verticais em cada camada(YZ)
            [[0, 0, 0], [0, 1, 0], [0, 2, 0]],
            [[0, 0, 1], [0, 1, 1], [0, 2, 1]],
            [[0, 0, 2], [0, 1, 2], [0, 2, 2]],
            [[1, 0, 0], [1, 1, 0], [1, 2, 0]],
            [[1, 0, 1], [1, 1, 1], [1, 2, 1]],
            [[1, 0, 2], [1, 1, 2], [1, 2, 2]],
            [[2, 0, 0], [2, 1, 0], [2, 2, 0]],
            [[2, 0, 1], [2, 1, 1], [2, 2, 1]],
            [[2, 0, 2], [2, 1, 2], [2, 2, 2]],

            // Diagonais dentro de cada camada
            [[0, 0, 0], [0, 1, 1], [0, 2, 2]],
            [[0, 0, 2], [0, 1, 1], [0, 2, 0]],
            [[1, 0, 0], [1, 1, 1], [1, 2, 2]],
            [[1, 0, 2], [1, 1, 1], [1, 2, 0]],
            [[2, 0, 0], [2, 1, 1], [2, 2, 2]],
            [[2, 0, 2], [2, 1, 1], [2, 2, 0]],
        
            // Profundidade (Z) - conectando camadas
            [[0, 0, 0], [1, 0, 1], [2, 0, 2]],
            [[0, 0, 2], [1, 0, 1], [2, 0, 0]],
            [[0, 1, 0], [1, 1, 1], [2, 1, 2]],
            [[0, 1, 2], [1, 1, 1], [2, 1, 0]],
            [[0, 2, 0], [1, 2, 1], [2, 2, 2]],
            [[0, 2, 2], [1, 2, 1], [2, 2, 0]],
        
            // Diagonais que cruzam camadas (3D)
            [[0, 0, 0], [1, 1, 1], [2, 2, 2]],
            [[0, 0, 2], [1, 1, 1], [2, 2, 0]],
            [[0, 2, 0], [1, 1, 1], [2, 0, 2]],
            [[0, 2, 2], [1, 1, 1], [2, 0, 0]]
        ];

        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return this.board[a[0]][a[1]][a[2]] === this.currentPlayer &&
                   this.board[a[0]][a[1]][a[2]] === this.board[b[0]][b[1]][b[2]] &&
                   this.board[a[0]][a[1]][a[2]] === this.board[c[0]][c[1]][c[2]];
        });
    }

    checkDraw() {
        return this.board.flat(2).every(cell => cell !== '');
    }

    update() {
        
    }
}