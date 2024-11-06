export class boton extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, frame) {
        super(scene, x * 16, y * 16 - 16, "boton", frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.precionado = false;
        this.setOrigin(0, 0);
        this.setImmovable(true);

        //efectos de sonido
        this.boton = scene.sound.add('boton', {
            loop: false, // La música se repite en bucle
            volume: 1, // Nivel de volumen (0 a 1)
        });

        // Configuramos el overlap solo una vez
        scene.physics.add.overlap(this, scene.jugadores, this.onPlayerOverlap, null, this);
    }

    onPlayerOverlap(boton, jugador) {
        // Solo marcamos el botón como presionado
        if (boton.precionado === false){
            this.boton.play();
        }
        boton.precionado = true;
    }

    update() {
        // No restablecemos `precionado` en cada `update`. 
        // En su lugar, comprobamos si sigue en contacto con el jugador
        if (!this.scene.physics.overlap(this, this.scene.jugadores)) {
            this.precionado = false;
        }
    }
}