import {magia} from "../components/magia.js";

let framerate_mov = 4;
let framerate_accion = 4;
let velocidad = 50

export class jugador extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
      
        // Añadir el jugador a la escena y habilitar su física
        scene.add.existing(this);
        scene.physics.add.existing(this);
  
        /* Ajustar las propiedades físicas del jugador
        this.setCollideWorldBounds(true);*/
        //coliciones
        scene.physics.add.collider(this, scene.fondo)
      
        // Definir animaciones
        this.defAnims(scene, texture);

        this.setTeclas(scene, texture)
    }

    defAnims(scene, texture){
        //caminar
        scene.anims.create({ // abajo
            key: texture + "abajo",
            frames: scene.anims.generateFrameNumbers(texture, {
                frames: [1, 0]
            }),
            frameRate: framerate_mov,
            repeat: -1 // Repetir la animación infinitamente
        });
        
        scene.anims.create({ // arriba
            key: texture + "arriba",
            frames: scene.anims.generateFrameNumbers(texture, {
                frames: [2, 3]
            }),
            frameRate: framerate_mov,
            repeat: -1 // Repetir la animación infinitamente
        });
        
        scene.anims.create({ // izquierda
            key: texture + "izquierda",
            frames: scene.anims.generateFrameNumbers(texture, {
                frames: [5, 4]
            }),
            frameRate: framerate_mov,
            repeat: -1 // Repetir la animación infinitamente
        });
        
        scene.anims.create({ // derecha
            key: texture + "derecha",
            frames: scene.anims.generateFrameNumbers(texture, {
                frames: [7, 6]
            }),
            frameRate: framerate_mov,
            repeat: -1 // Repetir la animación infinitamente
        });

        //accion
        scene.anims.create({ // abajo
            key: texture + "accion" + "abajo",
            frames: scene.anims.generateFrameNumbers(texture, {
                frames: [8, 9]
            }),
            frameRate: framerate_accion,
            repeat: 0 // Repetir la animación infinitamente
        });
        
        scene.anims.create({ // arriba
            key: texture + "accion" + "arriba",
            frames: scene.anims.generateFrameNumbers(texture, {
                frames: [10, 11]
            }),
            frameRate: framerate_accion,
            repeat: 0 // Repetir la animación infinitamente
        });
        
        scene.anims.create({ // izquierda
            key: texture + "accion" + "izquierda",
            frames: scene.anims.generateFrameNumbers(texture, {
                frames: [12, 13]
            }),
            frameRate: framerate_accion,
            repeat: 0 // Repetir la animación infinitamente
        });
        
        scene.anims.create({ // derecha
            key: texture + "accion" + "derecha",
            frames: scene.anims.generateFrameNumbers(texture, {
                frames: [14, 15]
            }),
            frameRate: framerate_accion,
            repeat: 0 // Repetir la animación infinitamente
        });
    }

    setTeclas(scene, texture) {
        this.teclas = {};
        this.teclas.enter = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    
        //controles del jugador 1
        if (texture === "jugador1"){
            this.teclas.up = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
            this.teclas.down = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
            this.teclas.left = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
            this.teclas.right = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        
            this.teclas.T1 = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);
            this.teclas.T2 = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);
            this.teclas.T3 = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        }
    
        //controles del jugador 2
        if (texture === "jugador2"){
            this.teclas.up = scene.input.keyboard.createCursorKeys().up;
            this.teclas.down = scene.input.keyboard.createCursorKeys().down;
            this.teclas.left = scene.input.keyboard.createCursorKeys().left;
            this.teclas.right = scene.input.keyboard.createCursorKeys().right;
        
            this.teclas.T1 = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_ONE);
            this.teclas.T2 = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_TWO);
            this.teclas.T3 = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_THREE);
        }
    }

    update(texture, scene){
        this.accion = this.anims.isPlaying && this.anims.currentAnim.key === (texture + "accion" + this.mirar); //accion = true; si el jugador se esta animando y la animacion es de accion
        if (true) { //animaciones
            this.moverse = false;
            if (this.teclas.up.isDown) {
                this.moverse = true;
                this.mirar = "arriba";
            }
    
            else if (this.teclas.down.isDown) {
                this.moverse = true;
                this.mirar = "abajo";
            }
    
            else if (this.teclas.left.isDown) {
                this.moverse = true;
                this.mirar = "izquierda";
            }
    
            else if (this.teclas.right.isDown) {
                this.moverse = true;
                this.mirar = "derecha";
            }

            if (this.moverse == true && this.accion == false) {
                this.anims.play(texture + this.mirar, true);
            }

            else if (this.moverse === false && this.accion === false) {
                this.anims.stop();
                if (this.mirar == "derecha"){
                    this.setFrame(6)
                }
                else if (this.mirar == "izquierda"){
                    this.setFrame(4)
                }
                else if (this.mirar == "arriba"){
                    this.setFrame(2)
                }
                else if (this.mirar == "abajo"){
                    this.setFrame(0)
                }
            }
        }

        if (true) { //acciones
            if(this.teclas.T1.isDown && this.accion == false){
                //animar personaje
                this.anims.stop();
                this.anims.play(texture + "accion" + this.mirar, true);

                scene.magia = new magia(scene, this.x, this.y, 4, 0xff0000, 1);
                scene.physics.add.collider(scene.magia, scene.jugador1)
                scene.physics.add.collider(scene.magia, scene.jugador2)
                scene.physics.add.collider(scene.magia, scene.fondo, (magia, obstaculo) => {
                    magia.destroy()
                })

                scene.time.delayedCall(250, () => {

                    //lanzar hechizo
                    if (this.mirar == "derecha"){
                        scene.magia.body.setVelocity(500, 0)
                    }
                    else if (this.mirar == "izquierda"){
                        scene.magia.body.setVelocity(-500, 0)
                    }
                    else if (this.mirar == "arriba"){
                        scene.magia.body.setVelocity(0, -500)
                    }
                    else if (this.mirar == "abajo"){
                        scene.magia.body.setVelocity(0, 500)
                    }
                });
            }
        }

        if (true) { //movimientos
            // Movimiento hacia arriba y abajo
            if (this.teclas.up.isDown && this.accion == false) {
                this.body.setVelocityY(-velocidad);
            }
            else if (this.teclas.down.isDown && this.accion == false) {
                this.body.setVelocityY(velocidad);
            }
            else {
                this.body.setVelocityY(0);
            }
    
            // Movimiento hacia la izquierda y derecha
            if (this.teclas.left.isDown && this.accion == false) {
                this.body.setVelocityX(-velocidad);
            }
            else if (this.teclas.right.isDown && this.accion == false) {
                this.body.setVelocityX(velocidad);
            }
            else {
                this.body.setVelocityX(0);
            }
        }

    }
}