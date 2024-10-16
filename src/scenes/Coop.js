import { Scene } from 'phaser';

import { caja } from "../entities/caja.js"
import { jugador } from "../entities/jugador2.js"
import { slime } from "../entities/slime.js"

import { next_level } from "../components/next_level.js"

const time_gen_enemy = 5000;
const enemy_max = 0; // enemigos maximos (menos 1)


export class Coop extends Scene {
    constructor () {
        super('Coop');
    }

    init(data) {
        this.text = data.text;
        this.idioma = data.idioma;
    }

    create() {
        if(true){ //fondo
            var map = this.make.tilemap({key:"map"})
            var tileset = map.addTilesetImage("Tiles", "tileset");
            this.fondo = map.createLayer("Capa de patrones 1", tileset)
            this.fondo.setCollisionByProperty({colicionador: true})
        }

        if (true){ //enemigos
            this.enemigos = this.physics.add.group();

            this.slime = []
            this.slime[0] = new slime(this, 144, 64, "slime2", 0);

            this.time.addEvent({
                delay: time_gen_enemy,
                loop: true,
                callback: () => {
                    for (var i = 0; i < enemy_max; i ++){
                        if (this.slime[i] == null || !this.slime[i].active){
                            this.pos_x = Phaser.Math.Between(96 + 8, 224 - 8);
                            this.pos_y = Phaser.Math.Between(48 + 8, 208 - 8);
                            this.slime[i] = new slime(this, this.pos_x, this.pos_y, "slime2", 0);
                            break;
                        }
                    }
                },
            });
        }

        if(true){ //jugadores
            this.jugadores = this.physics.add.group();
            this.hechizos = this.physics.add.group();

            this.jugador1 = new jugador(this, 160, 144, "jugador1", 0); //scene, x, y, texture, frame
            this.jugador2 = new jugador(this, 160 + 32, 144, "jugador2", 0);
    
            this.cameras.main.setVisible(false);
        }

        if (true) { //objetos
            this.objetos = this.physics.add.group();
            this.caja = new caja(this, 64, 64, "caja", 0)

            this.next_level = new next_level(this, 16 * 16, 16);
        }
    }

    update() {
        this.jugador1.update("jugador1", this);
        this.jugador2.update("jugador2", this);

        this.enemigos.getChildren().forEach((enemigos) => {
            enemigos.update()
        })
        this.next_level.update()
    }
}