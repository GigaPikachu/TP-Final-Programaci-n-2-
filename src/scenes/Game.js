import { Scene } from 'phaser';

import { magia } from "../entities/magia.js"
import { jugador } from "../entities/jugador.js"
import { slime } from "../entities/slime.js"

export class Game extends Scene {
    constructor () {
        super('VS');
    }

    init(data) {
        this.text = data.text;
    }

    preload() {

    }

    create() {

        var map = this.make.tilemap({key:"map"})
        var tileset = map.addTilesetImage("Tiles", "tileset");
        this.fondo = map.createLayer("Capa de patrones 1", tileset)
        this.fondo.setCollisionByProperty({colicionador: true})

        //jugadores
        this.jugador1 = new jugador(this, 160, 144, "jugador1", 0); //scene, x, y, texture, frame
        this.jugador2 = new jugador(this, 160 + 32, 144, "jugador2", 0);
        this.physics.add.collider(this.jugador1, this.jugador2)

        this.slime = new slime(this, 144, 64, "slime", 0);

        this.camara1 = this.cameras.add(0, 0, 160, 144);
        this.camara1.startFollow(this.jugador1);

        this.camera2 = this.cameras.add(176, 0, 160, 144);
        this.camera2.startFollow(this.jugador2);

        this.cameras.main.setVisible(false);
    }

    update() {
        this.jugador1.update("jugador1", this);
        this.jugador2.update("jugador2", this);
    }
}
