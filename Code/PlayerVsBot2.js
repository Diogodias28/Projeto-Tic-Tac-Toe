class PlayerVsBot2 extends Phaser.Scene {
    constructor() {
        super('PlayerVsBot2');
    }

    preload() {
        this.load.image('background', 'Assets/Background-PlayerVsBot13d.jpg');
        this.load.image('bt_home', 'Assets/bt_home.png');
        this.load.image('fullscreenBT-1', 'Assets/fullscreeBT-1.png');
        this.load.image('fullscreenBT-2', 'Assets/fullscreeBT-2.png');
        this.load.image('PvE2', 'Assets/bt-level2.png');
    }

    create() {

        width = game.config.width;
        height = game.config.height;

        //Background
        this.background = this.add.sprite(0.5 * width, 0.5 * height, 'background');
        this.background.setScale(1.5);

        //Home Button
        this.bt_home = this.add.sprite(0.08 * width, 0.9 * height, 'bt_home');
        this.bt_home.setScale(0.8);
        this.bt_home.setInteractive({ useHandCursor: true });

        // Modo de jogo atual
        this.PvP = this.add.sprite(0.92 * width, 0.1 * height, 'PvE2');
        this.PvP.setScale(0.65);

        //FullscreenBTFull
        this.fullscreenBT1 = this.add.sprite(0.08 * width, 0.1 * height, 'fullscreenBT-1');
        this.fullscreenBT1.setScale(0.7);
        this.fullscreenBT1.setInteractive({ useHandCursor: true });

        //FullscreenBTNFull
        this.fullscreenBT2 = this.add.sprite(0.08 * width, 0.1 * height, 'fullscreenBT-2');
        this.fullscreenBT2.setScale(0.7);
        this.fullscreenBT2.setInteractive({ useHandCursor: true });
        this.fullscreenBT2.setVisible(false)

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

    update() {

    }
}