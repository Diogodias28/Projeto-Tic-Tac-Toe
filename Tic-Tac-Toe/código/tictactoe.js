window.onload = function() {
    var config = {
        width : 1460,
        height : 780,
        backgroundColor: 0x000000,
        scene : [TitleScreen, GameScreen],
        pixelArt: true,
    }
    
    var game = new Phaser.Game(config);
}
