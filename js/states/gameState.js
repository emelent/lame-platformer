lame.GameState = class GameState{
	init(level_data){
		this.level_data = level_data
		this.entities = {}
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
		// this.createPlayer()
		this.createGroups()
		this.createEntities()
	}

	update(){

	}

	createGroups(){
		this.groups = {}
		this.level_data.groups.forEach(groupName => {
			this.groups[groupName] = this.game.add.group()
		})
	}

	createEntities(){
		this.entities = {}
		this.map.objects.objects.forEach(obj => {
			let ent = this.createEntFromObj(obj)
			this.entities[obj.gid] = ent
		})
	}

	createEntFromObj(obj){
		const {x, y, type, name, properties} = obj
	    const pos =  {
	    	x,
	    	y: y - this.map.tileHeight
	    }
	    let EntityType = Entity


	    // create object according to its type
	    switch (type) {
	    	case "player":
	    		EntityType = Player
	    		break
	    	
	    	// case "crawler":
	    	// 	EntityType = Player
	    	// 	break
	    	
	    	// case "jumper":
	    	// 	EntityType = Player
	    	// 	break

	    }
	    if (!EntityType) return null

    	return new EntityType(
    		this,
    		pos,
    		properties
		)
	}
}