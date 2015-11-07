Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});

$(function(){
   //@TODO Klassenarbeiten laden

    $("#fabKa").click(function(){
        $("#modalAddKlassenarbeit").modal();
    });

    $('#inputKaDatum').val(new Date().toDateInputValue());

    $("#btnKaAdd").click(function(){
        var fach = $("#inputKaFach").val();
        var thema = $("#textAreaKaThema").val();
        var datum = new Date($("#inputKaDatum").val());

        if(fach != "" && thema != ""){
            var text = $("#divKaHolder").html();
            text += createJumbotron("<h2>"+fach+"</h2>\n<h3>An: "+datum.toLocaleDateString()+"</h3>\nThema:"+thema);
            $("#divKaHolder").html(text);

            //@TODO Post to Server
        }
        else{
            $.snackbar({content: 'Bitte gib ein Fach und eine Aufgabe ein!'});
        }
    });
});