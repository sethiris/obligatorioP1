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
  mensaje+="<li id="+ _array[x].codigo + " onclick='seleccionarRepartidor(this.id)'> " + icono;
  mensaje+= "  " + _array[x].nombre + "</li>";
  }
  return mensaje;
}

function mostrarPaquetes(_array){
  var mensaje="<li data-role='list-divider'>Paquetes</li>";
  var icono="";
  for (var x in _array) {
  mensaje+="<li id=P"+ _array[x].codigo + " onclick='seleccionarPaquete(this.id)'> " + icono;
  mensaje+= " Codigo:" + _array[x].codigo + " Remitente: "+ _array[x].ciRemitente + " Destinatario:" + _array[x].ciDestinatario + "</li>";
  }
  return mensaje;
}
