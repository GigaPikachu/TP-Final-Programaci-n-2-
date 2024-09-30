import { Boot } from './scenes/Boot';
import { Game } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { MainMenu } from './scenes/Menus/MainMenu';
import { Preloader } from './scenes/Preloader';

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: Phaser.AUTO,
    width: 336,
    height: 144,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        min: {
            width: 320,
            height: 144,
        },
        max: {
            width: 960,
            height: 432,
        },
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0, x: 0 },
            debug: false, //muestra los colaiders y los movimientos
        },
    },
  
    pixelArt: true,

    scene: [
        Preloader,
        MainMenu,
        Game,
        Boot,
        GameOver,
    ]
};

export default new Phaser.Game(config);