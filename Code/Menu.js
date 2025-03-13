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

        // Titulo
        this.titulo = this.add.sprite(0.5 * width, 0.1 * height, 'titulo');
        this.titulo.setScale(1.3);

        // Botão Jogar
        this.playBT = this.add.sprite(0.5 * width, 0.5 * height, 'playBT');
        this.playBT.setScale(1.3);
        this.playBT.setInteractive({ useHandCursor: true });

        //FullscreenBTFull
        this.fullscreenBTFull = this.add.sprite(0.9 * width, 0.1 * height, 'fullscreenBTFull');
        this.fullscreenBTFull.setScale(0.1);
        this.fullscreenBTFull.setInteractive({ useHandCursor: true });

        //FullscreenBTNFull
        this.fullscreenBTNfull = this.add.sprite(0.9 * width, 0.1 * height, 'fullscreenBTNfull');
        this.fullscreenBTNfull.setScale(0.1);
        this.fullscreenBTNfull.setInteractive({ useHandCursor: true });

        // Botão Login
        this.loginBT = this.add.sprite(0.5 * width, 0.7 * height, 'loginBT');
        this.loginBT.setScale(1.3);
        this.loginBT.setInteractive({ useHandCursor: true });

        // Botão Logout
        this.logoutBT = this.add.sprite(0.5 * width, 0.7 * height, 'logoutBT');
        this.logoutBT.setScale(1.3);
        this.logoutBT.visible = false;
        this.logoutBT.setInteractive({ useHandCursor: true });

        // Botão Ranking
        this.rankingBT = this.add.sprite(0.5 * width, 0.8 * height, 'rankingBT');
        this.rankingBT.setScale(1.3);
        this.rankingBT.setInteractive({ useHandCursor: true });

        // Botão info
        this.infoBT = this.add.sprite(0.5 * width, 0.9 * height, 'infoBT');
        this.infoBT.setScale(1.3);
        this.infoBT.setInteractive({ useHandCursor: true });

        // Botão Creditos
        this.creditosBT = this.add.sprite(0.5 * width, 0.6 * height, 'creditosBT');
        this.creditosBT.setScale(1.3);
        this.creditosBT.setInteractive({ useHandCursor: true });

        // Ola MSG
        this.ola = this.add.text(0.38 * game.config.width, 0.25 * game.config.height, "Olá, " + nome, {
            fontFamily: 'Arial',
            fontSize: 80,
            color: '#000000',
            align: 'center'
        })
        this.ola.visible = false;

        // Painel Login
        this.loginPanel = this.add.sprite(0.5 * width, 0.5 * height, 'loginPanel');
        this.loginPanel.setScale(1.3);
        this.loginPanel.visible = false;

        // Painel Info
        this.infoPanel = this.add.sprite(0.5 * width, 0.5 * height, 'infoPanel');
        this.infoPanel.setScale(1.3);
        this.infoPanel.visible = false;

        // Painel Creditos
        this.creditosPanel = this.add.sprite(0.5 * width, 0.5 * height, 'creditosPanel');
        this.creditosPanel.setScale(1.3);
        this.creditosPanel.visible = false;

        // Botão Fechar
        this.fecharBT = this.add.sprite(0.9 * width, 0.1 * height, 'fecharBT');
        this.fecharBT.setScale(0.1);
        this.fecharBT.visible = false;
        this.fecharBT.setInteractive({ useHandCursor: true });

        // Botão Certo
        this.certoBT = this.add.sprite(0.5 * width, 0.6 * height, 'certoBT');
        this.certoBT.setScale(1.3);
        this.certoBT.visible = false;
        this.certoBT.setInteractive({ useHandCursor: true });

        // Botão Certo Login
        this.certoBTLogin = this.add.sprite(0.5 * width, 0.6 * height, 'certoBT');
        this.certoBTLogin.setScale(1.3);
        this.certoBTLogin.visible = false;
        this.certoBTLogin.setInteractive({ useHandCursor: true });

        // Botão Errado Login
        this.erradoBTLogin = this.add.sprite(0.5 * width, 0.7 * height, 'erradoBT');
        this.erradoBTLogin.setScale(1.3);
        this.erradoBTLogin.visible = false;
        this.erradoBTLogin.setInteractive({ useHandCursor: true });

        // Mensagem de erro login
        this.loginErrorMsg = this.add.text(0.3 * game.config.width, 0.5 * game.config.height, "Utilizador ou Password Errados", {
            fontFamily: 'Arial',
            fontSize: 80,
            color: '#000000',
            align: 'center'
        })
        this.loginErrorMsg.visible = false;

        // Mensagem de erro Login 2
        this.loginErrorMsg2 = this.add.text(0.3 * game.config.width, 0.5 * game.config.height, "Está registado como professor", {
            fontFamily: 'Arial',
            fontSize: 80,
            color: '#000000',
            align: 'center'
        })
        this.loginErrorMsg2.visible = false;

        this.input.on('gameobjectover', function (pointer, gameObject) {
            gameObject.displayHeight += 5;
            gameObject.displayWidth += 5;
        }, this);

        this.input.on('gameobjectout', function (pointer, gameObject) {
            gameObject.displayHeight -= 5;
            gameObject.displayWidth -= 5;
        }, this);

        this.input.on('gameobjectdown', function (pointer, gameObject) {
        
        }, this);

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
            this.fullscreenBTFull.visible = true;
            this.fullscreenBTNfull.visible = false;
        }
        else {
            this.fullscreenBTFull.visible = false;
            this.fullscreenBTNfull.visible = true;
        }
    }
}  