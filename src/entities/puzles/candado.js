import { llave } from "./llave.js"

export class candado extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, frame, llave_x, llave_y) {
        super(scene, x * 16, y * 16 + 16, "candado", frame);
      
        // Añadir la bandera a la escena y habilitar su física
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.physics.add.collider(this, scene.jugadores, this.abrir, null, this);

        this.setOrigin(0, 1);
        this.setImmovable(true);

        //efectos de sonido
        this.puerta = scene.sound.add('candado', {
            loop: false, // La música se repite en bucle
            volume: 1, // Nivel de volumen (0 a 1)
        });

        this.llave = new llave (scene, llave_x, llave_y, 0)
    }

    abrir(llave, jugador){
        if (!this.llave.active){
            this.puerta.play();
            this.destroy();
        }
    }
}