class Slime extends Enemy{
	constructor(context, pos, props){
		super(context, pos, props)

		this.anchor.setTo(0.5)

		this.animations.add('walk', [0, 1, 2], 5, true)
		this.animations.play('walk')
		this.direction = 1
		this.MOVE_SPEED = props.speed
		this.SCALE = 1.5
		this.body.immovable = true
		this.switchDirection()
	}

	update(){
		this.game.physics.arcade.collide(
			this,
			this.context.groups.stoppers,
			this.switchDirection,
			null,
			this
		)
	}

	switchDirection(){
		this.direction *= -1
		this.body.velocity.x = this.direction * this.MOVE_SPEED
		this.scale.setTo(this.SCALE * this.direction, this.SCALE)
	}
}