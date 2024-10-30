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

        //efectos de sonido
        this.desplazarse = this.sound.add('desplazarse', {
            loop: false, // La música se repite en bucle
            volume: 0.5, // Nivel de volumen (0 a 1)
        });

        this.seleccionar = this.sound.add('seleccionar', {
            loop: false, // La música se repite en bucle
            volume: 0.5, // Nivel de volumen (0 a 1)
        });
    }
    
    create () {

        //musica
        this.musica = this.sound.add('menu', {
            loop: true, // La música se repite en bucle
            volume: 1, // Nivel de volumen (0 a 1)
        });

        this.musica.play();

        //fondo
        this.background = this.add.image(0, 0, "MainMenu").setOrigin(0);

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
            this.musica.stop();
            this.scene.restart({text: this.text, idioma: this.idioma});
        })

        this.ingles.on('pointerdown', () => {
            this.idioma = 2;
            this.musica.stop();
            this.scene.restart({text: this.text, idioma: this.idioma});
        })

        //teclas
        this.cursors = this.input.keyboard.createCursorKeys();
        this.cursors.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

        //fundido
        this.fundido = this.add.image(0, 0, "fundido").setOrigin(0);
        this.fundido.alpha = 0;
    }

    update(){
        
        if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
            this.desplazarse.play();
            if (this.select[0] > 2){
                this.select[0] --;
            }
            else {
                this.select[0] = 4
            }
        }

        else if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
            this.desplazarse.play();
            if (this.select[0] < 4){
                this.select[0] ++;
            }
            else {
                this.select[0] = 2;
            }
        }

        else if (Phaser.Input.Keyboard.JustDown(this.cursors.enter)) {
            this.musica.stop();
            this.seleccionar.play();

            this.time_fundido = this.time.addEvent({
                delay: 62,
                loop: true,
                callback: () => {
                    this.fundido.alpha += 0.0625;
                },
            });

            this.next_scene = this.time.addEvent({
                delay: 1000,
                loop: false,
                callback: () => {
                    this.time_fundido.remove();
                    this.next_scene.remove();
                    this.scene.start(this.select[1], {text: this.text, idioma: this.idioma})
                },
            });
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