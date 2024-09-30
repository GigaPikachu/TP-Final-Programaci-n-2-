import { Scene } from 'phaser';

import { caja } from "../entities/caja.js"
import { jugador } from "../entities/jugador.js"
import { slime } from "../entities/slime.js"

const time_gen_enemy = 5000;


export class Game extends Scene {
    constructor () {
        super('VS');
    }

    init(data) {
        this.text = data.text;
    }

    create() {
        if(true){//fondo
            var map = this.make.tilemap({key:"map"})
            var tileset = map.addTilesetImage("Tiles", "tileset");
            this.fondo = map.createLayer("Capa de patrones 1", tileset)
            this.fondo.setCollisionByProperty({colicionador: true})
        }

        //enemigos
        this.enemigos = this.physics.add.group();
        this.enemys_num = 0
        this.slime = []
        this.slime[0] = new slime(this, 144, 64, "slime2", 0);
        this.time.addEvent({
            delay: time_gen_enemy,
            loop: true,
            callback: () => {
                this.enemys_num ++;
                this.pos_x = Phaser.Math.Between(96 + 8, 224 - 8);
                this.pos_y = Phaser.Math.Between(48 + 8, 208 - 8);
                this.slime[this.enemys_num] = new slime(this, this.pos_x, this.pos_y, "slime2", 0);
            },
        });

        //jugadores
        this.jugadores = this.physics.add.group();
        this.hechizos = this.physics.add.group();
        this.jugador1 = new jugador(this, 160, 144, "jugador1", 0); //scene, x, y, texture, frame
        this.jugador2 = new jugador(this, 160 + 32, 144, "jugador2", 0);

        this.cameras.main.setVisible(false);

        //objetos
        this.objetos = this.physics.add.group();
        this.caja = new caja(this, 160, 144 + 32, "caja", 0)
    }

    update() {
        this.jugador1.update("jugador1", this);
        this.jugador2.update("jugador2", this);
        for (this.i = 0; this.i <= this.enemys_num; this.i ++){
            if (this.slime[this.i].active){
                this.slime[this.i].update();
            }
        }
    }
}