class TicTacToe extends Phaser.Scene{
    constructor(){
        super('TicTacToe');
    }

    preload(){
        this.load.image('background', 'Assets/background1.jpg');
    }

    create(){
        this.background = this.add.sprite(0.5 * width, 0.5 * height, "background");
        this.background.setScale(1.5);
    }

    update(){
        
    }
}