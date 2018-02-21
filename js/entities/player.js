class Player extends Entity{
	constructor(...args){
		super(...args)

		this.frame = 0
		this.scale.setTo(2)
		this.anchor.setTo(0.5)

		// add le physics
		this.game.physics.arcade.enable(this)
		this.body.collideWorldBounds = true
		this.body.bounce.y = 0.2;

		this.game.camera.follow(this)

		this.cursors = this.game.input.keyboard.createCursorKeys()
		this.context.players.push(this)
	}

	update(){
		this.body.velocity.x = 0
		const SPEED = 150

		this.game.physics.arcade.overlap(
			this,
			[
				this.context.groups.items,
				this.context.groups.objectives
			],
			this.collectItem,
			null,
			this
		)
		this.game.physics.arcade.collide(
			this,
			this.context.groups.enemies,
			this.hitEnemy,
			null,
			this
		)

		this.game.physics.arcade.collide(
			this,
			this.context.collisionLayer
		)



		if(this.cursors.left.isDown){
			this.body.velocity.x -= SPEED
		} else if(this.cursors.right.isDown){
			this.body.velocity.x = SPEED
		}

		if(this.cursors.up.isDown && this.body.blocked.down){	
			this.body.velocity.y -=400
		}
		if(this.cursors.up.isDown && this.body.touching.down){	
			this.body.velocity.y -=400
		}

	}

	collectItem(player, item){
		item.kill()
		item.activateEffect(player)
	}

	hitEnemy(player, enemy){
		console.log('colliding with the enemy')
	}
}