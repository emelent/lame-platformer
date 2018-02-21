class Slime extends Enemy{
	constructor(...args){
		super(...args)

		this.scale.setTo(1.5)
		this.anchor.setTo(0.5)

		this.animations.add('idle', [0], 5, true)
		this.animations.add('walk', [0, 1], 5, true)
		this.animations.add('die', [2], 5, true)

		this.animations.play('idle')
	}
}