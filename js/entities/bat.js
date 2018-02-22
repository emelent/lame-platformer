class Bat extends Enemy{
	constructor(context, pos, props){
		super(context, pos, props)

		this.anchor.setTo(0.5)

		this.animations.add('fly', [8, 9, 10], 5, true)
		this.animations.play('fly')


		this.body.allowGravity = false
		this.body.immovable = true
		this.MOVE_SPEED = props.speed
		this.MAX_FLOAT_DIST = 2000
		this.FLOAT_SPEED = -60
		this.SCALE = 1.5

		this.moveDirection = props.start_direction
		this.distanceFloated = 0
		this.body.velocity.y = this.FLOAT_SPEED 
		this.switchmoveDirection()
	}

	update(){
		this.game.physics.arcade.collide(
			this,
			this.context.groups.stoppers,
			this.switchmoveDirection,
			null,
			this
		)
		this.distanceFloated += Math.abs(this.FLOAT_SPEED)
		if(this.distanceFloated >= this.MAX_FLOAT_DIST){
			this.body.velocity.y *= -1
			this.distanceFloated = 0
		}
	}

	switchmoveDirection(){
		this.moveDirection *= -1
		this.body.velocity.x = this.moveDirection * this.MOVE_SPEED
		this.scale.setTo(this.SCALE * this.moveDirection, this.SCALE)
	}
}