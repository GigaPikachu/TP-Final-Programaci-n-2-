export class objetos extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, precio) {
        super(scene, x, y, texture, frame,);

        //efectos de sonido
        this.moneda = scene.sound.add('moneda', {
            loop: false, // La música se repite en bucle
            volume: 1, // Nivel de volumen (0 a 1)
        });
        this.pocion = scene.sound.add('pocion', {
            loop: false, // La música se repite en bucle
            volume: 1, // Nivel de volumen (0 a 1)
        });

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.precio = precio;
        if (precio > 0){
            this.text_precio = scene.add.text(x, y, this.precio, {fontFamily: 'GameBoy', fontSize: 8, color: '#f4d03f',stroke: '#000000', strokeThickness: 4, align: 'center'}).setOrigin(0.5);
        }

        this.setOrigin(0);

        if (texture == ""){
            this.destroy();
        }
        
        scene.physics.add.overlap(this, scene.jugadores, (objeto, jugador) => {
            if (scene.monedas >= objeto.precio || scene.scene.key == "VS"){
                if (texture == "pocion"){
                    this.pocion.play();
                    jugador.vida[1] = jugador.vida[0];
    
                    if(this.frame == 1){ //pocion de velocidad
                        jugador.velocidad = 100;
    
                        scene.time.addEvent({
                            delay: 60000,
                            loop: false,
                            callback: () => {
                                jugador.velocidad = 50;
                            },
                        });
                    }
                }
    
                else if (texture == "escudo"){
                    if ((jugador.vida[2] + 30) < 100){
                        jugador.vida[2] += 30;
                    }
                    else{
                        jugador.vida[2] = 100;
                    }
                }
    
                else if (texture == "magia"){
                    jugador.cagar_magia = 0.10;
    
                    scene.time.addEvent({
                        delay: 10000,
                        loop: false,
                        callback: () => {
                            jugador.cagar_magia = 0.03;
                        },
                    });
                }
    
                else if (texture == "moneda"){
                    this.moneda.play();
                    scene.monedas ++
                }
    
                else if (texture == "+vida"){
                    jugador.vida[0] += 50;
                }
    
                else if (texture == "+magia"){
                    jugador.energia[0] += 50;
                }
    
                scene.monedas -= this.precio;
                this.destroy();
                if (objeto.precio > 0){
                    this.text_precio.destroy();
                }
            }
        })
    }
}