class Player extends Entity{
	constructor(context, pos, props){
		super(context, pos, props)


		this.frame = 0
		// this.scale.setTo(1.2, 1.2)
		this.anchor.setTo(0.5)

		// add le physics
		context.game.physics.arcade.enable(this)
		this.body.collideWorldBounds = true
		this.body.bounce.y = 0.2;


		context.game.camera.follow(this)
		
		this.cursors = context.game.input.keyboard.createCursorKeys()
	}

	update(){
		this.body.velocity.x = 0
		const SPEED = 200

	// this.game.physics.arcade.overlap(
	// 		this,
	// 		this.items,
	// 		this.collect,
	// 		null,
	// 		this
	// 	)
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
	}
}