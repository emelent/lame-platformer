lame.LoadState = class LoadState{
	init(level_data){
		this.level_data = level_data
	}

	preload(){
		this.preloadBar = this.add.sprite(
			this.game.world.centerX,
			this.game.world.centerY + 128,
			'preloadbar'
		)
		this.preloadBar.anchor.setTo(0.5)
		this.load.setPreloadSprite(this.preloadBar)

		// LOAD SOME SPRITESHEETS
		this.load.spritesheet(
			'temp',
			'./assets/images/temp.png', 
			16, 16
		)
		this.load.spritesheet(
			'player',
			'./assets/images/player.png', 
			16, 16
		)
		this.load.spritesheet(
			'slime',
			'./assets/images/slime.png', 
			16, 16
		)
		this.load.spritesheet(
			'items',
			'./assets/images/items.png', 
			16, 16
		)
		this.load.spritesheet(
			'terminals',
			'./assets/images/terminals.png', 
			16, 16
		)

		this.load.spritesheet(
			'tileset-1',
			'./assets/images/tileset-1.png', 
			16, 16
		)

		// LOAD SOME SOUNDS
		this.load.audio('collect', 'assets/sounds/pickup.wav')

		// LOAD THE LEVEL TILEMAP
		this.load.tilemap(
			'level1',
			'./assets/maps/level1_map.json',
			null,
			Phaser.Tilemap.TILED_JSON
		)
	}

	create(){
		this.state.start(
			'gameState', 
			true,
			false,
			this.level_data
		)
	}
}