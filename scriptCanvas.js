var mouse = {LEFTCLICK: 1};
var estado;
var seleccion = document.querySelectorAll("input[name=line-sel]");
var GROSOR;
var colorChoose = document.getElementById("colorButton");
var xi = 0, yi = 0, xf = 0, yf = 0;
var canvas = document.getElementById("dibujo");
var contexto = canvas.getContext("2d");
const mobile = window.matchMedia("(max-width: 821px)");

// Resize canvas para Mobile
var s = getComputedStyle(canvas);
var w = s.width;
var h = s.height;

canvas.width = w.split('px')[0];
canvas.height = h.split('px')[0];

// SABER LAS COORDENADAS DEL MOUSE RELATIVO A LA POSICION DEL CANVAS //
const xReal = (clientX) => clientX - canvas.getBoundingClientRect().left;     
const yReal = (clientY) => clientY - canvas.getBoundingClientRect().top;

canvas.addEventListener("mousedown", mousePresionado);
canvas.addEventListener("mousemove", mouseMovimiento);
canvas.addEventListener("mouseup", mouseSuelto);
canvas.addEventListener("mouseout", mouseSuelto);

// Media quere para javascript 

mobile.addListener(validation)
validation(mobile);
function validation(evento)
{
    if (evento.matches)
    {   
        canvas.addEventListener("touchstart", touchSTART);
        canvas.addEventListener("touchmove", touchMOVE);
        canvas.addEventListener("touchcancel", touchEND);
        canvas.addEventListener("touchend", touchEND);       
        
        function touchSTART(evento)
        {
            mousePresionado(evento.touches[0])
           
        }
    
        function touchMOVE(evento)
        {
            mouseMovimiento(evento.touches[0])
            evento.preventDefault();
        }

        function touchEND(evento)
        {
            mouseSuelto(evento.changedTouches[0])
        }
    }    
}

// Comienzan las funciones para el programa

function selectGROSOR ()
{
    if (seleccion[0].checked)
    {
        GROSOR = 1;
    }
    else if (seleccion[1].checked)
    {
        GROSOR = 3;
    }
    else if (seleccion[2].checked)
    {
        GROSOR = 5;
    }
    else if (seleccion[3].checked)
    {
        GROSOR = 7;
    }
    return GROSOR;
}

function mousePresionado(evento)
{
    var colorLine = colorChoose.value;
    xi = xf;
    yi = yf;
    xf = xReal(evento.clientX);
    yf = yReal(evento.clientY);                         // DIBUJAR UN PUNTO EN EL CANVAS //
    contexto.beginPath();
    contexto.fillStyle = colorLine;
    contexto.fillRect(xf, yf, GROSOR, GROSOR);
    contexto.closePath();
    estado = mouse.LEFTCLICK;
}

function mouseMovimiento(evento)
{   
    var colorLine = colorChoose.value;
    if (estado == mouse.LEFTCLICK)
    {
    xi = xf;                                             // DIBUJAR MIENTRAS SE TENGA PRESIONADO EL MOUSE //
    yi = yf;
    xf = xReal(evento.clientX);
    yf = yReal(evento.clientY);
    contexto.beginPath();
    contexto.moveTo(xi, yi);
    contexto.lineTo(xf, yf);
    contexto.strokeStyle = colorLine;
    contexto.lineWidth = GROSOR;
    contexto.stroke();
    contexto.closePath();
    }
    else
    {
        mouseSuelto();
    }
}

function mouseSuelto()
{
    estado = 0;
}

function borrarCanvas()
{
    contexto.clearRect(0, 0, canvas.width, canvas.height);     // BORRA EL CONTENIDO DEL CANVAS //
}

