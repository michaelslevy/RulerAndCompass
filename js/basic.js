var basic = function(){
	
	var self=this;
	
	this.x=4;
	
	self.public=function(i){
		console.log("public:"+self.x);
		private();
		private2();
	}
	
	var private=function(){
		console.log("private:"+self.x); 
	}
	
	function private2(){
		console.log("private 2:"+self.x); 
	}
	
}
