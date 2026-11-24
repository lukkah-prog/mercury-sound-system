
const numeroWhatsApp = '';

// menú para celulares
const botonMenu = document.getElementById('boton-menu');
const menu = document.getElementById('menu');

botonMenu.addEventListener('click', function () {
  menu.classList.toggle('abierto');
  const abierto = menu.classList.contains('abierto');
  botonMenu.setAttribute('aria-expanded', abierto);
});

const enlaces = menu.querySelectorAll('a');
for (let i = 0; i < enlaces.length; i++) {
  enlaces[i].addEventListener('click', function () {
    menu.classList.remove('abierto');
    botonMenu.setAttribute('aria-expanded', 'false');
  });
}

// año automático en el pie de página
 document.getElementById('anio').textContent = new Date().getFullYear();

// no elegir fechas pasadas
const fecha = document.getElementById('fecha');
const hoy = new Date();
const anio = hoy.getFullYear();
const mes = String(hoy.getMonth() + 1).padStart(2, '0');
const dia = String(hoy.getDate()).padStart(2, '0');
fecha.min = anio + '-' + mes + '-' + dia;

// formulario
const formulario = document.getElementById('formulario');
const respuesta = document.getElementById('respuesta');

formulario.addEventListener('submit', function (evento) {
  evento.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  const tipo = document.getElementById('tipo').value;
  const fechaEvento = fecha.value;
  const lugar = document.getElementById('lugar').value.trim();
  const personas = document.getElementById('personas').value;
  const detalles = document.getElementById('mensaje').value.trim();
  const seleccionados = document.querySelectorAll('input[name="servicio"]:checked');
  const servicios = [];

  for (let i = 0; i < seleccionados.length; i++) {
    servicios.push(seleccionados[i].value);
  }

  if (servicios.length === 0) {
    respuesta.textContent = 'Seleccioná por lo menos un servicio.';
    return;
  }
  if (fechaEvento < fecha.min) {
    respuesta.textContent = 'Seleccioná una fecha válida.';
    return;
  }

  const texto = 'Hola, Mercury Sound System. Quisiera solicitar una cotización.\n\n' +
    'Nombre: ' + nombre + '\n' +
    'Teléfono: ' + telefono + '\n' +
    'Tipo de evento: ' + tipo + '\n' +
    'Fecha: ' + fechaEvento + '\n' +
    'Lugar: ' + lugar + '\n' +
    'Personas: ' + personas + '\n' +
    'Servicios: ' + servicios.join(', ') + '\n' +
    'Detalles: ' + (detalles || 'Sin detalles adicionales');

  if (numeroWhatsApp === '') {
    respuesta.textContent = 'Falta configurar el número de WhatsApp oficial en script.js. La consulta no fue enviada.';
    return;
  }

  const enlace = 'https://wa.me/' + numeroWhatsApp + '?text=' + encodeURIComponent(texto);
  window.open(enlace, '_blank', 'noopener,noreferrer');
  respuesta.textContent = 'Se abrió WhatsApp con tu consulta. Revisá el mensaje y presioná Enviar.';
});
