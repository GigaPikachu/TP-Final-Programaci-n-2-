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
            this.load.spritesheet("jugador1", "../../public/assets/sprites/jugador1.png", {
                frameWidth: 16,
                frameHeight: 16,
            });
            this.load.spritesheet("jugador2", "../../public/assets/sprites/jugador2.png", {
                frameWidth: 16,
                frameHeight: 16,
            });

            //enemigos
            this.load.spritesheet("slime", "../../public/assets/sprites/slime.png", {
                frameWidth: 16,
                frameHeight: 16,
            });

            //banderas
            this.load.image("español", "../../public/assets/images/español.png")
            this.load.image("ingles", "../../public/assets/images/ingles.png")
        }

        if (true) { //Tiles

            this.load.image("fondo", "../../public/assets/background/background.png")
    
            this.load.tilemapTiledJSON("map", "../../public/assets/tilemaps/mapa.json");
            this.load.image("tileset", "../../public/assets/images/tileset.png")
        }

        //  Carga los activos para el juego: reemplázalos con tus propios activos
        this.load.setPath('assets');

        this.load.image('logo', 'logo.png');
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