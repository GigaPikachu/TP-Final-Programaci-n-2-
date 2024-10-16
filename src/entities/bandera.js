const distancia_min = 64;

const vida = 10;

export class bandera extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, frame) {
        super(scene, x, y, "bandera", frame);
      
        // Añadir la bandera a la escena y habilitar su física
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setSize(16, 16);
        this.body.setOffset(0, 16);

        this.vida = []
        this.vida[0] = vida // vida inicial
        this.vida[1] = 0 //vida restante

        this.barra_vida = []
        this.barra_vida[0] = scene.physics.add.image(this.x, this.y - 12, "mini_bar");
        this.barra_vida[1] = scene.add.rectangle(this.x, this.y - 12, 16, 3, 0xff0000); scene.physics.add.existing(this.barra_vida[1]);

        scene.time.addEvent({
            delay: 1000, //cada 1 segundo
            loop: true,
            callback: () => {

                //jugador 1 cerca
                if ((Phaser.Math.Distance.Between(this.x, this.y, scene.jugador1.x, scene.jugador1.y) <= distancia_min) &&
                !(Phaser.Math.Distance.Between(this.x, this.y, scene.jugador2.x, scene.jugador2.y) <= distancia_min) &&
                this.vida[1] < vida){
                    this.vida[1] ++;
                }

                //jugador 2 cerca
                else if((Phaser.Math.Distance.Between(this.x, this.y, scene.jugador2.x, scene.jugador2.y) <= distancia_min) &&
                !(Phaser.Math.Distance.Between(this.x, this.y, scene.jugador1.x, scene.jugador1.y) <= distancia_min) &&
                this.vida[1] > -vida){
                    this.vida[1] --;
                }

            },
        });

        scene.banderas.add(this);
    }

    defAnims(scene, texture){
    }

    update(){
        for(this.i = 0; this.i <= 1; this.i ++){
            this.barra_vida[this.i].x = this.x; this.barra_vida[this.i].y = this.y - 16 - 4;
        }

        this.barra_vida[1].setSize(16 / this.vida[0] * this.vida[1], 3);

        if (this.vida[1] == vida){
            this.setFrame(1)
        }
        else if (this.vida[1] == -vida){
            this.setFrame(2)
        }
        else if (this.vida[1] == 0){
            this.setFrame(0)
        }
    }
}