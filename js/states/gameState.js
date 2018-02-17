lame.GameState = class GameState{
	init(level_data){
		this.level_data = level_data
	}

	create(){

		// activate gravity
		this.game.physics.startSystem(Phaser.Physics.ARCADE)
		this.game.physics.arcade.gravity.y = 950

		this.map = this.game.add.tilemap(this.level_data.name)
		this.map.addTilesetImage('temp_tiles', 'temp')

		this.backgroundLayer = this.map.createLayer('background')
		this.collisionLayer = this.map.createLayer('collision')
		this.map.setCollisionBetween(
			1,
			100,
			true,
			'collision'
		)


		// collision method 2
		// const collision_tiles = []
		// console.log('layer =>', this.collisionLayer.layer.data)
		// this.collisionLayer.layer.data.forEach(
		// 	data_row => { // find tiles used in the layer
		// 		data_row.forEach(tile => {
		// 			// check if it's a valid tile index and isn't already in the list
		// 			if (tile.index > 0 && collision_tiles.indexOf(tile.index) === -1) {
		// 			    collision_tiles.push(tile.index)
		// 			}
		// 		})
		// 	})
		// this.map.setCollision(collision_tiles, true, 'collision')


		this.backgroundLayer.resizeWorld()
		this.createPlayer()


	}

	update(){
		this.player.body.velocity.x = 0
		const SPEED = 100


		const hitLayer = this.game.physics.arcade.collide(
			this.player,
			this.collisionLayer
		)

		// console.log('touch down',  this.player.body.touching)
		if(this.cursors.left.isDown){
			this.player.body.velocity.x -= SPEED
		} else if(this.cursors.right.isDown){
			this.player.body.velocity.x = SPEED
		}

		if(this.cursors.up.isDown && this.player.body.blocked.down){	
			this.player.body.velocity.y -=400
		}
	}


	createPlayer(){
		const result = this.findObjectsByType(
			'player',
			this.map,
			'objects'
		)[0]

		this.player = this.game.add.sprite(
			result.x,
			result.y,
			'temp'
		)


		this.player.frame = 0
		this.player.scale.setTo(1.2, 1.2)


		// add le physics
		this.game.physics.arcade.enable(this.player)
		this.player.body.collideWorldBounds = true
		// this.player.body.bounce.y = 0.2;
    	// this.player.body.gravity.y = 300;

		console.log('player=>', this.player.body)

		this.player.anchor.setTo(0.5)
		this.game.camera.follow(this.player)

		this.cursors = this.game.input.keyboard.createCursorKeys()
	}

	findObjectsByType(type, map, layer){
		const result = []
		map.objects[layer].forEach(el  => {
			if(el.type === type){
				//  invert y axis Phaser uses top left,  Tiled  uses  bottom left
				el.y -= map.tileHeight
				console.log('y =>', el.y)
				result.push(el)
			}
		})
		return result
	}

}