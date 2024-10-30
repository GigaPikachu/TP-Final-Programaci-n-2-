import { bandera } from "./bandera.js"

export class puerta extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, frame, b1x, b1y, b2x, b2y) {
        super(scene, x * 16, y * 16, "puerta", frame);
      
        // Añadir la bandera a la escena y habilitar su física
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.physics.add.collider(this, scene.jugadores);

        this.setOrigin(0, 1);
        this.setImmovable(true);

        //efectos de sonido
        this.puerta = scene.sound.add('puerta', {
            loop: false, // La música se repite en bucle
            volume: 0.5, // Nivel de volumen (0 a 1)
        });

        this.bandera1 = new bandera (scene, b1x, b1y, 3)
        this.bandera2 = new bandera (scene, b2x, b2y, 3)
    }

    update () {

        this.scene.banderas.getChildren().forEach((bandera) => {
            bandera.update();
        })

        if (this.bandera1.frame.name == 1 && this.bandera2.frame.name == 1) {

            this.puerta.play()
            this.destroy();
            
        }
    }
}