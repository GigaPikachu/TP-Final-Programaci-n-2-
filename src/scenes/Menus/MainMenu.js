import { Scene } from 'phaser';

export class MainMenu extends Scene{
    constructor () {
        super('MainMenu');
    }

    init(data){
        this.text = data.text;

        this.idioma = data.idioma;

        this.menu = [] //array donde se guarda la variable que crea los textos del menu

        this.select = [2, 'Coop'];
    }
    
    create () {
        //tilulo
        this.titulo = this.add.text(336/2, 24, this.text[1][this.idioma], {fontFamily: 'GameBoy', fontSize: 16, color: '#ffffff',stroke: '#000000', strokeThickness: 4, align: 'center'}).setOrigin(0.5);

        //menu
        for(let i = 2; i <= 4; i ++){
            this.menu[i] = this.add.text(336/2, 64 + 12 * i, this.text[i][this.idioma], {fontFamily: 'GameBoy', fontSize: 8, color: '#ffffff',stroke: '#000000', strokeThickness: 4, align: 'center'}).setOrigin(0.5).setInteractive();
        }

        //banderas
        this.español = this.add.image(16, 16, "español").setInteractive();
        this.ingles = this.add.image(32, 16, "ingles").setInteractive();

        this.español.on('pointerdown', () => {
            this.idioma = 1;
            this.scene.restart({text: this.text, idioma: this.idioma});
        })

        this.ingles.on('pointerdown', () => {
            this.idioma = 2;
            this.scene.restart({text: this.text, idioma: this.idioma});
        })

        //teclas
        this.cursors = this.input.keyboard.createCursorKeys();
        this.cursors.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
    }

    update(){
        
        if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
            if (this.select[0] > 2){
                this.select[0] --;
            }
            else {
                this.select[0] = 4
            }
            console.log(this.select)
        }

        else if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
            if (this.select[0] < 4){
                this.select[0] ++;
            }
            else {
                this.select[0] = 2;
            }
            console.log(this.select)
        }

        else if (Phaser.Input.Keyboard.JustDown(this.cursors.enter)) {
            
            this.scene.start(this.select[1], {text: this.text, idioma: this.idioma})
        }

        for(var i = 2; i <= 4; i++) {
            if (i == this.select[0]){
                this.menu[i].setColor('#ff0000');
                this.select[1] = this.text[i][0]

            }
            else {
                this.menu[i].setColor('#ffffff');
            }
        }
    }
}