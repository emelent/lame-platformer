class Life extends Item{
	constructor(...args){
		super(...args)
		this.scale.setTo(1)
		this.collectSound = this.game.add.audio('collect')
	}

	activateEffect(player){
		this.collectSound.play()
		console.log('Player picked up a life')
	}
}