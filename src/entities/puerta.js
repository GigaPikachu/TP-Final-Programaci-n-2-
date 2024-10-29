import { bandera } from "./bandera.js"

export class puerta extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, frame, b1x, b1y, b2x, b2y) {
        super(scene, x, y, "puerta", frame);
      
        // Añadir la bandera a la escena y habilitar su física
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.physics.add.collider(this, scene.jugadores)

        this.bandera1 = new bandera (scene, b1x, b1y, 3)
        this.bandera2 = new bandera (scene, b2x, b2y, 3)
    }

    update () {

        this.scene.banderas.getChildren().forEach((bandera) => {
            bandera.update();
        })

        if (this.bandera1.frame.name == 1 && this.bandera2.frame.name == 1) {

            this.destroy();
            
        }
    }
}