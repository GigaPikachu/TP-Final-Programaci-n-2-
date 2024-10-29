var vida = 50

export class esqueleto extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        // Añadir el esqueleto a la escena y habilitar su física
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.tocando_piso = true;

        //estadisticas
        this.velocidad = 25;
        this.framerate_mov = this.velocidad / 4;
        this.distancia_min = 96;
        this.ataque = 20;

        this.estado = "nada"

        this.vida = []
        this.vida[0] = vida // vida inicial
        this.vida[1] = vida // vida restante

        this.barra_vida = []
        this.barra_vida[0] = scene.physics.add.image(this.x, this.y - 12, "mini_bar");
        this.barra_vida[1] = scene.add.rectangle(this.x, this.y - 16, 16, 3, 0xff0000); scene.physics.add.existing(this.barra_vida[1]);

        //colicionadores
        this.setOrigin(0.75);
        scene.enemigos.add(this);
        scene.physics.add.collider(this, scene.fondo)
        scene.physics.add.collider(this, scene.enemigos)

        this.defAnims(scene, texture);
    }

    defAnims(scene, texture){
        scene.anims.create({ // izquierda
            key: "esqueleto_izq",
            frames: scene.anims.generateFrameNumbers(texture, {
                frames: [9, 10, 11, 10]
            }),
            frameRate: this.framerate_mov,
            repeat: 1 // Repetir la animación infinitamente
        });
        scene.anims.create({ // derecha
            key: "esqueleto_der",
            frames: scene.anims.generateFrameNumbers(texture, {
                frames: [6, 7, 8, 7]
            }),
            frameRate: this.framerate_mov,
            repeat: 1 // Repetir la animación infinitamente
        });
        scene.anims.create({ // arriba
            key: "esqueleto_arr",
            frames: scene.anims.generateFrameNumbers(texture, {
                frames: [3, 4, 5, 4]
            }),
            frameRate: this.framerate_mov,
            repeat: 1 // Repetir la animación infinitamente
        });
        scene.anims.create({ // abajo
            key: "esqueleto_aba",
            frames: scene.anims.generateFrameNumbers(texture, {
                frames: [0, 1, 2, 1]
            }),
            frameRate: this.framerate_mov,
            repeat: 1 // Repetir la animación infinitamente
        });
    }

    update(){
        if(true){//seguir al jugador
            this.jugadorcerca = null;
            this.distanciaMinima = this.distancia_min + 1;

            if (this.vida[1] > 0){
                this.scene.jugadores.getChildren().forEach((miembro) => { //repasa todos los miembros de un grupo
                    this.distancia = Phaser.Math.Distance.Between(this.x, this.y, miembro.x, miembro.y)
                    if (this.distancia <= this.distancia_min && this.distancia < this.distanciaMinima){
                        this.jugadorcerca = miembro;
                        this.distanciaMinima = this.distancia;
                    }
                })
    
                if (this.jugadorcerca != null){
                    this.scene.physics.moveToObject(this, this.jugadorcerca, this.velocidad);

                    if (this.body.velocity.y > 0 && (this.body.velocity.x < (-this.velocidad) / 2 || this.body.velocity.x > this.velocidad / 2) ) {
                        this.anims.play("esqueleto_aba", true)
                    }
                    else if (this.body.velocity.y < 0) {
                        this.anims.play("esqueleto_arr", true)
                    }

                    else if (this.body.velocity.x < 0) {
                        this.anims.play("esqueleto_izq", true)
                    }
                    
                    else if (this.body.velocity.x > 0) {
                        this.anims.play("esqueleto_der", true)
                    }
                }
    
                else if (this.jugadorcerca == null || this.setVelocity(0, 0)){
                    this.anims.stop()
                    this.setFrame(0)
                    this.setVelocity(0, 0);
                }
            }
        }

        if (true) { //barra de vida
            for(this.i = 0; this.i <= 1; this.i ++){
                this.barra_vida[this.i].x = this.x; this.barra_vida[this.i].y = this.y - 16;
            }

            this.barra_vida[1].setSize(16 / this.vida[0] * this.vida[1], 3);

            if (this.vida[1] <= 0){
                this.destroy();
                this.barra_vida[0].destroy(); this.barra_vida[1].destroy();
            }
        }
    }
}