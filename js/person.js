function Person(name) {
	this.name = name;
	this.sayName = function() {
		return "Hi, I'm " + this.name;
	};
}
var adam = new Person('Adam');