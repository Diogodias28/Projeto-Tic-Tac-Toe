/**
 * Class of Scene that shows ranking between players
 */
class rankingScene extends Phaser.Scene {
    /**
     * Create new empty scene
     */
    constructor() {
        super('rankingScene');
    }

    /**
     * Get data passed from calling scene
     * @param {*} data Data 
     */
    init(data) {
        this.array = data;
    }

    /**
     * Preload needed plugin
     */
    preload() {
        this.load.image('titulo', 'Assets/titulo-TTT.png');
        this.load.image('menuBT', 'Assets/bt_home.png');
        this.load.image('background', 'Assets/Background-tictactoe.3d.png');
        this.load.scenePlugin('rexuiplugin', 'gridTable.min.js', 'rexUI', 'rexUI');

    }

    /**
     * Create needed images and get ranking values
     */
    create() {
        var color1 = '#FFD700';
        var color2 = '#FFEBCD';
        var gridConfig = {
            'scene': this,
            'cols': 15,
            'rows': 15
        }
        this.aGrid = new AlignGrid(gridConfig);

        var d = new Date();
        var m = d.getMonth();
        var n = d.getFullYear();
        if (m > 7) {
            var x = n;
            var y = n + 1;
        }
        else {
            var x = n - 1;
            var y = n;
        }

        this.di = x + "-09-01";
        this.df = y + "-08-31";
        this.dificulty = 1;

        //BACKGROUND
        this.background = this.add.sprite(0.5 * game.config.width, 0.5 * game.config.height, 'background');
        this.background.setScale(1.5);

        //Titulo
        this.titulo = this.add.sprite(0.5 * game.config.width, 0.13 * game.config.height, 'titulo');
        this.titulo.setScale(1.3);
        this.aGrid.placeAtIndex(37, this.titulo);

        //menu
        this.menuBT = this.add.sprite(0.065 * game.config.width, 0.1 * game.config.height, 'menuBT');
        this.menuBT.setScale(0.9);
        this.menuBT.setInteractive({ useHandCursor: true });
        this.menuBT.name = 'menuBT';

        this.menuBT.on('pointerover', () => {
            this.menuBT.displayHeight += 5;
            this.menuBT.displayWidth += 5;

        });
        this.menuBT.on('pointerout', () => {
            this.menuBT.displayHeight -= 5;
            this.menuBT.displayWidth -= 5;
        });

        this.tipoJogo = 1; // 1 = Fácil, 2 = Difícil

        //TABLEE
        var scrollMode = 0; // 0:vertical, 1:horizontal

        this.table = this.rexUI.add.gridTable({
            x: 1038,
            y: 686,
            width: 1575,
            height: 640,

            scrollMode: scrollMode,

            background: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, 0x070719).setAlpha(0.2),

            table: {
                cellWidth: 50,
                cellHeight: 50,
                columns: 6,

                mask: {
                    padding: 2,
                    updateMode: 0,
                },

                reuseCellContainer: true,
            },

            slider: {
                track: this.rexUI.add.roundRectangle(0, 0, 10, 10, 10, 0x0B610B),
                thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, 0x3ADF00),
            },
            space: {
                left: 10,
                right: 26,
                top: 132,
                bottom: 30,

                table: 10,
                header: 10,
                footer: 10,
            },


            createCellContainerCallback: (cell, cellContainer) => {
                const scene = cell.scene;
                const item = cell.item;
                const index = cell.index;
                let width, textValue;

                switch (index % 6) {
                    case 0: // Posição
                        width = 100;
                        textValue = item.position;
                        break;
                    case 1: // Nome
                        width = 300;
                        textValue = item.name;
                        break;
                    case 2: // Pontos
                        width = 150;
                        textValue = item.points;
                        break;
                    case 3: // Escola
                        width = 400;
                        textValue = item.school;
                        break;
                    case 4: // Turma
                        width = 150;
                        textValue = item.class;
                        break;
                    case 5: // Data
                        width = 200;
                        textValue = item.date;
                        break;
                }

                return scene.rexUI.add.label({
                    width: width,
                    height: cell.height,
                    orientation: 'left-to-right',
                    text: scene.add.text(0, 0, textValue, {
                        fontFamily: "font1",
                        fontSize: 28,
                        color: cell.index % 7 === 0 ? '#FFD700' : '#FFFFFF'
                    }),
                    align: 'center',
                    space: {
                        left: 10,
                        right: 10,
                        top: 5,
                        bottom: 5
                    }
                });
            },
            items: this.CreateItems()
        }).layout();

        this.aGrid.placeAt(6.3535, 7.87, this.table);


        this.input.on('gameobjectdown', function (pointer, gameObject) {
            switch (gameObject.name) {
                case 'menuBT':
                    this.scene.transition({ target: 'Menu', duration: 100 });
                    flag = false;
                    break;

                default:
                    break;
            }
        }, this);


        this.container = this.rexUI.add.roundRectangle(0, 0, 200, 640, 0, 0x070719).setAlpha(0.2);
        this.container.setOrigin(0.6, 0.5155);
        this.aGrid.placeAtIndex(133, this.container);

        this.lastclick;

        this.dropdown = this.rexUI.add.gridTable({
            x: 1800,
            y: 585,
            width: 160,
            height: 280,

            scrollMode: scrollMode,

            table: {
                cellWidth: 100,
                cellHeight: 50,
                columns: 1,

                mask: {
                    padding: 2,
                    updateMode: 0,
                },

                reuseCellContainer: true,
            },



            slider: {
                track: this.rexUI.add.roundRectangle(0, 0, 10, 10, 10, 0x0B610B),
                thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, 0x3ADF00),
            },
            space: {
                left: 20,
                right: -25,
                top: 35,
                bottom: 20,

                table: 10,
                header: 10,
                footer: 10,
            },

            createCellContainerCallback: function (cell, cellContainer) {

                var scene = cell.scene,
                    width = cell.width,
                    height = cell.height,
                    item = cell.item,
                    index = cell.index,

                    cellContainer = scene.rexUI.add.label({
                        width: width,
                        height: height,

                        orientation: 0,
                        icon: scene.add.circle(0, 50, 10).setFillStyle('0xffffff'),
                        text: scene.add.text(50, 50, item, { fontFamily: "font1", fontSize: 30, color: '#0B610B', align: 'center' }),
                        align: 'center',
                        space: {
                            icon: 20,
                        }
                    });


                var m = d.getMonth();
                var n = d.getFullYear();
                if (m > 7) {
                    var x = n;
                    var y = n + 1;
                }
                else {
                    var x = n - 1;
                    var y = n;
                }

                x = "" + x;
                y = "" + y;

                cellContainer.setInteractive({ useHandCursor: true });
                cellContainer.on('pointerdown', () => {
                    if (scene.lastclick) {
                        scene.lastclick.setFillStyle('0xffffff');
                    }
                    scene.lastclick = cellContainer.getElement('icon').setFillStyle('0x088A08');

                    if (cellContainer.getElement('text')._text != "Todos") {
                        scene.di = "20" + cellContainer.getElement('text')._text.split('-')[0] + "-9-1";
                        scene.df = "20" + cellContainer.getElement('text')._text.split('-')[1] + "-8-31";

                    }
                    else {
                        scene.di = "2015-09-01"
                        scene.df = new Date().toISOString().slice(0, 10)
                    }
                    console.log("1: " + scene.di + " | " + scene.df + " | " + infoUser.turma + " | " + infoUser.escola + " | " + scene + " | " + scene.tipoJogo);
                    updateTOP(scene.di, scene.df, infoUser.turma, infoUser.escola, 2, scene, scene.tipoJogo);
                });

                let tmp = x.slice(2, 4) + "-" + y.slice(2, 4);
                if (cellContainer.getElement('text')._text == tmp) {
                    scene.lastclick = cellContainer.getElement('icon').setFillStyle('0xffffff');
                }

                return cellContainer;


            },
            items: this.selectYear()
        })
            .layout()


        this.ano = this.add.text(0, 0, 'Ano letivo', { fontFamily: 'font1', fontSize: 32, color: '#0A2A0A' });
        this.ano.setOrigin(0.65, 1.1);
        this.aGrid.placeAtIndex(73, this.ano);
        this.ano.y = 418;


        //Filtros
        this.filtro = this.add.text(0, 0, 'Filtro', { fontFamily: 'font1', fontSize: 32, color: '#0A2A0A' });
        this.filtro.setOrigin(1.3, 1);
        this.aGrid.placeAtIndex(163.3, this.filtro);
        this.filtro.y -= 50;


        //Todos
        this.todos = this.add.text(0, 0, 'Todos', { fontFamily: "font1", fontSize: 30, color: '#0B610B', align: 'left' });
        this.todos.setOrigin(0.8, 1.7);
        this.aGrid.placeAtIndex(178, this.todos);
        this.todos_icon = this.add.circle(0, 0, 10).setFillStyle('0xffffff');
        this.todos_icon.setOrigin(5.18, 3);
        this.aGrid.placeAtIndex(178, this.todos_icon);
        this.todos.setInteractive({ useHandCursor: true });

        //Escola
        this.escola_filtro = this.add.text(0, 0, 'Escola', { fontFamily: "font1", fontSize: 30, color: '#0B610B', align: 'left' });
        this.escola_filtro.setOrigin(0.8, 0.3);
        this.aGrid.placeAtIndex(178, this.escola_filtro);
        this.escola_icon = this.add.circle(0, 0, 10).setFillStyle('0xffffff');
        this.escola_icon.setOrigin(5.18, 0);
        this.aGrid.placeAtIndex(178, this.escola_icon);
        this.escola_filtro.setInteractive({ useHandCursor: true });

        //Turma
        this.turma_filtro = this.add.text(0, 0, 'Turma', { fontFamily: "font1", fontSize: 30, color: '#0B610B', align: 'left' });
        this.turma_filtro.setOrigin(0.8, -1);
        this.aGrid.placeAtIndex(178, this.turma_filtro);
        this.turma_icon = this.add.circle(0, 0, 10).setFillStyle('0xffffff');
        this.turma_icon.setOrigin(5.18, -2.5);
        this.aGrid.placeAtIndex(178, this.turma_icon);
        this.turma_filtro.setInteractive({ useHandCursor: true });


        this.todos.input.hitArea.setTo(-50, -5, this.todos.width + 60, this.todos.height);

        this.todos.y -= 50;
        this.escola_filtro.y -= 50;
        this.turma_filtro.y -= 50;
        this.todos_icon.y -= 40;
        this.turma_icon.y -= 50;
        this.escola_icon.y -= 50;
        this.todos.on('pointerdown', () => {

            this.todos_icon.setFillStyle('0x088A08');

            this.escola_icon.setFillStyle('0xffffff');

            this.turma_icon.setFillStyle('0xffffff');

            this.flag = 2;
            console.log("2: " + scene.di + " " + scene.df + " " + infoUser.turma + " " + infoUser.escola + " " + scene);

            updateTOP(this.di, this.df, infoUser.turma, infoUser.escola, this.flag, this, scene.tipoJogo);

        });

        this.escola_filtro.input.hitArea.setTo(-50, -5, this.escola_filtro.width + 60, this.escola_filtro.height);
        this.escola_filtro.on('pointerdown', () => {

            this.todos_icon.setFillStyle('0xffffff');

            this.escola_icon.setFillStyle('0x088A08');

            this.turma_icon.setFillStyle('0xffffff');

            this.flag = 1;
            console.log("3: " + scene.di + " " + scene.df + " " + infoUser.turma + " " + infoUser.escola + " " + scene);

            updateTOP(this.di, this.df, infoUser.turma, infoUser.escola, this.flag, this, scene.tipoJogo);
        });

        this.turma_filtro.input.hitArea.setTo(-50, -5, this.turma_filtro.width + 60, this.turma_filtro.height);

        this.turma_filtro.on('pointerdown', () => {
            this.todos_icon.setFillStyle('0xffffff');

            this.escola_icon.setFillStyle('0xffffff');

            this.turma_icon.setFillStyle('0x088A08');

            this.flag = 0;

            console.log("4: " + scene.di + " " + scene.df + " " + infoUser.turma + " " + infoUser.escola + " " + scene);

            updateTOP(this.di, this.df, infoUser.turma, infoUser.escola, this.flag, this, scene.tipoJogo);
        });
        this.filtro.visible = false;
        this.todos.visible = false;
        this.todos_icon.visible = false;
        this.escola_icon.visible = false;
        this.escola_filtro.visible = false;
        this.turma_icon.visible = false;
        this.turma_filtro.visible = false;

        if (infoUser.user != '') {
            this.filtro.visible = true;
            this.todos.visible = true;
            this.todos_icon.visible = true;
            this.escola_icon.visible = true;
            this.escola_filtro.visible = true;
            this.turma_icon.visible = true;
            this.turma_filtro.visible = true;
            this.todos_icon.setFillStyle('0xffffff');
            this.escola_icon.setFillStyle('0xffffff');
            this.turma_icon.setFillStyle('0xffffff');

        }

        this.jogador = this.add.text(0, 0, 'Jogador', { fontFamily: 'font1', fontSize: 40, color: '#0A2A0A' });
        this.jogador.setOrigin(0.3, 1.5);

        this.pontos = this.add.text(0, 0, 'Pontos', { fontFamily: 'font1', fontSize: 40, color: '#0A2A0A' });
        this.pontos.setOrigin(0, 1.5);

        this.escola = this.add.text(0, 0, 'Escola', { fontFamily: 'font1', fontSize: 40, color: '#0A2A0A' });
        this.escola.setOrigin(0.7, 1.5);

        this.turma = this.add.text(0, 0, 'Turma', { fontFamily: 'font1', fontSize: 40, color: '#0A2A0A' });
        this.turma.setOrigin(1.146, 1.5);

        this.data = this.add.text(0, 0, 'Data', {
            fontFamily: 'font1',
            fontSize: 40,
            color: '#0A2A0A'
        });
        this.data.setOrigin(1.8, 1.5);

        this.aGrid.placeAtIndex(77, this.jogador);
        this.aGrid.placeAtIndex(78.5, this.pontos);
        this.aGrid.placeAtIndex(81, this.escola);
        this.aGrid.placeAtIndex(83, this.turma);
        this.aGrid.placeAtIndex(85, this.data);

        // Adicionar esta seção após os filtros existentes (Turma, Escola, Todos)
        // ========== FILTRO DE TIPO DE JOGO ==========
        this.tipoJogoLabel = this.add.text(0, 0, 'Tipo de Jogo', { fontFamily: 'font1', fontSize: 32, color: '#0A2A0A' });
        this.tipoJogoLabel.setOrigin(1.3, 1);
        this.aGrid.placeAtIndex(193.7, this.tipoJogoLabel);

        // Botão para modo Fácil (Bot1)
        this.facil = this.add.text(0, 0, 'Bot1', { fontFamily: "font1", fontSize: 30, color: '#0B610B', align: 'left' });
        this.facil.setOrigin(0.8, 1.7);
        this.aGrid.placeAtIndex(208, this.facil);
        this.facil_icon = this.add.circle(0, 0, 10).setFillStyle('0xffffff');
        this.facil_icon.setOrigin(5.18, 3);
        this.aGrid.placeAtIndex(208, this.facil_icon);
        this.facil.setInteractive({ useHandCursor: true });

        // Botão para modo Difícil (Bot2)
        this.dificil = this.add.text(0, 0, 'Bot2', { fontFamily: "font1", fontSize: 30, color: '#0B610B', align: 'left' });
        this.dificil.setOrigin(0.8, 0.3);
        this.aGrid.placeAtIndex(208, this.dificil);
        this.dificil_icon = this.add.circle(0, 0, 10).setFillStyle('0xffffff');
        this.dificil_icon.setOrigin(5.18, 0);
        this.aGrid.placeAtIndex(208, this.dificil_icon);
        this.dificil.setInteractive({ useHandCursor: true });

        // Posicionamento
        this.tipoJogoLabel.y -= 220;
        this.tipoJogoLabel.x += 10;
        this.facil.y -= 200;
        this.dificil.y -= 200;
        this.facil_icon.y -= 187;
        this.dificil_icon.y -= 205;

        // Estado inicial (Fácil selecionado)
        this.tipoJogo = 1; // 1 = Fácil (Bot1), 2 = Difícil (Bot2)
        this.facil_icon.setFillStyle('0x088A08');

        // Event handlers
        this.facil.input.hitArea.setTo(-50, -5, this.facil.width + 60, this.facil.height);
        this.facil.on('pointerdown', () => {
            this.tipoJogo = 1;
            this.facil_icon.setFillStyle('0x088A08');
            this.dificil_icon.setFillStyle('0xffffff');
            this.atualizarTabela();
        });

        this.dificil.input.hitArea.setTo(-50, -5, this.dificil.width + 60, this.dificil.height);
        this.dificil.on('pointerdown', () => {
            this.tipoJogo = 2;
            this.facil_icon.setFillStyle('0xffffff');
            this.dificil_icon.setFillStyle('0x088A08');
            this.atualizarTabela();
        });

        // Função para atualizar a tabela com o tipo selecionado
        this.atualizarTabela = function () {
            updateTOP(this.di, this.df, infoUser.turma, infoUser.escola, this.flag, this, this.tipoJogo);
        };
    }

    /**
     * Create array from scene data
     * @param {number} count number of items
     */
    CreateItems() {
        var data = [];
        if (!this.array || this.array.length === 0) {
            return [];
        }

        for (var i = 0; i < this.array.length; i += 5) {
            if (i + 4 < this.array.length) {
                data.push({
                    position: (i / 5 + 1).toString(),
                    name: this.array[i],
                    points: this.array[i + 1],
                    school: this.array[i + 2],
                    class: this.array[i + 3],
                    date: this.array[i + 4]
                });
            }
        }

        return data;
    }

    /**
     * Select ranking year to check
     * @returns {data} Ranking information
     */
    selectYear() {
        var data = []

        var d = new Date();
        var m = d.getMonth();
        var n = d.getFullYear();
        if (m > 7) {
            var x = n;
            var y = n + 1;
        }
        else {
            var x = n - 1;
            var y = n;
        }
        let di = x + "-09-01";
        let df = y + "-08-31";
        let j = 15;
        for (let i = 2015; i < y; i++) {

            data.push("" + j + "-" + (j + 1));
            j++;
        }
        data.push("Todos");
        data = data.reverse();
        return data;
    }
}
