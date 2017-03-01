var login = require("facebook-chat-api");
 
var answeredThreads = {};
var readline = require("readline");
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
 
// Create simple echo bot
login({email: "killer200771@yahoo.com", password: "459786NguyenHoang"}, function callback (err, api) {
 		if(err) {
  			console.error(err);
    		switch (err.error) {
      			case 'login-approval': {
        			console.log('Enter code > ');
       				rl.on('line', function(line){
          				err.continue(line);
          				rl.close();
        		});
        break;}
        
        default: return;
    }
};
	//if(err) return console.error(err);

    api.listen(function callback(err, message) {
        var d = new Date();
        //var h = d.getHours();
        if(!answeredThreads.hasOwnProperty(message.threadID)){
            api.getUserInfo(message.senderID, function(err, ret) {
                if(err) return console.error(err);
                for(var prop in ret) {
                    if(ret.hasOwnProperty(prop) && ret[prop].name) {
                        api.sendMessage("BOT is replying, sorry for any inconvenience. Replying later", prop, function(){
                            answeredThreads[message.threadID] = true;
                        });
                        console.log(ret[prop].name);
                    }
                }
            });
        }

});
});