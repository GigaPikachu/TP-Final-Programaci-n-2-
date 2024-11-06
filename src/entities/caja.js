import {objetos} from "./objetos/objetos.js";

const objeto = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "pocion",
    "pocion",
    "pocion",
    "escudo",
    "escudo",
    "escudo",
    "magia",
    "moneda",
    "moneda",
    "moneda",
    "moneda",
    "moneda",
    "moneda",
];

export class caja extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x * 16, y * 16, texture, frame);

        //efectos de sonido
        this.romper = scene.sound.add('romper', {
            loop: false, // La música se repite en bucle
            volume: 0.7, // Nivel de volumen (0 a 1)
        });

        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.objetos.add(this)
        scene.cajas.add(this)
        this.setOrigin(0, 0);

        scene.physics.add.collider(this, scene.fondo)
        scene.physics.add.collider(this, scene.jugadores)
        scene.physics.add.collider(this, scene.hechizos, (caja, hechizo) => {
            this.randome = objeto[Math.floor(Math.random() * objeto.length)];
            caja.romper.play();
            caja.destroy();
            hechizo.destruir(scene);
            this.objeto = new objetos (scene, this.x, this.y, this.randome, 0, 0);
        })

        this.body.immovable = true;
    }
}