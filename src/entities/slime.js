const distancia_min = 64;
const velocidad = 25;
const framerate_mov = 8;

var vida = 30

export class slime extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
      
        // Añadir el slime a la escena y habilitar su física
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setSize(16, 16);
        this.body.setOffset(0, 16);
        this.tocando_piso = true;

        //vida
        this.vida = []
        this.vida[0] = vida // vida inicial
        this.vida[1] = vida //vida restante

        this.barra_vida = []
        this.barra_vida[0] = scene.physics.add.image(this.x, this.y - 12, "mini_bar");
        this.barra_vida[1] = scene.add.rectangle(this.x, this.y - 12, 16, 3, 0xff0000); scene.physics.add.existing(this.barra_vida[1]);

        this.ataque = 10;

        //colicionadores
        scene.enemigos.add(this);
        scene.physics.add.collider(this, scene.fondo)

        // Definir animaciones
        if (texture == "slime2"){
            this.defAnims(scene, texture);
        }
    }

    defAnims(scene, texture){
        scene.anims.create({ // abajo
            key: "salto_slime",
            frames: scene.anims.generateFrameNumbers(texture, {
                frames: [0, 1, 2, 3, 4, 3, 2, 1, 0]
            }),
            frameRate: framerate_mov,
            repeat: 1 // Repetir la animación infinitamente
        });
    }

    update(){
        if(true){//seguir al jugador
            var jugadorcerca = null;

            if (this.vida[1] > 0){
                this.scene.jugadores.getChildren().forEach((miembro) => { //repasa todos los miembros de un grupo
                    if (Phaser.Math.Distance.Between(this.x, this.y, miembro.x, miembro.y) <= distancia_min){
                        jugadorcerca = miembro;
                    }
                })
    
                if (jugadorcerca != null){
                    this.anims.play("salto_slime", true);
                    this.scene.physics.moveToObject(this, jugadorcerca, velocidad);
                }
    
                else if (jugadorcerca == null || this.setVelocity(0, 0)){
                    this.anims.stop()
                    this.setFrame(0)
                    this.setVelocity(0, 0);
                }
            }
        }

        if (true) { //barra de vida
            for(this.i = 0; this.i <= 1; this.i ++){
                this.barra_vida[this.i].x = this.x; this.barra_vida[this.i].y = this.y - 4;
            }

            this.barra_vida[1].setSize(16 / this.vida[0] * this.vida[1], 3);

            if (this.vida[1] <= 0){
                this.destroy();
                this.barra_vida[0].destroy(); this.barra_vida[1].destroy();
            }
        }
    }
}