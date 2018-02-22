class Weapon extends Item{
	constructor(...args){
		super(...args)

		// this.animations.add('idle', [0, 1, 2], 7, true)
		// this.animations.play('idle')
		// this.body.allowGravity = false

		this.anchor.setTo(0)
		this.scale.setTo(1)
		this.collectSound = this.game.add.audio('collect')
	}

	activateEffect(player){
		this.collectSound.play()
		console.log('Player picked up a weapon')
	}
}