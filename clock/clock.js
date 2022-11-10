function updateClock(){
    var dateTime = new Date();
    var dnum = dateTime.getDate();
    var dayn = dateTime.getDay();
    var hrs = dateTime.getHours();
    var min = dateTime.getMinutes();
    var sec = dateTime.getSeconds();
    var year = dateTime.getFullYear();
    var month = dateTime.getMonth();
    //var session = document.getElementById('timeSession');
    Number.prototype.pad = function(digits){
        for(var n= this.toString(); n.length < digits; n =0 +n);
        return n;
    }
    console.log("TEst 1");
    var months = ["January", "February","March", "April", "May", "June", "July",
    "August","September","October", "December"];
    var weeks = ["Sunday","Monday","Tuesday","Wednesday", "Thursday","Friday","Saturday"];
    var ids = ["dayname","month","daynumber", "year", "hours", "minutes","seconds"];
    var values = [weeks[dayn], months[month], dnum.pad(2), year, hrs.pad(2), min.pad(2), sec.pad(2)];
    
   

    for (var i = 0; i< ids.length; i++){
        document.getElementById(ids[i]).firstChild.nodeValue = values[i];
    }
    
}
function initClock(){
    console.log("blabla");
    updateClock();
    setInterval("updateClock()", 1);
    // om de een of andere reden wordt deze functie nooit aangesproken.
}
setInterval("updateClock()", 1);