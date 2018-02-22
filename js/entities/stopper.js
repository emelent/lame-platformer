class Stopper extends Entity{
	constructor(...args){
		super(...args)
		this.body.immovable = true
		// console.log(this.body)
	}
}