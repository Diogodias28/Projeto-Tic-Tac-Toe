import Phaser from 'phaser';

class GameScreen extends Phaser.Scene {
    constructor() {
      super({ key: 'playgame' });
    }
  
    create() {
      this.background = this.add.image(0, 0, 'background');
      this.background.setOrigin(0, 0);
  
      const { width, height } = this.scale;
  
      // Add the main title with improved style
      this.add.text(width / 2, height / 2 - 50, 'Tic-Tac-Toe', {
        fontSize: '80px',
        fill: '#ffffff', // Change color to white
        fontStyle: 'bold',
        stroke: '#000000', // Add black stroke for better visibility
        strokeThickness: 6
      }).setOrigin(0.5, 0.5);
  
      // Add the 3D text below the main title with improved style
      this.add.text(width / 2, height / 2 + 50, '3D', {
        fontSize: '60px',
        fill: '#ffffff', // Change color to white
        fontStyle: 'bold',
        stroke: '#000000', // Add black stroke for better visibility
        strokeThickness: 6
      }).setOrigin(0.5, 0.5);
  
      this.input.on('pointerdown', () => {
        this.scene.start('bootgame');
      });
    }
}