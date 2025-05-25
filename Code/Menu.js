let x;
let y;
//Variaveis a ser usadas para adicionar os sprites
let width;
let height;

let currentYear = new Date().getFullYear();
let di, df;
di = currentYear + "-09-01";
df = (currentYear + 1) + "-08-31";


//Login
let nome = "";
let nome2 = "";
let call = 0;
var please = "";



class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
        console.log("Menu");
    }

    preload() {
        this.load.image("background", "Assets/Background-tictactoe3d.png");
        this.load.image("bt-level0", "Assets/bt-level0.png");
        this.load.image("bt-level1", "Assets/bt-level1.png");
        this.load.image("bt-level2", "Assets/bt-level2.png");
        this.load.image("login-bt", "Assets/login-bt.png");
        this.load.image("logout-bt", "Assets/logout-bt.png");
        this.load.image("titulo-TTT", "Assets/titulo-TTT.png");
        this.load.image("fullscreenBT-1", "Assets/fullscreenBT-1.png");
        this.load.image("fullscreenBT-2", "Assets/fullscreenBT-2.png");
        this.load.image("bt-top", "Assets/bt-top.png");
        this.load.image("creditos-img", "Assets/creditos-img.png");
        this.load.image("bt-instrucoes", "Assets/bt-instrucoes.png");
        this.load.image("bt_home", "Assets/bt_home.png");
        this.load.image("bt-creditos", "Assets/bt-creditos.png");
        this.load.image("bt-fechar", "Assets/bt-fechar.png");
        this.load.image("instrucoes-img", "Assets/instrucoes-img.png");
        this.load.image("loginPanel", "Assets/login.png");
        this.load.image("certoBT", "Assets/certoBT.png");

    }

    create() {
        width = game.config.width;
        height = game.config.height;

        // BackGround
        this.background = this.add.sprite(0.5 * width, 0.5 * height, 'background');
        this.background.setScale(1.5);

        // Titulo
        this.titulo = this.add.sprite(0.5 * width, 0.1 * height, 'titulo-TTT');
        this.titulo.setScale(1);

        // Botão Jogar 1
        this.playBT = this.add.sprite(0.5 * width, 0.35 * height, 'bt-level0');
        this.playBT.setScale(0.9);
        this.playBT.setInteractive({ useHandCursor: true });

        // Botão Jogar 2
        this.playBT2 = this.add.sprite(0.5 * width, 0.6 * height, 'bt-level1');
        this.playBT2.setScale(0.9);
        this.playBT2.setInteractive({ useHandCursor: true });

        // Botão Jogar 3
        this.playBT3 = this.add.sprite(0.5 * width, 0.85 * height, 'bt-level2');
        this.playBT3.setScale(0.9);
        this.playBT3.setInteractive({ useHandCursor: true });

        // Botão Home
        this.homeBT = this.add.sprite(0.9 * width, 0.5 * height, 'bt_home');
        this.homeBT.setScale(0.9);
        this.homeBT.visible = false;
        this.homeBT.setInteractive({ useHandCursor: true });

        //FullscreenBTFull
        this.fullscreenBT1 = this.add.sprite(0.08 * width, 0.1 * height, 'fullscreenBT-1');
        this.fullscreenBT1.setScale(0.7);
        this.fullscreenBT1.setInteractive({ useHandCursor: true });

        //FullscreenBTNFull
        this.fullscreenBT2 = this.add.sprite(0.08 * width, 0.1 * height, 'fullscreenBT-2');
        this.fullscreenBT2.setScale(0.7);
        this.fullscreenBT2.setInteractive({ useHandCursor: true });

        // Botão Login
        this.loginBT = this.add.sprite(0.92 * width, 0.1 * height, 'login-bt');
        this.loginBT.setScale(0.8);
        this.loginBT.setInteractive({ useHandCursor: true });

        // Botão Logout
        this.logoutBT = this.add.sprite(0.5 * width, 0.7 * height, 'logout-bt');
        this.logoutBT.setScale(0.9);
        this.logoutBT.visible = false;
        this.logoutBT.setInteractive({ useHandCursor: true });

        // Botão Ranking
        this.rankingBT = this.add.sprite(0.93 * width, 0.55 * height, 'bt-top');
        this.rankingBT.setScale(0.9);
        this.rankingBT.setInteractive({ useHandCursor: true });

        // Botão info
        this.infoBT = this.add.sprite(0.93 * width, 0.72 * height, 'bt-instrucoes');
        this.infoBT.setScale(0.9);
        this.infoBT.setInteractive({ useHandCursor: true });

        // Botão Creditos
        this.creditosBT = this.add.sprite(0.93 * width, 0.9 * height, 'bt-creditos');
        this.creditosBT.setScale(0.9);
        this.creditosBT.setInteractive({ useHandCursor: true });

        // Ola MSG
        this.ola = this.add.text(0.38 * game.config.width, 0.57 * game.config.height, "Olá, " + nome2, {
            fontFamily: 'Arial',
            fontSize: 80,
            color: '#0D870F',
            align: 'center'
        })
        this.ola.visible = false;

        //// Painel Login
        this.loginPanel = this.add.sprite(0.5 * width, 0.5 * height, 'loginPanel');
        this.loginPanel.setScale(1.3);
        this.loginPanel.visible = false;

        // Painel Info
        this.infoPanel = this.add.sprite(0.5 * width, 0.6 * height, 'instrucoes-img');
        this.infoPanel.setScale(1.3);
        this.infoPanel.visible = false;

        // Painel Creditos
        this.creditosPanel = this.add.sprite(0.5 * width, 0.6 * height, 'creditos-img');
        this.creditosPanel.setScale(1.3);
        this.creditosPanel.visible = false;

        // Botão Fechar
        this.fecharBT = this.add.sprite(0.57 * width, 0.66 * height, 'bt-fechar');
        this.fecharBT.setScale(0.85);
        this.fecharBT.visible = false;
        this.fecharBT.setInteractive({ useHandCursor: true });

        // Botão Certo
        this.certoBT = this.add.sprite(0.44 * width, 0.66 * height, 'certoBT');
        this.certoBT.setScale(0.75);
        this.certoBT.visible = false;
        this.certoBT.setInteractive({ useHandCursor: true });



        // Mensagem de erro login
        this.loginErrorMsg = this.add.text(0.38 * game.config.width, 0.26 * game.config.height, "Utilizador ou Password Errados", {
            fontFamily: 'Arial',
            fontSize: 35,
            color: '#B40404',
            align: 'center'
        })
        this.loginErrorMsg.visible = false;

        // Mensagem de erro Login 2
        this.loginErrorMsg2 = this.add.text(0.3 * game.config.width, 0.5 * game.config.height, "Está registado como professor", {
            fontFamily: 'Arial',
            fontSize: 35,
            color: '#B40404',
            align: 'center'
        })
        this.loginErrorMsg2.visible = false;

        let user = `<input type="text" name="username" style="font-size: 15px;font-family:'Arial';text-align:center;width: 130px; height: 20px;">`;
        let pass = `<input type="password" name="password" style="font-size: 15px;font-family:'Arial';text-align:center;width: 130px; height: 22px;">`;

        x = this.add.dom(0.5265 * game.config.width, 0.395 * game.config.height).createFromHTML(user);
        x.setScale(3);
        x.visible = false;

        y = this.add.dom(0.525 * game.config.width, 0.53 * game.config.height).createFromHTML(pass);
        y.setScale(3);
        y.visible = false;


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
                case this.playBT:
                    this.scene.stop('Menu');
                    this.scene.start('PlayerVsPlayer');
                    break;
                case this.playBT2:
                    this.scene.start('PlayerVsBot1');
                    break;
                case this.playBT3:
                    this.scene.start('PlayerVsBot2');
                    break;
                case this.fullscreenBT1:
                    this.scale.startFullscreen();
                    this.fullscreenBT1.visible = false;
                    this.fullscreenBT2.visible = true;
                    break;
                case this.fullscreenBT2:
                    this.scale.stopFullscreen();
                    this.fullscreenBT1.visible = true;
                    this.fullscreenBT2.visible = false;
                    break;
                case this.loginBT:
                    this.playBT.visible = false;
                    this.playBT2.visible = false;
                    this.playBT3.visible = false;
                    this.loginBT.visible = false;
                    this.creditosBT.visible = true;
                    this.infoBT.visible = true;
                    this.rankingBT.visible = true;
                    this.titulo.visible = true;
                    this.fecharBT.visible = true;
                    this.fecharBT.setPosition(0.57 * width, 0.66 * height);
                    this.loginErrorMsg.visible = false;
                    this.loginErrorMsg2.visible = false;
                    this.creditosPanel.visible = false;
                    this.infoPanel.visible = false;
                    this.loginPanel.visible = true;
                    this.certoBT.visible = true;
                    x.visible = true;
                    y.visible = true;

                    this.certoBT.on('pointerup', function () {
                        let user = x.getChildByName("username").value
                        let password = y.getChildByName("password").value
                        if (user != '' && password != '') {
                            let r = login(user, password, this);
                            x.getChildByName("username").value = '';
                            y.getChildByName("password").value = '';
                        }
                    }, this);
                    break;
                case this.infoBT:
                    this.playBT.visible = false;
                    this.playBT2.visible = false;
                    this.playBT3.visible = false;
                    this.loginBT.visible = true;
                    this.creditosBT.visible = true;
                    this.infoBT.visible = true;
                    this.rankingBT.visible = true;
                    this.titulo.visible = true;
                    this.fecharBT.visible = true;
                    this.fecharBT.setPosition(0.71 * width, 0.3 * height);
                    this.loginErrorMsg.visible = false;
                    this.loginErrorMsg2.visible = false;
                    this.creditosPanel.visible = false;
                    this.infoPanel.visible = true;
                    this.loginBT.visible = false;
                    this.certoBT.visible = false;
                    x.visible = false;
                    y.visible = false;
                    break;
                case this.creditosBT:
                    this.playBT.visible = false;
                    this.playBT2.visible = false;
                    this.playBT3.visible = false;
                    this.loginBT.visible = true;
                    this.creditosBT.visible = true;
                    this.infoBT.visible = true;
                    this.rankingBT.visible = true;
                    this.titulo.visible = true;
                    this.fecharBT.visible = true;
                    this.fecharBT.setPosition(0.71 * width, 0.3 * height);
                    this.loginErrorMsg.visible = false;
                    this.loginErrorMsg2.visible = false;
                    this.creditosPanel.visible = true;
                    this.infoPanel.visible = false;
                    this.loginBT.visible = false;
                    this.certoBT.visible = false;
                    x.visible = false;
                    y.visible = false;
                    break;
                case this.fecharBT:
                    this.playBT.visible = true;
                    this.playBT2.visible = true;
                    this.playBT3.visible = true;
                    this.loginBT.visible = true;
                    this.creditosBT.visible = true;
                    this.infoBT.visible = true;
                    this.rankingBT.visible = true;
                    this.titulo.visible = true;
                    this.fecharBT.visible = false;
                    this.loginErrorMsg.visible = false;
                    this.loginErrorMsg2.visible = false;
                    this.creditosPanel.visible = false;
                    this.infoPanel.visible = false;
                    this.loginPanel.visible = false;
                    this.certoBT.visible = false;
                    x.visible = false;
                    y.visible = false;
                    break;
                case this.logoutBT:
                    this.logoutBT.visible = false;
                    this.loginBT.visible = true;
                    this.ola.visible = false;
                    infoUser.logout();
                    break;
                case this.rankingBT:
                    getTOP(di, df, "", "", this);
                    flag = true;
                    break;
                default:
                    break;
            }
        }, this);


    }

    update() {

        if (call == 0) {
            sessionVerify();
            call = 1;
        }
        height = game.config.height;
        width = game.config.width;

        if (infoUser.user != '' && infoUser.user != 'prof') {
            nome = infoUser.firstName.split(" ");
            nome2 = nome[0];
            this.ola.setText(["Olá, " + nome2]);
            this.ola.visible = true;
            this.loginBT.visible = false;
            this.logoutBT.visible = true;
            this.loginErrorMsg.visible = false;
            this.creditosBT.visible = true;
            this.infoBT.visible = true;
            this.rankingBT.visible = true;
            this.titulo.visible = true;
            this.fecharBT.visible = false;
            this.creditosPanel.visible = false;
            this.infoPanel.visible = false;
            this.playBT.visible = true;
            this.playBT2.visible = true;
            this.playBT3.visible = true;
            this.loginPanel.visible = false;
            this.certoBT.visible = false;
            x.visible = false;
            y.visible = false;

        }

        if (this.scale.isFullscreen) {
            this.fullscreenBT1.visible = false;
            this.fullscreenBT2.visible = true;
        }
        else {
            this.fullscreenBT1.visible = true;
            this.fullscreenBT2.visible = false;
        }
    }
}  