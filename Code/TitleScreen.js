class TitleScreen extends Phaser.Scene {
  constructor() {
    super({ key: 'bootgame' });
  }

  preload() {
    this.load.image('background', 'assets/background1.jpg');
  } 

  create() {
    this.add.text(10, 10, 'Loading game...', { fill: '#0f0' });
    this.input.on('pointerdown', () => {
      this.scene.start('playgame');
    });
  }
}