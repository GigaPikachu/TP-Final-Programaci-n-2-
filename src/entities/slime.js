export class slime extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
      
      // Añadir el jugador a la escena y habilitar su física
      scene.add.existing(this);
      scene.physics.add.existing(this);
      
      // Definir animaciones
      this.defAnims(scene, texture);
    }

    defAnims(scene, texture){
        scene.anims.create({
            key: "slime",
            frames: scene.anims.generateFrameNumbers(texture, {
                frames: [1, 0]
            }),
            frameRate: 4,
            repeat: -1 // Repetir la animación infinitamente
        });
    }

    update(){
        
    }
}