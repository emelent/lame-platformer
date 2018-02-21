lame.GameState = class GameState{
	init(levelData){
		this.levelData = levelData
	}

	create(){

		// activate gravity
		this.game.physics.startSystem(Phaser.Physics.ARCADE)
		this.game.physics.arcade.gravity.y = 950

		this.map = this.game.add.tilemap(this.levelData.name)
		this.map.addTilesetImage('temp_tiles', 'temp')

		this.backgroundLayer = this.map.createLayer('background')
		this.collisionLayer = this.map.createLayer('collision')

		this.map.setCollisionBetween(
			1,
			100,
			true,
			'collision'
		)

		this.backgroundLayer.resizeWorld()
		this.camera.setSize(640, 480)
		this.createGroups()
		this.createEntities()
	}

	update(){

	}

	createGroups(){
		this.groups = {}
		this.levelData.groups.forEach(groupName => {
			this.groups[groupName] = this.game.add.group()
		})
	}

	createEntities(){
		this.entities = {}
		this.players = []
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
	    	
	    	case "objective":
	    		EntityType = Objective
	    		break

	    	case "weapon":	
	    	case "coin":
	    		EntityType = Item
	    		break

	    	case "walker":
	    	case "crawler":
	    		EntityType = Enemy
	    		break

	    }
	    if (!EntityType) return null

    	return new EntityType(
    		this,
    		pos,
    		properties
		)
	}
	render () {
		// this.game.debug.bodyInfo(this.players[0], 32, 32)
		// this.game.debug.cameraInfo(this.game.camera,  32, 32)
	
	}
	restartLevel(){
    	this.game.state.restart(true, false, this.levelData)
	}
}
