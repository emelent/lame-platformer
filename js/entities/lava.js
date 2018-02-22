class Lava extends Entity{
	constructor(...args){
		super(...args)

		this.animations.add('idle', [4, 5], 8, true)
		this.animations.play('idle')
	}
}