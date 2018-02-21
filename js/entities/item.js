class Item extends Entity{
	constructor(...args){
		super(...args)
		this.scale.setTo(2)
		this.anchor.setTo(0.5)
	}

	activateEffect(entity){
		console.log('Effect activated')
	}
}