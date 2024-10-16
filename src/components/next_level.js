export class next_level extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y);

        // Añadir el objeto a la escena
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Ajustar el tamaño del cuerpo y el origen
        this.body.setSize(32, 16);
        this.setOrigin(0.0);

        // Inicializar las banderas para los jugadores
        this.jugador1EnZona = false;
        this.jugador2EnZona = false;

        // Añadir overlap para ambos jugadores
        scene.physics.add.overlap(this, scene.jugador1, this.onPlayerOverlap, null, this);
        scene.physics.add.overlap(this, scene.jugador2, this.onPlayerOverlap, null, this);
    }

    // Método para manejar el overlap
    onPlayerOverlap(next_level, jugador) {
        if (jugador === this.scene.jugador1) {
            this.jugador1EnZona = true;
        }
        
        if (jugador === this.scene.jugador2) {
            this.jugador2EnZona = true;
        }
    }

    update() {
        // Verificar si alguno de los jugadores ha hecho overlap
        if (this.jugador1EnZona && this.jugador2EnZona) {
            this.scene.scene.start('GameOver'); // Cambiar de escena
        }
    }
}