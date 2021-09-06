//titulo
$('#titulo').append(`<h1>Disfrutá tu viaje, nosotros nos encargamos del resto.</h1>`);
$("h1").css("color","black")
$("h1").css("font-size","35px")

        


//formulario
const datos = [];

class Datos {
  constructor(parametro) {
    this.id = datos.length;
    this.origen = parametro.origen;
    this.destino = parametro.destino;
    this.salida = parametro.salida;
    this.regreso = parametro.regreso;
    this.adultos = parametro.adultos;
    this.menores = parametro.menores;
    this.mayores = parametro.mayores
  
  }
}

$("#formulario").css("border","4px solid black")
$("#formulario").css("background-color", "white") 
$("#formulario").css("width","800px") 
$("#formulario").css("display","flex") 


$("#titulo").css("color","black") 


$("#formulario").animate({  left:'250px', opacity:'0.75', height:'500px', width:'850px'}, 
                        "2000");
                        
$('#form').css("padding","15px")
.slideUp(800)
.slideDown(800)





var resultado = 0;
var dias = 0;
var destino = " ";
var adultos = 0;
var menores = 0;
var mayores = 0;
var origen = " ";
var precioTotal = 0;


function validarFormulario(e){
    $('#formulario').hide();

    // e.preventDefault();
    //origen
    origen = document.getElementById("origen").value;
    
    //tiempo de viaje
    dias = document.getElementById("daysDiscount").value;
    resultado = dias * 1000;

    //destino de viaje
    destino = document.getElementById("destino").value;
    
    var america = 1.2;
    var europa = 1.5;
    var asia = 1.7;
    var oceania = 1.9;
    var africa = 1.4;

    if (destino=="América"){
        resultado = resultado * america;
    
    
    } else if (destino=="Europa"){
    
        resultado = resultado * europa;

    
    } else if (destino=="Asia"){
    
        resultado = resultado * asia;

    
    } else if (destino=="Oceanía"){
    
        resultado = resultado * oceania;

    
    } else if (destino=="África"){
    
        resultado = resultado * africa;

    }




    //Cantidad de pasajeros//
    //Adultos

    adultos = document.getElementById("cantidadAdultos").value;

    if (adultos == 0){
        resultado = resultado * 1.1;
    } else if (adultos == 1){
        resultado = resultado * 1.2;
    } else if (adultos == 2){
        resultado = resultado * 1.6;
    } else if (adultos == 3){
        resultado = resultado * 1.8;
    } else if (adultos == 4){
        resultado = resultado * 2;
    } else if (adultos == 5){
        resultado = resultado * 2.2;
    }



    //Menores 
    menores = document.getElementById("cantidadMenores").value;

    if (menores == 0){
        resultado = resultado * 1;
    } else if (menores == 1){
        resultado = resultado * 1.2;
    } else if (menores == 2){
        resultado = resultado * 1.3;
    } else if (menores == 3){
        resultado = resultado * 1.4;
    } else if (menores == 4){
        resultado = resultado * 1.5;
    } else if (menores == 5){
        resultado = resultado * 1.6;
    }


    //adultos mayores

    mayores = document.getElementById("mayores").value;

    if (mayores == 0){
        resultado = resultado * 1;
    } else if (mayores == 1){
        resultado = resultado * 1.3;
    } else if (mayores == 2){
        resultado = resultado * 1.4;
    } else if (mayores == 3){
        resultado = resultado * 1.5;
    } else if (mayores == 4){
        resultado = resultado * 1.6;
    } else if (mayores == 5){
        resultado = resultado * 1.7;
    }





    precioTotal = Math.round(resultado * 1,21);


         



    // POP UP CON JQUERY//

    $('#popup').show();
    $("#popup").animate({  left:'250px', opacity:'0.80', height:'500px', width:'850px'}, 
                            "slow",            
                            function(){        
                                console.log("Gracias por visitarnos!");
                            });
    



    $("#popup").append(`<div id="modal">
                        <b>DATOS DEL PASAJERO</b>
                        <ul class="list-group">
                            <li class="list-group-item">Origen: ${origen}</li>
                            <li class="list-group-item">Destino: ${destino}</li>
                            <li class="list-group-item">Días de viaje: ${dias}</li>
                            <li class="list-group-item">Adultos: ${adultos}</li>
                            <li class="list-group-item">Menores: ${menores}</li>
                            <li class="list-group-item">Adultos mayores: ${mayores}</li>
                            <li class="list-group-item">Precio total: $${precioTotal}</li>
                        </ul>
                        <br>

                                                        
                            <button onclick=noMostrar() class="btn btn-primary">Modificar</button>
                            <a href="carrito.html"><button class="btn btn-primary">Continuar</button></a>
                            
                        </div>`);
        
    // $('#popup').css("display","flex");
    // $('#popup').css("aling-items","center");

                    






    //LOCAL STORANGE
    localStorage.setItem("Origen",origen);
    localStorage.setItem("Destino",destino);
    localStorage.setItem("Adultos",adultos);
    localStorage.setItem("Menores",menores);
    localStorage.setItem("Mayores",mayores);
    localStorage.setItem("Salida",salida);
    localStorage.setItem("Regreso",regreso);
    localStorage.setItem("Precio total",precioTotal);

    localStorage.setItem("Datos del pasajero", JSON.stringify(datos))
    console.log(localStorage.getItem("Datos del pasajero"));




}




function calculardiasDiscount() {
    var timeStart = new Date(document.getElementById("start").value);
    var timeEnd = new Date(document.getElementById("finish").value);
    var actualDate = new Date();
    if (timeEnd > timeStart)
    {
        var diff = timeEnd.getTime() - timeStart.getTime();
        document.getElementById("daysDiscount").value = Math.round(diff / (1000 * 60 * 60 * 24));
    }
    else if (timeEnd != null && timeEnd < timeStart) {
        swal("La fecha final debe ser mayor a la fecha inicial");
        document.getElementById("daysDiscount").value = 0;
    }
}




function noMostrar(){
    $('#popup').empty();
    $('#popup').hide();
    $('#formulario').show();


 
}