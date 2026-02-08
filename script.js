const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 420;
canvas.height = 560;

// TEXTO
const textoCompleto =
  "Y otra vez frente a ti, con la misma calma, pero más amor.\n" +
  "Con un amor tan grande, que no cabe en una constelación.\n" +
  "Mi alma, que buscaba abrigo, te encontró…\n" +
  "se entrega ante ti para abrazarte.\n" +
  "No importa el tiempo, estaremos juntos; en esta línea o en cualquier otra, siempre serás tú.\n" +
  "Seré el villano, no me importa, porque elijo salvarte a ti antes que a todos.\n" +
  "Y aunque te escribo esto en febrero, te amo en todas las estaciones.\n" +
  "Y solo me queda preguntarte:\n\n";


let textoIndex = 0;


// ELEMENTOS
const contadorEl = document.getElementById("contador");
// Fecha real: 13 de noviembre de 2024, 12:12 pm
const inicioAmor = new Date(2024, 10, 13, 12, 12, 0);

const textoEl = document.getElementById("texto");
const pregunta = document.getElementById("pregunta");
const acciones = document.getElementById("acciones");

// ESTADOS
let preguntaMostrada = false;
let botonesMostrados = false;

// COLORES
const colores = ["#e63946", "#ff6b6b", "#f06595", "#faa2c1"];

// HOJAS
let hojas = [];
const maxHojas = 650;
let cayendo = [];

// ---------- TEXTO ----------
function escribirTexto() {
  const intervalo = setInterval(() => {
    textoEl.innerHTML += textoCompleto[textoIndex] === "\n"
      ? "<br>"
      : textoCompleto[textoIndex];

    textoIndex++;

    if (textoIndex >= textoCompleto.length) {
      clearInterval(intervalo);

      // Mostrar pregunta INMEDIATO
      pregunta.classList.remove("oculto");
      preguntaMostrada = true;

      iniciarContador();

      // Botones un poco después
      setTimeout(() => {
  acciones.classList.remove("oculto");
}, 600);
    }
  }, 45);
}

function iniciarContador() {
  contadorEl.classList.remove("oculto");

  setInterval(() => {
    const ahora = new Date();
    const diff = ahora - inicioAmor;

    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diff / (1000 * 60)) % 60);
    const segundos = Math.floor((diff / 1000) % 60);

    contadorEl.innerHTML =
      `Nuestro amor comenzó hace:<br>` +
      `${dias} días ${horas} horas ${minutos} minutos ${segundos} segundos`;
  }, 1000);
}

// ---------- CORAZÓN ----------
function dibujarCorazon(x, y, size, color, alpha = 1) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.bezierCurveTo(x - size, y - size, x - size * 2, y + size / 2, x, y + size * 2);
  ctx.bezierCurveTo(x + size * 2, y + size / 2, x + size, y - size, x, y);
  ctx.fill();
  ctx.restore();
}

// ---------- HOJAS ----------
function generarHoja() {
  const cx = 210;
  const cy = 220;
  const ang = Math.random() * Math.PI * 2;
  const r = Math.random() ** 0.5 * 180;

  hojas.push({
    x: cx + Math.cos(ang) * r * 0.85,
    y: cy + Math.sin(ang) * r,
    size: 5 + Math.random() * 4,
    color: colores[Math.floor(Math.random() * colores.length)]
  });
}

// ---------- TRONCO ----------
function dibujarTronco() {
  ctx.fillStyle = "#8d5524";
  ctx.beginPath();
  ctx.moveTo(190, 520);
  ctx.lineTo(230, 520);
  ctx.lineTo(215, 300);
  ctx.lineTo(205, 300);
  ctx.closePath();
  ctx.fill();
}

// ---------- SUELO ----------
function dibujarSuelo() {
  ctx.strokeStyle = "#cfa5a5";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(40, 525);
  ctx.lineTo(380, 525);
  ctx.stroke();
}

// ---------- ANIMACIÓN ----------
function animar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  dibujarSuelo();
  dibujarTronco();

  hojas.forEach(h => dibujarCorazon(h.x, h.y, h.size, h.color));

  if (hojas.length < maxHojas) generarHoja();

  if (hojas.length > 80 && Math.random() < 0.08) {
    const h = hojas[Math.floor(Math.random() * hojas.length)];
    cayendo.push({ ...h, vel: 0.6 + Math.random(), alpha: 1 });
  }

  cayendo.forEach(c => {
    c.y += c.vel;
    c.alpha -= 0.003;
    dibujarCorazon(c.x, c.y, c.size, c.color, c.alpha);
  });

  cayendo = cayendo.filter(c => c.alpha > 0);

  requestAnimationFrame(animar);
}

function mostrarModal() {
  document.getElementById("modal").classList.remove("oculto");
}

function cerrarModal() {
  document.getElementById("modal").classList.add("oculto");
}


// ---------- INICIO ----------
escribirTexto();
animar();
