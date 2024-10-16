import { Scene } from 'phaser';

import { jugador } from "../entities/jugador2.js"

export class GameOver extends Scene
{
    constructor () {
        super('GameOver');
    }

    init(data){
        this.puntos = [];
        this.puntos[0] = data.jugador1 || 0;
        this.puntos[1] = data.jugador2 || 0;
    }

    create () {
        this.jugador1 = this.add.sprite(320 / 3, 144 / 2, "jugador1").setOrigin(0.5);;
        this.jugador2 = this.add.sprite(320 / 3 * 2, 144 / 2, "jugador2").setOrigin(0.5);;

        if (this.puntos[0] < this.puntos[1]){
            this.jugador1.setFrame(17)
            this.jugador2.setFrame(16)
        }

        else if (this.puntos[0] > this.puntos[1]){
            this.jugador1.setFrame(16)
            this.jugador2.setFrame(17)
        }

        this.add.text(320 / 2, 32, 'Game Over', {
            fontFamily: 'GameBoy', fontSize: 16, color: '#000000',
            stroke: '#ffffff', strokeThickness: 4,
            align: 'center'
        }).setOrigin(0.5);

        this.input.once('pointerdown', () => {

            this.scene.start('MainMenu');

        });
    }
}
