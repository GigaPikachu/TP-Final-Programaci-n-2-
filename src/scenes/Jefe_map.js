import { Scene } from 'phaser';

import { craneo } from "../entities/enemy/craneo.js"
import { jugador } from "../entities/jugador2.js"
import { caja } from "../entities/caja.js"
import { fantasma } from "../entities/enemy/fantasma.js"

export class Jefe_map1 extends Scene {
    constructor () {
        super('Coop3');
    }

    init(data) {
        this.text = data.text;
        this.idioma = data.idioma;
        this.vida = [];
        this.vida[0] = 100;
        this.vida[1] = 100;

        // Hud
        this.monedas = 0;
    }

    create() {

        if(true){ //fondo
            this.map = this.make.tilemap({key:"Jefe_map"})
            this.tileset = this.map.addTilesetImage("Tiled", "tileset");
            this.fondo = this.map.createLayer("Background", this.tileset)
            this.fondo.setCollisionByProperty({colicionador: true})

            this.banderas = this.physics.add.group()
            this.jugadores = this.physics.add.group();
            this.objetos = this.physics.add.group();
            this.cajas = this.physics.add.group();
            this.enemigos = this.physics.add.group();
            this.fantasmas = this.physics.add.group();
            this.hechizos = this.physics.add.group();
        }

        if(true){ //jugadores

            this.jugador1 = new jugador(this, 4, 4, "jugador1", 6, this.vida[0]); //scene, x, y, texture, frame
            this.jugador2 = new jugador(this, 4, 5, "jugador2", 6, this.vida[1]);
        }

        if(true){ //jefe
            this.enemigo = [];
            this.caja = new caja(this, 10.5, 4, "caja", 0);

            this.enemigo[0] = new craneo(this, 10, 3, 0);

            this.enemigo[1] = new fantasma(this, 7, 5, 0);
            
        }
    }

    update() {

        this.fantasmas.getChildren().forEach((enemigos) => {
            enemigos.update();
        })

        if (!this.caja.active){
            this.enemigos.getChildren().forEach((enemigos) => {
                enemigos.update();
            })
            this.enemigo[1].destroy();
            
            this.jugador1.update("jugador1", this);
            this.jugador2.update("jugador2", this);
        }
        else{
            this.physics.moveToObject(this.enemigo[1], this.caja, this.enemigo[1].velocidad);
        }
    }
}