export class llave extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, frame) {
        super(scene, x * 16, y * 16, "llave", frame);
      
        // Añadir la bandera a la escena y habilitar su física
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.physics.add.overlap(this, scene.jugadores, this.abrir, null, this);

        this.setOrigin(0, 0);
        this.setImmovable(true);

        //efectos de sonido
        this.llave = scene.sound.add('llave', {
            loop: false, // La música se repite en bucle
            volume: 1, // Nivel de volumen (0 a 1)
        });
    }

    abrir(llave, jugador){
        this.llave.play();
        this.destroy();
        jugador.scene.time.addEvent({
            delay: 750,
            loop: false,
            callback: () => {
                this.llave.stop();
            }
        })
    }
}