import { Boot } from './scenes/Boot';
import { VS } from './scenes/VSmode';
import { Coop } from './scenes/Coop';
import { GameOver } from './scenes/GameOver';
import { MainMenu } from './scenes/Menus/MainMenu';
import { Preloader } from './scenes/Preloader';

//Hud
import { Hud } from './scenes/Hud/Hud.js';

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
            debug: true, //muestra los colaiders y los movimientos
        },
    },
  
    pixelArt: true,

    scene: [
        Preloader,
        MainMenu,
        VS,
        Coop,
        Boot,
        GameOver,
        Hud,
    ]
};

export default new Phaser.Game(config);