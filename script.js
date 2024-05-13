// Datos de las empresas
var empresas = [
  { origen: "Lima", destino: "Tingo Maria", nombre: "Caballo" },
  { origen: "Lima", destino: "Tingo Maria", nombre: "Caballo2" },
  { origen: "Lima", destino: "Huanuco", nombre: "Tigre" },
  { origen: "Lima", destino: "Huancayo", nombre: "León" },
  { origen: "Huancayo", destino: "Lima", nombre: "Lobo" },
  { origen: "Pucallpa", destino: "Tingo Maria", nombre: "Águila" },
  { origen: "Pucallpa", destino: "Tingo Maria", nombre: "Cocodrilo" },
  { origen: "Pucallpa", destino: "Tingo Maria", nombre: "Jaguar" },
  { origen: "Tingo Maria", destino: "Lima", nombre: "Ballena" },
  { origen: "Tingo Maria", destino: "Huancayo", nombre: "Delfín" },
  { origen: "Tingo Maria", destino: "Pucallpa", nombre: "Pájaro" }
];

// Obtener los elementos de origen y destino
var origenSelect = document.getElementById("origen");
var destinoSelect = document.getElementById("destino");

// Función para actualizar las opciones de destino basadas en el origen seleccionado
function actualizarDestinos(origen) {
// Limpiar las opciones actuales
destinoSelect.innerHTML = '<option value="" disabled selected>Seleccionar destino</option>';

// Filtrar empresas según el origen seleccionado y agregar opciones de destino únicas
var destinosUnicos = [];
empresas.filter(function(empresa) {
  return empresa.origen === origen;
}).forEach(function(empresa) {
  if (!destinosUnicos.includes(empresa.destino)) {
    destinoSelect.innerHTML += '<option value="' + empresa.destino + '">' + empresa.destino + '</option>';
    destinosUnicos.push(empresa.destino);
  }
});
}

// Función para limpiar el destino seleccionado
function limpiarDestino() {
destinoSelect.selectedIndex = 0;
}

// Event listener para detectar cambios en el origen seleccionado
origenSelect.addEventListener("change", function() {
var origenSeleccionado = this.value;
actualizarDestinos(origenSeleccionado);
limpiarDestino();
});

// Event listener para el botón de buscar
document.getElementById("buscar").addEventListener("click", function() {
var origen = origenSelect.value;
var destino = destinoSelect.value;

if (origen && destino) {
  mostrarResultado(origen, destino);
} else {
  alert("Por favor selecciona un origen y un destino antes de buscar.");
}
});

// Función para mostrar los resultados
function mostrarResultado(origen, destino) {
var resultadosContainer = document.getElementById("resultados");

// Limpiar resultados anteriores
resultadosContainer.innerHTML = '';

// Filtrar empresas según el origen y destino seleccionados
var empresasEncontradas = empresas.filter(function(empresa) {
  return empresa.origen === origen && empresa.destino === destino;
});

// Crear y agregar los resultados al contenedor
if (empresasEncontradas.length > 0) {
  empresasEncontradas.forEach(function(empresa) {
    var resultado = document.createElement("div");
    resultado.classList.add("resultado");
    resultado.innerHTML = '<img src="tu_imagen_resultado.png" alt="imagen de resultado" width="100" height="100">' +
      '<div class="info"><h3>' + empresa.nombre + '</h3><p>' + origen + ' > ' + destino + '</p></div>';
    
    // Agregar evento de clic al resultado para permitir al usuario elegirlo
    resultado.addEventListener("click", function() {
      alert("Has seleccionado la empresa: " + empresa.nombre);
    });
    
    resultadosContainer.appendChild(resultado);
  });
} else {
  alert("No se encontraron empresas para el origen y destino seleccionados.");
}
}
