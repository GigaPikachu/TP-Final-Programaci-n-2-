import {objetos} from "./objetos.js";
const objeto = [
    "pocion",
    "escudo",
    "magia"
];

export class caja extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
      
        // Añadir el slime a la escena y habilitar su física
        this.randome = objeto[Math.floor(Math.random() * objeto.length)];

        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.objetos.add(this)
        scene.physics.add.collider(this, scene.fondo)
        scene.physics.add.collider(this, scene.jugadores)
        scene.physics.add.collider(this, scene.hechizos, (caja, hechizo) => {
            caja.destroy();
            hechizo.destroy();
            this.objeto = new objetos (scene, this.x, this.y, this.randome, 0);
        })

        this.body.immovable = true;
    }
}