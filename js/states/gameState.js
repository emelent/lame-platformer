lame.GameState = class GameState{
	init(level_data){
		this.level_data = level_data
	}

	create(){
		this.map = this.game.add.tilemap(this.level_data.name)
		this.map.addTilesetImage('temp_tiles', 'temp')

		this.backgroundLayer = this.map.createLayer('background')
		this.collision = this.map.createLayer('collision')
		this.map.setCollisionBetween(
			1,
			100,
			true,
			'collision'
		)
		this.backgroundLayer.resizeWorld()

	}

	update(){

	}



}