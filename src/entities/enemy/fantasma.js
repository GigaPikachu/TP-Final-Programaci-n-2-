export class fantasma extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, frame) {
        super(scene, x * 16, y * 16, "fantasma", frame);
        // Añadir el fantasma a la escena y habilitar su física
        scene.add.existing(this);
        scene.physics.add.existing(this);

        scene.fantasmas.add(this);

        this.body.setSize(16, 16);
        this.body.setOffset(0, 16);
        this.setOrigin(0, 0);

        scene.physics.add.overlap(this, scene.cajas, (fantasma, caja) => {
            if (this.estado != "caja"){
                caja.destroy();
                fantasma.setVelocity(0, 0);
                fantasma.anims.play("caja1", true);
                fantasma.estado = null;
    

                scene.time.addEvent({
                    delay: 1000,
                    loop: false,
                    callback: () => {
                        fantasma.estado = "caja";
                        if(fantasma.active){
                            fantasma.anims.play("caja2", true);
                        }
                    }
                });
            }
        })

        scene.physics.add.overlap(this, scene.jugadores, (fantasma, jugador) => {
            if (this.estado == "caja"){
                this.romper.play();
                this.move_to_box = false;
                this.estado = "fantasma";
                this.anims.play("fantasma", true);
                this.direccion = null;
                this.magnitud = null;
            }
        })

        scene.physics.add.overlap(this, scene.enemigos, (fantasma, enemigo) => {
            if (this.estado == "caja"){
                enemigo.veda -= this.ataque;
                this.romper.play();
                this.estado = "fantasma"
                this.anims.play("fantasma", true)
                this.direccion = null;
                this.magnitud = null;
            }
        })

        scene.physics.add.collider(this, scene.fondo, (fantasma, pared) => {
            if (this.estado == "caja"){

                this.romper.play();
                this.estado = "fantasma"
                this.anims.play("fantasma", true)
                this.direccion = null;
                this.magnitud = null;
            }
        })

        //estadisticas
        this.move_to_box = false;
        this.estado = "fantasma"
        this.framerate_mov = 8;

        this.direccion = null;
        this.magnitud = null;

        this.ataque = 40;
        this.distancia_min = 94;
        this.distanciaMinima = this.distancia_min + 1;
        this.velocidad = 20;

        //animaciones
        this.defAnims(scene, "fantasma");

        //efectos de sonido
        this.romper = scene.sound.add('romper', {
            loop: false, // La música se repite en bucle
            volume: 0.7, // Nivel de volumen (0 a 1)
        });
    }

    defAnims(scene, texture){
        scene.anims.create({ // abajo
            key: "fantasma",
            frames: scene.anims.generateFrameNumbers(texture, {
                frames: [0, 1]
            }),
            frameRate: this.framerate_mov,
            repeat: -1 // Repetir la animación infinitamente
        });

        scene.anims.create({ // abajo
            key: "caja1",
            frames: scene.anims.generateFrameNumbers(texture, {
                frames: [2, 3, 4]
            }),
            frameRate: this.framerate_mov,
            repeat: 0 // Repetir la animación infinitamente
        });

        scene.anims.create({ // abajo
            key: "caja2",
            frames: scene.anims.generateFrameNumbers(texture, {
                frames: [4, 3]
            }),
            frameRate: this.framerate_mov,
            repeat: -1 // Repetir la animación infinitamente
        });
    }

    update(){
        if(this.estado === "fantasma"){
            this.anims.play("fantasma", true);

            if (this.move_to_box === false){ //detectar a un jugador
                this.jugadorcerca = null;
                this.distanciaMinima = this.distancia_min + 1;

                this.scene.jugadores.getChildren().forEach((miembro) => { //repasa todos los miembros de un grupo
                    const distancia = Phaser.Math.Distance.Between(this.x, this.y, miembro.x, miembro.y)
                    if (distancia <= this.distancia_min && distancia < this.distanciaMinima){
                        this.jugadorcerca = miembro;
                        this.distanciaMinima = distancia;
                    }
                })

                if (this.jugadorcerca != null){
                    this.move_to_box = true;
                }

                else if (this.jugadorcerca == null || this.setVelocity(0, 0) && this.estado == "fantasma"){
                    this.anims.stop()
                    this.setFrame(0)
                    this.setVelocity(0, 0);
                }
            }

            else if (this.move_to_box === true){ //moverse a una caja cercana
                this.cajacerca = null;
                this.distanciaMinima = this.distancia_min + 1;

                this.scene.cajas.getChildren().forEach((miembro) => { //repasa todos los miembros de un grupo
                    const distancia = Phaser.Math.Distance.Between(this.x, this.y, miembro.x, miembro.y)
                    if (distancia <= this.distancia_min && distancia < this.distanciaMinima){
                        this.cajacerca = miembro;
                        this.distanciaMinima = distancia;
                    }
                })

                if (this.cajacerca != null){
                    if (this.cajacerca.active){
                        this.scene.physics.moveToObject(this, this.cajacerca, this.velocidad);
                    }
                    else {
                        this.scene.cajas.getChildren().forEach((miembro) => { //repasa todos los miembros de un grupo
                            const distancia = Phaser.Math.Distance.Between(this.x, this.y, miembro.x, miembro.y)
                            if (distancia <= this.distancia_min && distancia < this.distanciaMinima){
                                this.cajacerca = miembro;
                                this.distanciaMinima = distancia;
                            }
                        })
                    }
                }

                else {
                    this.anims.stop()
                    this.destroy()
                }
            }
            
        }

        else if (this.estado === "caja") { //si ya poseyo una caja
            if (this.direccion === null && this.magnitud === null){
                this.direccion = []
                this.direccion[0] = this.jugadorcerca.x - this.x;
                this.direccion[1] = this.jugadorcerca.y - this.y;

                this.magnitud = Math.sqrt(this.direccion[1] * this.direccion[1] + this.direccion[1] * this.direccion[1]);

                this.direccion[0] = this.direccion[0] / this.magnitud;
                this.direccion[1] = this.direccion[1] / this.magnitud;
            }

            else {
                this.setVelocity(this.direccion[0] * this.velocidad * 10, this.direccion[1] * this.velocidad * 10)
            }
        }

        this.setDepth(this.y);
    }
}