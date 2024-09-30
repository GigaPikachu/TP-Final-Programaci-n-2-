import {magia} from "../components/magia.js";

const framerate_mov = 4;
const framerate_accion = 4;
const velocidad = 50

var vida = 100 //vida inicial
const tiempo_invul = 1000; //tiempo de invulnerabilidad

export class jugador extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        this.vida = []
        this.vida[0] = vida // vida inicial
        this.vida[1] = vida // vida restante

        this.invulnerable = false;

        this.barra_vida = [];
        this.barra_vida[0] = scene.physics.add.image(this.x, this.y - 12, "mini_bar");
        this.barra_vida[1] = scene.add.rectangle(this.x, this.y - 12, 16, 3, 0xff0000); scene.physics.add.existing(this.barra_vida[1]);

        this.mirar = "abajo"

        // Añadir el jugador a la escena y habilitar su física
        scene.add.existing(this);
        scene.physics.add.existing(this);

        scene.jugadores.add(this);

        //coliciones
        scene.physics.add.collider(this, scene.fondo)
        scene.physics.add.overlap(this, scene.enemigos, (jugador, enemigo) => {
            if (jugador.invulnerable == false){
                jugador.vida[1] -= enemigo.ataque;
                jugador.invulnerable = true;

                scene.time.addEvent({
                    delay: tiempo_invul,
                    loop: false,
                    callback: () => {
                        jugador.invulnerable = false
                    },
                });
            }
        })
        scene.physics.add.collider(this, scene.jugadores)
      
        // Definir animaciones
        this.defAnims(scene, texture);

        this.setTeclas(scene, texture)

        //crear camara
        if (typeof scene.jugador1 !== 'undefined'){
            this.camara = scene.cameras.add(176, 0, 160, 144);
            this.camara.startFollow(this);
        }
        else {
            this.camara = scene.cameras.add(0, 0, 160, 144);
            this.camara.startFollow(this);
        }
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
            if (this.teclas.up.isDown && this.accion == false) {
                this.moverse = true;
                this.mirar = "arriba";
            }
    
            else if (this.teclas.down.isDown && this.accion == false) {
                this.moverse = true;
                this.mirar = "abajo";
            }
    
            else if (this.teclas.left.isDown && this.accion == false) {
                this.moverse = true;
                this.mirar = "izquierda";
            }
    
            else if (this.teclas.right.isDown && this.accion == false) {
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
            if(this.teclas.T2.isDown && this.accion == false){
                //animar personaje
                this.anims.stop();
                this.anims.play(texture + "accion" + this.mirar, true);

                this.magia = new magia(scene, this.x, this.y, 4, 0xffffff, 1);
                scene.hechizos.add(this.magia)
                scene.physics.add.collider(this.magia, scene.jugadores, (magia, jugador) => {
                    if(jugador != this){
                        magia.destroy()
                        jugador.vida[1] -= 20;
                        jugador.camara.shake(100, 0.03)
                    }
                })
                scene.physics.add.collider(this.magia, scene.enemigos, (magia, enemigo) => {
                    magia.destroy()
                    enemigo.vida[1] -= 20;
                })

                scene.time.delayedCall(250, () => {
                    //lanzar hechizo
                    if(this.magia.active){ //comprueva que la magia existe
                        if (this.mirar == "derecha"){
                            this.magia.body.setVelocity(500, 0)
                        }
                        else if (this.mirar == "izquierda"){
                            this.magia.body.setVelocity(-500, 0)
                        }
                        else if (this.mirar == "arriba"){
                            this.magia.body.setVelocity(0, -500)
                        }
                        else if (this.mirar == "abajo"){
                            this.magia.body.setVelocity(0, 500)
                        }
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

        if (true) { //barra de vida
            for(this.i = 0; this.i <= 1; this.i ++){
                this.barra_vida[this.i].x = this.x; this.barra_vida[this.i].y = this.y - 12;
            }
            this.barra_vida[1].setSize(16 / this.vida[0] * this.vida[1], 3);

        }
    }
}