import { boton } from "./boton.js"

export class P_boton extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, frame, b1x, b1y, b2x, b2y, x2, y2) {
        super(scene, x * 16, y * 16 - 16, "puerta", frame);

        this.x2 = x2 * 16;
        this.y2 = y2 * 16;

        // Añadir la bandera a la escena y habilitar su física
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.physics.add.collider(this, scene.jugadores);
        scene.physics.add.collider(this, scene.enemigos);

        this.setOrigin(0, 0);
        this.setImmovable(true);

        //efectos de sonido
        this.puerta = scene.sound.add('puerta', {
            loop: false, // La música se repite en bucle
            volume: 0.5, // Nivel de volumen (0 a 1)
        });

        this.boton1 = new boton (scene, b1x, b1y, 0)
        this.boton2 = new boton (scene, b2x, b2y, 0)
    }

    update () {

        this.boton1.update();
        this.boton2.update();

        if (this.boton1.precionado == true && this.boton2.precionado == true){
            this.puerta.play()
            this.x = this.x2; this.y = this.y2;
        }
    }
}