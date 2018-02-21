class Coin extends Item{
	constructor(...args){
		super(...args)

		this.animations.add('idle', [4, 5, 6, 7], 5, true)
		this.animations.play('idle')
		this.body.allowGravity = false
		this.MAX_FLOAT_DIST = 300
		this.FLOAT_SPEED = -10
		this.distanceFloated = 0
		this.body.velocity.y = this.FLOAT_SPEED 
		this.collectSound = this.game.add.audio('collect')
	}

	update(){
		this.distanceFloated += Math.abs(this.FLOAT_SPEED)
		if(this.distanceFloated >= this.MAX_FLOAT_DIST){
			this.body.velocity.y *= -1
			this.distanceFloated = 0
		}
	}

	activateEffect(player){
		this.collectSound.play()
		console.log('Player picked up a coin')
	}
}