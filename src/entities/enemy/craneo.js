export class craneo extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, frame) {
        super(scene, x * 16, y * 16, "craneo", frame);
        
        // Agregar el sprite al juego y al sistema de físicas
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.enemigos.add(this);

        this.setOrigin(0, 0);
        this.setBounce(0.75);
        this.setDrag(10);
        
        // Colisión con el fondo
        scene.physics.add.collider(this, scene.fondo,  (fantasma, pared) => {
            scene.cameras.main.shake(100, 0.03);
        });

        // Estadísticas
        this.velocidad = 200;
        this.ataque = 50;
        this.vida = [];
        this.vida[0] = 100;
        this.vida[1] = 100;
        this.estado = 0;
        this.animaciones = 0;

        this.direccion = null;
        this.magnitud = null;
        this.jugadorcerca = null;
        this.distancia_min = 320;
        this.distanciaMinima = this.distancia_min + 1;
        this.framerate_mov = 8

        //animaciones
        this.defAnims(scene, "craneo");
    }

    defAnims(scene, texture){
        scene.anims.create({ // abajo
            key: "levantarse",
            frames: scene.anims.generateFrameNumbers(texture, {
                frames: [0, 1, 2, 3, 4]
            }),
            frameRate: this.framerate_mov,
            repeat: 0 // Repetir la animación infinitamente
        });

        scene.anims.create({ // abajo
            key: "flotando",
            frames: scene.anims.generateFrameNumbers(texture, {
                frames: [3, 4]
            }),
            frameRate: this.framerate_mov,
            repeat: -1 // Repetir la animación infinitamente
        });

        scene.anims.create({ // abajo
            key: "caer",
            frames: scene.anims.generateFrameNumbers(texture, {
                frames: [4, 3, 2, 1, 0]
            }),
            frameRate: this.framerate_mov,
            repeat: 0 // Repetir la animación infinitamente
        });
    }

    update() {
        if (this.estado === 1){
            if (this.animaciones === 0){
                this.anims.play("levantarse", true);
                this.animaciones = 1;
            }
            this.scene.time.addEvent({
                delay: 1000,
                loop: false,
                callback: () => {
                    this.estado = 2;
                },
            });
        }
        else if(this.estado === 2){
            if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
                if (this.animaciones === 1){
                    this.anims.play("flotando", true);
                    this.animaciones = 2;
                }
                this.jugadorcerca = null;
                this.distanciaMinima = this.distancia_min + 1;
    
                // Buscar el jugador más cercano
                this.scene.jugadores.getChildren().forEach((miembro) => {
                    const distancia = Phaser.Math.Distance.Between(this.x, this.y, miembro.x, miembro.y);
                    if (distancia <= this.distancia_min && distancia < this.distanciaMinima) {
                        this.jugadorcerca = miembro;
                        this.distanciaMinima = distancia;
                    }
                });
    
                // Calcular dirección hacia el jugador más cercano si se encuentra uno
                if (this.jugadorcerca != null) {
                    this.direccion = [
                        this.jugadorcerca.x - this.x,
                        this.jugadorcerca.y - this.y
                    ];
                    
                    this.magnitud = Math.sqrt(
                        this.direccion[0] * this.direccion[0] + this.direccion[1] * this.direccion[1]
                    );
                    
                    // Normalizar la dirección
                    this.direccion[0] /= this.magnitud;
                    this.direccion[1] /= this.magnitud;
                }
            }
    
            // Si la dirección está definida, aplicar la velocidad
            if (this.direccion != null) {
                this.setVelocity(this.direccion[0] * this.velocidad, this.direccion[1] * this.velocidad);

                this.direccion = null;
                this.magnitud = null;
                this.jugadorcerca = null;
            }

            this.scene.time.addEvent({
                delay: 1000,
                loop: false,
                callback: () => {
                    this.estado = 0;
                },
            });
        }

        else if (this.estado === 0){
            if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
                if (this.animaciones === 2){
                    this.anims.play("caer", true);
                    this.animaciones = 0;
                }

                this.scene.time.addEvent({
                    delay: 1000,
                    loop: false,
                    callback: () => {
                        this.estado = 1;
                    },
                });
            }
        }
        
    }
}