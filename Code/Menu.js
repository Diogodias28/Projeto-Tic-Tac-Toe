let call = 0;
//Variaveis a ser usadas para adicionar os sprites
let width;
let height;

//Login
let nome = "";



class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
    }

    preload() {
        this.load.image("background", "Assets/background.jpg");

    }

    create() {
        width = game.config.width;
        height = game.config.height;

        // BakGround
        this.background = this.add.sprite(0.5 * width, 0.5 * height, 'background');
        this.background.setScale(1.5);

        //Ola MSG
        this.ola = this.add.text(0.38 * game.config.width, 0.25 * game.config.height, "Olá, " + nome, {
            fontFamily: 'Arial',
            fontSize: 80,
            color: '#000000',
            align: 'center'
        })
        this.ola.visible = false;

    }

    update() {
        width = game.config.width;
        height = game.config.height;

        if (call == 0) {
            sessionVerify();
            call = 1;
        }

        if (infoUser.user != '' && infoUser.user != 'prof') {
            nome = infoUser.firstName.split(" ")[0];
            this.ola.setText(["Olá, " + nome]);
            this.ola.visible = true;
        }

        if (this.scale.isFullscreen) {
            this.fullscreenBT1.visible = true;
            this.fullscreenBT2.visible = false;
        }
        else {
            this.fullscreenBT1.visible = false;
            this.fullscreenBT2.visible = true;
        }
    }
}  