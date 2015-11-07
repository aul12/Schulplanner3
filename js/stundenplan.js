$(function(){
    //@TODO Tabelle laden

    // Find a <table> element with id="myTable":
    var table = document.getElementById("tableSp");

    for(var counter=1; counter<9; counter++){
        var row = table.insertRow(-1);
        row.insertCell(-1).innerHTML = counter;
        row.insertCell(-1).innerHTML = "ABC";
    }

});