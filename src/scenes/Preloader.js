import { Scene } from 'phaser';

export class Preloader extends Scene{
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {
        //  Cargamos esta imagen en nuestra Escena de arranque, para que podamos mostrarla aquí
        this.add.image(512, 384, 'background');

        //  Una barra de progreso simple. Este es el contorno de la barra.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  Esta es la barra de progreso. Aumentará de tamaño desde la izquierda según el porcentaje de progreso.
        const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffffff);

        //  Utilice el evento 'progreso' emitido por LoaderPlugin para actualizar la barra de carga
        this.load.on('progress', (progress) => {

            //  Actualizar la barra de progreso (nuestra barra tiene 464 px de ancho, por lo que 100 % = 464 px)
            bar.width = 4 + (460 * progress);

        });
    }

    preload () {

        if (true){ //sprites
            // jugadores
            this.load.spritesheet("jugador1", "./assets/sprites/jugador1.png", {
                frameWidth: 16,
                frameHeight: 24,
            });

            this.load.spritesheet("jugador2", "./assets/sprites/jugador2.png", {
                frameWidth: 16,
                frameHeight: 24,
            });

            if (true){ //objetos
                this.load.spritesheet("caja", "./assets/sprites/caja.png", {
                    frameWidth: 16,
                    frameHeight: 16,
                });

                this.load.spritesheet("bandera", "./assets/sprites/bandera.png", {
                    frameWidth: 16,
                    frameHeight: 32,
                });

                this.load.spritesheet("pocion", "./assets/sprites/pocion.png", {
                    frameWidth: 16,
                    frameHeight: 16,
                });

                this.load.image("escudo", "./assets/sprites/escudo.png")
    
                this.load.spritesheet("magia", "./assets/sprites/magia.png", {
                    frameWidth: 16,
                    frameHeight: 16,
                });
    
                this.load.spritesheet("puerta", "./assets/sprites/puerta.png", {
                    frameWidth: 48,
                    frameHeight: 32,
                });
            }

            if (true){ //enemigos
                this.load.spritesheet("hongo", "./assets/sprites/hongo.png", {
                    frameWidth: 16,
                    frameHeight: 32,
                });
                this.load.spritesheet("slime2", "./assets/sprites/slime2.png", {
                    frameWidth: 16,
                    frameHeight: 32,
                });
                this.load.spritesheet("esqueleto", "./assets/sprites/esqueleto.png", {
                    frameWidth: 16,
                    frameHeight: 16,
                });

                this.load.spritesheet("nigromante", "./assets/sprites/nigromante.png", {
                    frameWidth: 16,
                    frameHeight: 24,
                });
            }

            //idiomas
            this.load.image("español", "./assets/images/español.png")
            this.load.image("ingles", "./assets/images/ingles.png")
        }

        if(true) { // musica
            this.load.audio("menu", "./assets/sounds/menu/menu.mp3");
            
            this.load.audio("seleccionar", "./assets/sounds/menu/seleccionar.wav");
            this.load.audio("desplazarse", "./assets/sounds/menu/desplazarse.wav");

            this.load.audio("lose", "./assets/sounds/players/end game (lose).mp3");
            this.load.audio("hurt", "./assets/sounds/players/hurt.mp3");

            this.load.audio("romper", "./assets/sounds/efectos de sonido/romper.wav");
        }

        if (true) { //interfaz
            //barra de vida
            this.load.image("player_bar", "./assets/images/barra de vida.png")
            this.load.image("mini_bar", "./assets/images/mini barra de vida.png")
        }

        if (true) { //Tiles
            this.load.image("MainMenu", "./assets/background/MainMenu.png");
            this.load.image("fundido", "./assets/background/fundido.png");
            this.load.image("fondo", "./assets/background/background.png");
            this.load.image("vision", "./assets/background/vision.png");

            //mapa de pruebas
    
            this.load.tilemapTiledJSON("map", "./assets/tilemaps/mapa.json");

            //Coop Nivel 1
            this.load.image("tileset", "./assets/images/tileset.png");
    
            this.load.tilemapTiledJSON("Nivel_1", "./assets/background/Coop/Nivel_1.json");

        }

        //  Carga los activos para el juego: reemplázalos con tus propios activos
        this.load.setPath('assets');
    }

    async create ()
    {
        const idioma = 1; // 1 = español; 2 = english;
        const url = 'https://docs.google.com/spreadsheets/d/10l-lViFgBV60pD5s_mz1UY9XX5avT0hMGigrYdHO2SM/pub?output=csv';
      
        try {
            const response = await fetch(url);  // Obtener el archivo CSV
            const data = await response.text(); // Convertir la respuesta a texto
            const text = data.split('\n').map(row => row.split(',')); // Dividir en filas y columnas
      
            console.log(text); // Aquí tienes los datos del CSV en un array
            this.scene.start('MainMenu', {text: text, idioma: idioma,});
        }
        
        catch (error) {
            console.error('Error al obtener el CSV:', error);
        }
    }
}