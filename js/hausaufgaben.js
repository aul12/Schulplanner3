var weekday = new Array(7);
weekday[0]=  "Montag";
weekday[1] = "Dienstag";
weekday[2] = "Mittwoch";
weekday[3] = "Donnerstag";
weekday[4] = "Freitag";
weekday[5] = "Samstag";
weekday[6] = "Sonntag";

function createJumbotron(content){
    return " <div class=\'jumbotron\'><button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>"+content+"</div>";
}

Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});

function homeworkObject(){
    this.subj = "";
    this.dat = "";
    this.task = "";
}

function compareHW(a,b) {
    a = new Date(a.dat);
    b = new Date(b.dat);
    if (a < b)
        return -1;
    if (a > b)
        return 1;
    return 0;
}

function updateHomework(data){
    var xmlDoc = $.parseXML(data);
    var xml = $(xmlDoc);

    var homeworks = [];
    xml.find('Subject').each(function (count) {
        homeworks.push(new homeworkObject());
        homeworks[count].subj = $(this).text();
    });
    xml.find('Date').each(function (count) {
        homeworks[count].dat = $(this).text();
    });
    xml.find('Task').each(function (count) {
        homeworks[count].task = $(this).text();
    });

    homeworks.sort(compareHW);


    var text = "";
    for(var c=0; c<homeworks.length; c++){
        var dat = new Date(homeworks[c].dat);
        dat = weekday[dat.getDay()] + ", " + dat.toLocaleDateString();
        text += createJumbotron("<h2>"+homeworks[c].subj+"</h2>\n<h3>Bis: "+dat+"</h3>\nAufgabe:"+homeworks[c].task);
    }
    $("#divHaHolder").html(text);

    //@TODO Add to "Agenda"
}

$(function(){
    $.post("srv/homework.php",null,function(data){
        if(data!=""){
            updateHomework(data);
        }
    });


    //$('#inputHaDatum').val(new Date().toDateInputValue());
    $('#inputHaDatum').bootstrapMaterialDatePicker({ weekStart : 0, time: false, lang : 'de' });


    $("#fabHa").click(function(){
        $("#modalAddHausaufgaben").modal();
    });

    $("#btnHaAdd").click(function(){
        var fach = $("#inputHaFach").val();
        var aufgabe = $("#textAreaHaAufgabe").val();
        var datum = new Date($("#inputHaDatum").val());

        if(fach != "" && aufgabe != ""){
            $.post("srv/homework.php","subject="+fach+"&task="+aufgabe+"&date="+datum,function(data){
                if(data!="")
                    updateHomework(data);
            });
        }
        else{
            $.snackbar({content: 'Bitte gib ein Fach und eine Aufgabe ein!'});
        }
    });
});

