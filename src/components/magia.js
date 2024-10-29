export class magia extends Phaser.GameObjects.Arc {
    constructor(scene, x, y, radius, color, alpha) {
        super(scene, x, y, radius, 0, 360, false, color, alpha);

        // Crear la textura de la magia a partir de un gráfico
        this.graphics = scene.add.graphics({ fillStyle: { color: 0xd35400 } }); // color de la magia
        this.graphics.fillCircle(radius, radius, radius); // dibujar un círculo (ajustado para centrar en la textura)
        this.graphics.generateTexture('magias', radius * 2, radius * 2); // genera una textura a partir de la figura anterior
        this.graphics.destroy(); // destruir el gráfico después de generar la textura
    
        // Crea un emisor de partículas en la posición (0, 0) usando una textura con la clave "red"
        this.emitter = scene.add.particles(0, 0, "magias", { 
            speed: 10, // Establece la velocidad inicial de las partículas a 100 unidades (la dirección se determina aleatoriamente)
            lifespan: 100, //tiempo de vida de cada particuña //1000 milisagundos = 1 segundo
            scale: { start: 1, end: 0 }, // Establece la escala de las partículas desde 1 (tamaño completo) hasta 0 (desapareciendo gradualmente)
        });

        scene.add.existing(this);

        this.daño = 20;

        this.emitter.startFollow(this, 0, 0);
    }

    destruir(){
        this.destroy();
        this.emitter.destroy();
    }
}