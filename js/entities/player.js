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

		this.animations.add('walk', [0, 1], 5, true)
		this.animations.add('jump', [2], 5, true)
		this.animations.add('shoot', [3], 5, true)

		this.animations.add('idle', [0], 5, true)
		this.animations.play('idle')

		this.cursors = this.game.input.keyboard.createCursorKeys()
		this.context.players.push(this)

		this.GROUND_Y = -2.64
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
			this.animations.play('walk')
			this.scale.setTo(-2, 2)
		} else if(this.cursors.right.isDown){
			this.body.velocity.x = SPEED
			this.animations.play('walk')
			this.scale.setTo(2)
		}

		if(this.cursors.up.isDown && this.body.blocked.down){	
			this.body.velocity.y -=400

			this.animations.play('jump')
		}else{

		}

		if(!this.body.blocked.down && !this.body.touching.down){
			this.animations.play('jump')
		}else if(this.body.velocity.x === 0){
			this.animations.play('idle')
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