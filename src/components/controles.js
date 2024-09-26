function setTeclas(scene, texture) {
    this.teclas = {};
    this.teclas.enter = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    //controles del jugador 1
    if (texture === "jugador1"){
        this.teclas.up = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.teclas.down = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.teclas.left = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.teclas.right = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    
        scene.TG = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);
        scene.TH = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);
        scene.TJ = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
    }

    //controles del jugador 2
    if (texture === "jugador2"){
        this.teclas.up = scene.input.keyboard.createCursorKeys().up;
        this.teclas.down = scene.input.keyboard.createCursorKeys().down;
        this.teclas.left = scene.input.keyboard.createCursorKeys().left;
        this.teclas.right = scene.input.keyboard.createCursorKeys().right;
    
        scene.T1 = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_ONE);
        scene.T2 = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_TWO);
        scene.T3 = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_THREE);
    }
}

export {setTeclas};