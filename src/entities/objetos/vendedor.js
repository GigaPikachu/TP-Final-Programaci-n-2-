import {objetos} from "./objetos.js";

export class vendedor extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, frame) {
        super(scene, x * 16, y * 16, "vendedor", frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setOrigin(0);

        this.objeto = [];
        this.posX = [];
        this.posY = [];

        if (frame === 0){ //abajo
            this.posX[0] = x - 2;
            this.posX[1] = x;
            this.posX[2] = x + 2;

            this.posY[0] = y + 1;
            this.posY[1] = y + 1;
            this.posY[2] = y + 1; 
        }

        else if (frame === 1){ //arriba
            this.posX[0] = x - 2;
            this.posX[1] = x;
            this.posX[2] = x + 2;

            this.posY[0] = y - 1;
            this.posY[1] = y - 1;
            this.posY[2] = y - 1;
        }

        else if (frame === 2){ // izquierda
            this.posX[0] = x - 1;
            this.posX[1] = x - 1;
            this.posX[2] = x - 1;

            this.posY[0] = y - 2;
            this.posY[1] = y;
            this.posY[2] = y + 2;
        }

        else if (frame === 3){ // derecha
            this.posX[0] = x + 1;
            this.posX[1] = x + 1;
            this.posX[2] = x + 1;

            this.posY[0] = y - 2;
            this.posY[1] = y
            this.posY[2] = y + 2;
        }

        this.objeto[0] = new objetos(scene, this.posX[0] * 16, this.posY[0] * 16, "+vida", 0, 25)
        this.objeto[1] = new objetos(scene, this.posX[1] * 16, this.posY[1] * 16, "+magia", 0, 25)
        this.objeto[2] = new objetos(scene, this.posX[2] * 16, this.posY[2] * 16, "escudo", 0, 1)
    }
}