class Item extends Entity{
	constructor(...args){
		super(...args)
	}

	activateEffect(entity){
		console.log('Effect activated')
	}
}