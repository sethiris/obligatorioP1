function mostrarRepartidores(_array){
  var mensaje="<li data-role='list-divider'>Repartidores</li>";
  var icono="";
  for (var x in _array) {
    switch (_array[x].medio) {
      case "Bicicleta": icono="<i class='fa fa-bicycle' aria-hidden='true'></i>";break;
      case "Moto": icono="<i class='fa fa-motorcycle' aria-hidden='true'></i>"; break;
      case "Camioneta": icono="<i class='fa fa-car' aria-hidden='true'></i> "; break;
      default:
    }
  mensaje+="<li id="+ _array[x].codigo + ">" + icono;
  mensaje+= "  " + _array[x].nombre + "</li>";
  }
  return mensaje;
}

function mostrarPaquetes(_array){
  var mensaje="<li data-role='list-divider'>Paquetes</li>";
  var icono="<i class='fa fa-cube' aria-hidden='true'></i>";
  if (_array.length>0) {
    for (var x in _array) {
    mensaje+="<li id=P"+ _array[x].codigo + "> " + icono;
    mensaje+= " Codigo:" + _array[x].codigo + " Remitente: "+ _array[x].ciRemitente + " Destinatario:" + _array[x].ciDestinatario + "</li>";
    }
  } else {
    mensaje=null;
  }

  return mensaje;
}
function mostrarReportePaquete(paquetes,entregas,usuario){
  var mensaje="<li data-role='list-divider'>Paquetes</li>";
  var icono="<i class='fa fa-cube' aria-hidden='true'";
  if (paquetes.length>0) {
 for(var x in paquetes){
    var entregadoR="--";
    var enViaje="--";
    var entregado= "--";
    if (usuario ===1) {
      enViaje="<br><input class='ui-input-text' id='txtEnViaje'></input>";
      entregado="<br><input class='ui-input-text' id='txtEntregado'></input>";
    }
    if (entregas[x].ER===null) {
      icono+="style='color:black'";
    }else {
      if(entregas[x].EV===null){
        entregadoR=entregas[x].ER;
        icono+="style='color:yellow'";
      } else {
        if(entregas[x].ED===null){
          enViaje= entregas[x].EV;
          icono+="style='color:blue'";
        }else{
          entregado = entregas[x].ED;
          icono+="style='color:green'";
          var costo = 999;
        }
      }
    }
    icono += "></i>";
    mensaje+="<li> " + icono;
    mensaje+="<div id='divEstados'class='ui-grid-c'>";
    mensaje+= "<div class='ui-block-a'> Codigo:" + paquetes[x].codigo +"</div>";
    mensaje+= " <div class='ui-block-b'>Remitente: "+ paquetes[x].ciRemitente+"</div>";
    mensaje+= " <div class='ui-block-c'>Destinatario:" + paquetes[x].ciDestinatario +"</div>";
    if (costo>0) {
      mensaje+= " <div class='ui-block-d'>Costo:" + costo +"</div></li>";
    }
    mensaje+="<li>";
    mensaje+="<div id='divEstados'class='ui-grid-c'>";
    mensaje+="<div class='ui-block-a'> Recibido:"+ entregas[x].RE +"</div>";
    mensaje+= "<div class='ui-block-b'> Entregado a repartidor:"+ entregadoR + "</div>";
    mensaje+= "<div class='ui-block-c'>En viaje" + enViaje + "</div>";
    mensaje+= "<div class='ui-block-d'> Entregado:" + entregado + "</div>";
    mensaje+= "</div> ";
    if (usuario ===1) mensaje+="</li><li><input class='ui-btn ui shadow' id='btnGuardarEstados"+ paquetes[x].codigo + "' type='button' value='Guardar'></input>";
    }
    mensaje+="</div></li>";
  } else {
    mensaje=null;
  }

  return mensaje;
}
