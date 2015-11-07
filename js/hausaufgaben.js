function createJumbotron(content){
    return "<div class=\'jumbotron\'>"+content+"</div>";
}

Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});

$(function(){
    //@TODO Load from Server
    //@TODO Sort by Date
    //@TODO Show first Homework
    //@TODO Add to "Agenda"

    //$('#inputHaDatum').val(new Date().toDateInputValue());
    $('#inputHaDatum').bootstrapMaterialDatePicker({ weekStart : 0, time: false });

    $("#fabHa").click(function(){
        $("#modalAddHausaufgaben").modal();
    });

    $("#btnHaAdd").click(function(){
        var fach = $("#inputHaFach").val();
        var aufgabe = $("#textAreaHaAufgabe").val();
        var datum = new Date($("#inputHaDatum").val());

        if(fach != "" && aufgabe != ""){
            var text = $("#divHaHolder").html();
            text += createJumbotron("<h2>"+fach+"</h2>\n<h3>Bis: "+datum.toLocaleDateString()+"</h3>\nAufgabe:"+aufgabe);
            $("#divHaHolder").html(text);

            //@TODO Post to Server
        }
        else{
            $.snackbar({content: 'Bitte gib ein Fach und eine Aufgabe ein!'});
        }
    });
});

