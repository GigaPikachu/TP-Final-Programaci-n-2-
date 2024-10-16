export class objetos extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
      
        // Añadir el slime a la escena y habilitar su física
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        scene.physics.add.overlap(this, scene.jugadores, (objeto, jugador) => {
            if (texture == "pocion"){
                
                this.frame = Phaser.Math.Between(0, 1);

                if(frame == 0){ //pocion de velocidad
                    if (jugador.vida[1] < jugador.vida[0] - 20){
                        jugador.vida[1] = 100;
                    }
                    else if (jugador.vida[1] < jugador.vida[0]){
                        jugador.vida[1] = 100;
                    }
                }

                if(frame == 2){ //pocion de velocidad
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
                jugador.invulnerable = true;

                scene.time.addEvent({
                    delay: 10000,
                    loop: false,
                    callback: () => {
                        jugador.invulnerable = false
                    },
                });
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
            this.destroy();
        })
    }
}