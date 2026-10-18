/**
 * Todo el contenido del sitio vive acá.
 * Los nombres, fechas, textos y fotos son de ejemplo: cuando la pareja entregue
 * su historia real, se cambia solo este archivo y las fotos de /public/fotos.
 * En cada foto, `src` vacío muestra un marco con la descripción de qué va ahí.
 */

export type Foto = {
  src?: string
  alt: string
}

export const pareja = {
  nombres: ['Camila', 'Tomás'] as const,
  iniciales: 'C & T',
  frase: 'Una historia que empezó por casualidad y que hoy queremos celebrar contigo.',
}

export const boda = {
  // ISO con zona horaria de Chile continental (verano: -03:00)
  fecha: '2027-03-13T17:00:00-03:00',
  fechaTexto: 'Sábado 13 de marzo de 2027',
  ciudad: 'Región del Biobío, Chile',
}

// Desde cuándo están juntos: alimenta el contador de días
export const inicioRelacion = '2019-04-06'

export const capitulos = [
  { id: 'portada', etiqueta: 'Inicio' },
  { id: 'conocimos', etiqueta: 'Cómo nos conocimos' },
  { id: 'camino', etiqueta: 'Nuestro camino' },
  { id: 'propuesta', etiqueta: 'La propuesta' },
  { id: 'numeros', etiqueta: 'En números' },
  { id: 'gran-dia', etiqueta: 'El gran día' },
  { id: 'detalles', etiqueta: 'Detalles' },
] as const

export const conocimos = {
  numero: 'Capítulo I',
  titulo: 'Cómo nos conocimos',
  texto:
    'Fue un viernes de lluvia en una cafetería que ninguno de los dos conocía. Ella buscaba un enchufe para su computador; él estaba sentado justo al lado del único libre. Una conversación de cinco minutos se convirtió en tres horas, dos cafés y la promesa de volver la semana siguiente.',
  lugar: 'Concepción · abril de 2019',
  fotos: [
    { alt: 'La cafetería donde se conocieron' },
    { alt: 'Primera foto juntos' },
    { alt: 'El ticket de los dos cafés' },
  ] satisfies Foto[],
}

export const camino = {
  numero: 'Capítulo II',
  titulo: 'Nuestro camino',
  hitos: [
    {
      anio: '2019',
      titulo: 'La primera cita',
      texto: 'Una caminata por la costanera que terminó con empanadas y una lluvia que nadie anunció.',
      foto: { alt: 'Primera cita en la costanera' },
    },
    {
      anio: '2020',
      titulo: 'Juntos a la distancia',
      texto: 'Un año de videollamadas, cartas escritas a mano y películas vistas al mismo tiempo.',
      foto: { alt: 'Captura de una videollamada' },
    },
    {
      anio: '2021',
      titulo: 'El primer viaje',
      texto: 'San Pedro de Atacama: el cielo más estrellado que hemos visto y un pinchazo a mitad del desierto.',
      foto: { alt: 'Viaje al desierto' },
    },
    {
      anio: '2023',
      titulo: 'Llegó Canela',
      texto: 'Adoptamos a una perrita que se adueñó del sillón, de la cama y de nuestro corazón.',
      foto: { alt: 'Canela, la mascota' },
    },
    {
      anio: '2024',
      titulo: 'Nuestro hogar',
      texto: 'Cajas por todas partes, una mesa armada al revés y la certeza de haber elegido bien.',
      foto: { alt: 'La mudanza al primer hogar' },
    },
  ] satisfies { anio: string; titulo: string; texto: string; foto: Foto }[],
}

export const propuesta = {
  numero: 'Capítulo III',
  titulo: 'La propuesta',
  antes: 'En el mismo mirador donde vimos nuestro primer atardecer, con Canela como única testigo, llegó la pregunta.',
  pregunta: '¿Te casarías conmigo?',
  respuesta: 'Sí',
  fecha: 'Diciembre de 2025',
  foto: { alt: 'El momento de la propuesta' } satisfies Foto,
}

export const numeros = {
  numero: 'Capítulo IV',
  titulo: 'Nuestra historia en números',
  // `valor: null` significa "calcular días juntos en vivo"
  datos: [
    { valor: null, sufijo: '', etiqueta: 'días juntos' },
    { valor: 1240, sufijo: '', etiqueta: 'cafés compartidos' },
    { valor: 14, sufijo: '', etiqueta: 'ciudades visitadas' },
    { valor: 1, sufijo: '', etiqueta: 'perrita consentida' },
  ] as { valor: number | null; sufijo: string; etiqueta: string }[],
}

export const granDia = {
  numero: 'Capítulo V',
  titulo: 'El gran día',
  invitacion: 'Nos encantaría que nos acompañes en el día más importante de nuestra historia.',
  lugares: [
    {
      tipo: 'Ceremonia',
      nombre: 'Parroquia San Pedro',
      hora: '17:00 h',
      direccion: 'Av. Principal 123, Región del Biobío',
      mapa: 'https://maps.google.com/?q=Concepcion+Chile',
    },
    {
      tipo: 'Recepción',
      nombre: 'Viña Los Robles',
      hora: '19:00 h',
      direccion: 'Camino Interior km 8, Región del Biobío',
      mapa: 'https://maps.google.com/?q=Concepcion+Chile',
    },
  ],
  itinerario: [
    { hora: '17:00', titulo: 'Ceremonia', texto: 'Te pedimos llegar con quince minutos de anticipación.' },
    { hora: '18:15', titulo: 'Fotografías', texto: 'Un momento para retratarnos con quienes más queremos.' },
    { hora: '19:00', titulo: 'Cóctel', texto: 'Bienvenida en los jardines de la viña.' },
    { hora: '20:30', titulo: 'Cena', texto: 'Brindis, discursos y sorpresas.' },
    { hora: '22:00', titulo: 'Fiesta', texto: 'Que nadie se quede sentado.' },
  ],
}

export const detalles = {
  numero: 'Capítulo VI',
  titulo: 'Detalles para ti',
  tarjetas: [
    {
      titulo: 'Código de vestimenta',
      texto: 'Formal de jardín. Sugerimos evitar el blanco y los tacos muy finos: la recepción es sobre pasto.',
    },
    {
      titulo: 'Regalos',
      texto: 'Tu presencia es nuestro mejor regalo. Si deseas hacernos un obsequio, compartiremos los datos para una transferencia.',
    },
    {
      titulo: 'Alojamiento',
      texto: 'Tenemos convenio con dos hoteles cercanos a la viña. Escríbenos y te enviamos los detalles.',
    },
  ],
}

// Lo interactivo llega en la segunda etapa: acá se presenta como adelanto
export const proximamente = {
  titulo: 'Muy pronto, esta historia también será tuya',
  bajada: 'Estamos preparando espacios para que participes antes, durante y después de la boda.',
  items: [
    { titulo: 'Confirma tu asistencia', texto: 'Un formulario simple para avisarnos si vienes y con quién.' },
    { titulo: '¿Cuánto nos conoces?', texto: 'Una trivia sobre nuestra historia, con ranking de invitados.' },
    { titulo: 'Muro de deseos', texto: 'Déjanos un mensaje que leeremos el día de la boda.' },
    { titulo: 'Galería compartida', texto: 'Sube tus fotos de la fiesta y revívela con todos.' },
  ],
}
