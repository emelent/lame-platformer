class Objective extends Item{
	constructor(context, pos, props){
		super(context, pos, props)
	}

	activateEffect(entity){
		this.context.restartLevel()
	}
}