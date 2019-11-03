var piezas = document.getElementsByClassName('alimento');
var peces;
var padre = document.getElementById('entorno');
var x = 100;
var y = 100;
var id = 0;
window.addEventListener('load', init);

function init() {
    for (i in piezas) {
        piez = piezas[i];
        if (typeof piez.style != "undefined") {
            piez.addEventListener('dragstart', dragIniciado, false);
            piez.addEventListener('dragend', dragFinalizado, false);
        }
    }
}

function dragIniciado(e) {

}

function dragFinalizado(e) {
    var st = this.src;
    padre.innerHTML += '<g class="padre" id="' + id + '"><image class ="movil" xlink:href="' + st + '" width="100" height="150" x="' + x + '" y="' + y + '"></g>';
    id++;
    establecerPeces();

    //agregar condicional para cambio de imagen
    if (dragFinalizado == true) {
        document.getElementById("alimento").className="img";
        return false;

    //hacer pruebas    
    }
}

function establecerPeces(){
    peces = document.getElementsByClassName('movil');
    for (var i = 0; i < peces.length; i++) {
        peces[i].setAttribute("onmousedown","seleccionarElemento(evt)");
        peces[i].setAttribute("touchstart","seleccionarElemento(evt)");
    }
}

var elementSelect = 0;
var currentX = 0;
var currentY = 0;
var currentPosX = 0;
var currentPosY = 0;

function seleccionarElemento(evt) {
    elementSelect = reordenar(evt);
    currentX = evt.clientX;
    currentY = evt.clientY;
    currentPosx = parseFloat(elementSelect.getAttribute("x"));
    currentPosy = parseFloat(elementSelect.getAttribute("y"));
    elementSelect.setAttribute("onmousemove", "moverElemento(evt)");
    elementSelect.setAttribute("touchmove", "moverElemento(evt)");
}

function moverElemento(evt) {
    var dx = evt.clientX - currentX;
    var dy = evt.clientY - currentY;
    currentPosx = currentPosx + dx;
    currentPosy = currentPosy + dy;
    elementSelect.setAttribute("x", currentPosx);
    elementSelect.setAttribute("y", currentPosy);
    currentX = evt.clientX;
    currentY = evt.clientY;
    elementSelect.setAttribute("onmouseout", "deseleccionarElemento(evt)");
    elementSelect.setAttribute("onmouseup", "deseleccionarElemento(evt)");
    elementSelect.setAttribute("touchend", "deseleccionarElemento(evt)");
}

function deseleccionarElemento(evt) {
    if (elementSelect != 0) {
        elementSelect.removeAttribute("onmousemove");
        elementSelect.removeAttribute("onmouseout");
        elementSelect.removeAttribute("onmouseup");
        elementSelect = 0;
    }
}
var entorno = document.getElementById('entorno');

function reordenar(evt) {
    var padre = evt.target.parentNode;
    var clone = padre.cloneNode(true);
    var id = padre.getAttribute("id");
    entorno.removeChild(document.getElementById(id));
    entorno.appendChild(clone);
    return entorno.lastChild.firstChild;
}