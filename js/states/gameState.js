lame.GameState = class GameState{

	// SPECIAL METHODS

	init(levelData){
		this.levelData = levelData
	}

	create(){

		// activate gravity
		this.game.physics.startSystem(Phaser.Physics.ARCADE)
		this.game.physics.arcade.gravity.y = 950

		this.camera.setSize(640, 480)
		this.prepareMap()
		this.createGroups()
		this.createEntities()
	}

	update(){

	}

	// CUSTOM METHODS

	prepareMap(){

		this.map = this.game.add.tilemap(this.levelData.name)
		this.map.addTilesetImage('tileset-1', 'tileset-1')

		this.backgroundLayer = this.map.createLayer('background')
		this.collisionLayer = this.map.createLayer('collision')

		this.map.setCollisionBetween(
			1,
			100,
			true,
			'collision'
		)

		this.backgroundLayer.resizeWorld()
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
			try{
			let ent = this.createEntFromObj(obj)
			this.entities[obj.gid] = ent
			}catch(e){
				console.log('Failed to create =>', obj)
				throw(e)
			}
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
				EntityType = Weapon
				break
	    	case "coin":
	    		EntityType = Coin
				break
				
	    	case "slime":
	    		EntityType = Slime
				break
	    	case "bat":
	    		EntityType = Bat
				break
				
			case "life":
				EntityType = Life
				break
			case "block":
				EntityType = Block
				break
			case "stopper":
				EntityType = Stopper
				break

	    }
	    if (!EntityType) return null

    	return new EntityType(
    		this,
    		pos,
    		properties
		)
	}

	restartLevel(){
    	this.game.state.restart(true, false, this.levelData)
	}
}
