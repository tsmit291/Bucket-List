window.onload= function() {
  console.log('IM CONNECTED TO THIS PAGE HOMIE');
    window.cloudilly= new Cloudilly();
    
    cloudilly.initialize('com.bucketlist.app', '8f051571-b90c-4768-b550-a827827a6629', function() {
        cloudilly.connect();
        console.log('****this shit is connected man ****')
    });

    cloudilly.socketConnected(function(err, res) {
        if(err) { console.log("ERROR: Oops. Something wrong"); return; }
        console.log("@@@@@@ CONNECTED");
        console.log(res);
    });

    cloudilly.socketDisconnected(function() {
        console.log("@@@@@@ CLOSED");
    });

    cloudilly.socketReceivedDevice(function(res) {
        console.log("@@@@@@ RECEIVED DEVICE");
        console.log(res);
    });

    cloudilly.socketReceivedPost(function(res) {
        console.log("@@@@@@ RECEIVED POST");
        console.log(res);
    });
};
