class PlayerVsBot1 extends Phaser.Scene {
    constructor() {
        super('PlayerVsBot1');
    }

    preload() {
        this.load.image('background', 'Assets/Background-PlayerVsBot13d.jpg');
        this.load.image('bt_home', 'Assets/bt_home.png');
        this.load.image('fullscreenBT-1', 'Assets/fullscreeBT-1.png');
        this.load.image('fullscreenBT-2', 'Assets/fullscreeBT-2.png');
    }

    create() {

        width = game.config.width;
        height = game.config.height;

        //Background
        this.background = this.add.sprite(0.5 * width, 0.5 * height, 'background');
        this.background.setScale(1.4);

        //Home Button
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
    }

    update() {

    }
}