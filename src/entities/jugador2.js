import {Hechizo} from "../components/hechizo2.js";

const framerate_mov = 4;
const framerate_accion = 4;

var vidas = 100 //vida inicial
var velocidad = 75;
var energia = 100 //vida inicial
const tiempo_invul = 1000; //tiempo de invulnerabilidad

export class jugador extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, vida) {
        super(scene, x * 16, y * 16, texture, frame);

        //efectos de sonido
        this.hurt = scene.sound.add('hurt', {
            loop: false, // La música se repite en bucle
            volume: 0.5, // Nivel de volumen (0 a 1)
        });
        scene.step = scene.sound.add('step', {
            loop: false, // La música se repite en bucle
            volume: 0.7, // Nivel de volumen (0 a 1)
        });
    
        // Crea un emisor de partículas en la posición (0, 0) usando una textura con la clave "red"
        this.emitter = scene.add.particles(0, 0, "magias", { 
            speed: 10, // Establece la velocidad inicial de las partículas a 100 unidades (la dirección se determina aleatoriamente)
            lifespan: 200, //tiempo de vida de cada particuña //1000 milisagundos = 1 segundo
            scale: { start: 1, end: 0 }, // Establece la escala de las partículas desde 1 (tamaño completo) hasta 0 (desapareciendo gradualmente)
        });

        //estadisticas
        if (true){ //estamina y vida
            this.vida = [];
            this.vida[0] = vida || vidas; // vida inicial
            this.vida[1] = this.vida[0]; // vida restante
            this.vida[2] = 0; // vida protectora
    
            this.barra_vida = [];
            this.barra_vida[0] = scene.physics.add.image(this.x, this.y - 12, "mini_bar");
            this.barra_vida[1] = scene.add.rectangle(this.x, this.y - 12, 16, 3, 0xff0000); scene.physics.add.existing(this.barra_vida[1]);
            this.barra_vida[2] = scene.add.rectangle(this.x, this.y - 12, 0, 3, 0xf1c40f); scene.physics.add.existing(this.barra_vida[2]);
    
            this.energia = [];
            this.energia[0] = energia;
            this.energia[1] = energia;
    
            this.barra_energia = [];
            this.barra_energia[0] = scene.physics.add.image(this.barra_vida[0].x, this.barra_vida[0].y - 5, "mini_bar");
            this.barra_energia[1] = scene.add.rectangle(this.barra_vida[0].x, this.barra_vida[0].y - 5, 16, 3, 0x17a589 ); scene.physics.add.existing(this.barra_energia[1]);
        }

        this.liverar = true;
        this.impulso = [];
        this.impulso[0] = false;
        this.impulso[1] = false;

        this.velocidad = velocidad;
        this.cagar_magia = 0.01;

        this.invulnerable = false;

        this.mirar = "abajo";
        this.magia = [];
        this.init_x = this.x;
        this.init_y = this.y;

        // Añadir el jugador a la escena y habilitar su física
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setSize(16, 16);
        this.body.setOffset(0, 8);

        scene.jugadores.add(this);

        //coliciones
        scene.physics.add.collider(this, scene.fondo)
        scene.physics.add.overlap(this, scene.enemigos, (jugador, enemigo) => {
            if (jugador.invulnerable == false){
                if(this.frame.name != 17){
                    if (scene.scene.key != "Coop3"){
                        this.camara.shake(100, 0.03);
                    }
                    else{
                        scene.cameras.main.shake(100, 0.03);
                    }
                    jugador.hurt.play()
                }

                if (jugador.vida[2] > 0){
                    jugador.vida[2] -= enemigo.ataque;
                }
                else {
                    jugador.vida[2] = 0;
                    jugador.vida[1] -= enemigo.ataque;
                }
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
        scene.physics.add.overlap(this, scene.fantasmas, (jugador, enemigo) => {
            if (jugador.invulnerable == false && enemigo.estado == "fantasma"){
                if(this.frame.name != 17){
                    if (scene.scene.key != "Coop3"){
                        this.camara.shake(100, 0.03);
                    }
                    else{
                        scene.cameras.main.shake(100, 0.03);
                    }
                    jugador.hurt.play()
                }

                if (jugador.vida[2] > 0){
                    if (jugador.vida[2] < enemigo.ataque){
                        jugador.vida[2] = 0;
                        jugador.vida[1] -= enemigo.ataque - jugador.vida[2];
                    }
                    else {
                        jugador.vida[2] -= enemigo.ataque;
                    }
                }
                else {
                    jugador.vida[2] = 0;
                    jugador.vida[1] -= enemigo.ataque;
                }

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
      
        // Definir animaciones
        this.defAnims(scene, texture);

        this.setTeclas(scene, texture)

        //crear camara
        if (scene.scene.key != "Coop3"){
            this.camara = scene.cameras.add((160 + 16) * (scene.jugadores.countActive(true) - 1), 0, 160, 144);
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
        this.accion = (this.anims.isPlaying && this.anims.currentAnim.key === (texture + "accion" + this.mirar)) || (this.frame.name === 16); //accion = true; si el jugador se esta animando y la animacion es de accion
        
        if (this.impulso[0] == false) { //animaciones
            this.moverse = false;

            if (this.body.velocity.y < 0 && this.accion == false) {
                this.moverse = true;
                this.mirar = "arriba";
            }
    
            else if (this.body.velocity.y > 0 && this.accion == false) {
                this.moverse = true;
                this.mirar = "abajo";
            }
    
            else if (this.body.velocity.x < 0 && this.accion == false) {
                this.moverse = true;
                this.mirar = "izquierda";
            }

            else if (this.body.velocity.x > 0 && this.accion == false) {
                this.moverse = true;
                this.mirar = "derecha";
            }

            if (this.moverse == true && this.accion == false) {
                this.anims.play(texture + this.mirar, true);
                if(!scene.step.isPlaying){
                    scene.step.play();
                }
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
            if (this.vida[1] > 0){
                Hechizo (this, scene, texture)
            }
        }

        if (this.impulso[0] == false) { //movimientos
            // Movimiento hacia arriba y abajo
            if (this.teclas.up.isDown && this.accion == false) {
                this.body.setVelocityY(-this.velocidad);
            }
            else if (this.teclas.down.isDown && this.accion == false) {
                this.body.setVelocityY(this.velocidad);
            }

            else if(this.impulso[0] == false){
                this.body.setVelocityY(0);
            }
    
            // Movimiento hacia la izquierda y derecha
            if (this.teclas.left.isDown && this.accion == false) {
                this.body.setVelocityX(-this.velocidad);
            }
            else if (this.teclas.right.isDown && this.accion == false) {
                this.body.setVelocityX(this.velocidad);
            }

            else if(this.impulso[0] == false){
                this.body.setVelocityX(0);
            }
        }

        if (true) { //barra de vida y energia
            for(this.i = 0; this.i <= 2; this.i ++){ //posicion de las barras de vida
                this.barra_vida[this.i].x = this.x; this.barra_vida[this.i].y = this.y - 12;
            }
            for(this.i = 0; this.i <= 1; this.i ++){ //posicion de las barras de energia
                this.barra_energia[this.i].x = this.barra_vida[this.i].x; this.barra_energia[this.i].y = this.barra_vida[this.i].y - 5;
            }

            if (this.vida[1] >= 0){ //restante de barra 1 a comparacion de la barra 0
                this.barra_energia[1].setSize(16 / this.energia[0] * this.energia[1], 3);

                this.barra_vida[1].setSize(16 / this.vida[0] * this.vida[1], 3);
                this.barra_vida[2].setSize(16 / this.vida[0] * this.vida[2], 3);

                if (this.energia[1] < this.energia[0]){
                    this.energia[1] += 0.2
                }
            }

            else {
                this.vida[1] = 0
            }

            if (this.vida[1] == 0){
                if (scene.scene.key == "VS"){
                    this.x = this.init_x;
                    this.y = this.init_y;
                    this.setFrame(17);
                    this.velocidad = 0;
                    scene.jugadores.remove(this);

                    scene.time.addEvent({
                        delay: 5,
                        loop: false,
                        callback: () => {
                            this.vida[1] = this.vida[0] / 2;
                            scene.jugadores.add(this);
                            this.velocidad = velocidad;
                        },
                    });
                }

                else{
                    this.setFrame(17);
                    this.velocidad = 0;
                    scene.jugadores.remove(this);

                    if(scene.jugador1.vida[1] > 0 || scene.jugador2.vida[1] > 0) {

                        scene.physics.add.overlap(this, scene.jugadores, (yo, compañero) => {
                            if (this.vida[1] <= 0){
                                this.vida[1] = this.vida[0] / 2;
                            }
                            scene.jugadores.add(this);
                            this.velocidad = velocidad;
                        })

                    }

                    else {
                        scene.scene.stop("Hud_Coop")

                        scene.scene.start("GameOver", {text: scene.text, idioma: scene.idioma,});
                    }
                }
            };
        };

        //orden de capas de textura
        this.barra_energia[0].setDepth(this.y);
        this.barra_energia[1].setDepth(this.y);
        this.barra_vida[0].setDepth(this.y);
        this.barra_vida[1].setDepth(this.y);
        this.barra_vida[2].setDepth(this.y);
        this.setDepth(this.y);
    };
};