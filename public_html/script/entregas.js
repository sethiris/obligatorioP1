var entregas = new Array();

function ListarPendEntrega() {
    var cantPend = 0;
    var mensaje = "";
    var pendientes = "<div class='table'>";
    pendientes += "<div class='Title'>" + "PAQUETES PENDIENTES DE ENTREGA" + "</div>";
    pendientes += "<div class='Row'>";
    for (var ite = 0; ite < entregas.length; ite++) {
        var entregaActual = entregas[ite];
        if (entregaActual["ER"] !== null && entregaActual["ED"] === null) {
            pendientes += "<div class='Cell'>" + entregaActual["paquete"] + "</div>";
            cantPend++;
        }
    }
    pendientes += "</div>";
    pendientes += "</div>";

    mensaje = pendientes + "<br><br>" + "Total de paquetes pendientes de entrega: " + cantPend;

    return mensaje;
}

function mostrarPendEntrega() {
    var paquetesPend = ListarPendEntrega();
    $("#divPendientes").html(paquetesPend);
}

function actualizarPendAutom() {
    var actualizar = setTimeOut(ListarPendEntrega, 1);
    clearTimeout(actualizar);
}

