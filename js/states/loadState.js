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

		this.load.spritesheet(
			'temp',
			'./assets/images/temp.png', 
			16, 16
		)

		this.load.tilemap(
			'level1',
			'./assets/maps/level1_map.json',
			null,
			Phaser.Tilemap.TILED_JSON
		)
	}

	create(){
		console.log('level up')
		this.state.start(
			'gameState', 
			true,
			false,
			this.level_data
		)
	}
}