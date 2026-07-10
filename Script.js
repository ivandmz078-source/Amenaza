// Cuenta regresiva del detonador de confesiones
const TIEMPO_TOTAL = 5;
let tiempoRestante = TIEMPO_TOTAL;
let intervalo;

const numero = document.getElementById('numero');
const bomba = document.getElementById('bomba');
const wrap = document.getElementById('wrap');
const pantallaCuenta = document.getElementById('pantalla-cuenta');
const pantallaExplosion = document.getElementById('pantalla-explosion');
const pantallaConfesion = document.getElementById('pantalla-confesion');
const btnReinicio = document.getElementById('btn-reinicio');

function actualizarEstado() {
  numero.classList.remove('amarillo', 'rojo');
  bomba.classList.remove('urgente');

  if (tiempoRestante <= 1) {
    numero.classList.add('rojo');
    bomba.classList.add('urgente');
  } else if (tiempoRestante <= 3) {
    numero.classList.add('amarillo');
  }
}

function tick() {
  numero.textContent = tiempoRestante;
  actualizarEstado();

  if (tiempoRestante === 0) {
    clearInterval(intervalo);
    setTimeout(explotar, 550);
  }
}

function explotar() {
  pantallaCuenta.classList.add('oculto');
  pantallaExplosion.classList.remove('oculto');
  wrap.classList.add('temblor');

  setTimeout(() => {
    wrap.classList.remove('temblor');
    pantallaExplosion.classList.add('oculto');
    pantallaConfesion.classList.remove('oculto');
  }, 1200);
}

function iniciarCuenta() {
  clearInterval(intervalo);
  tiempoRestante = TIEMPO_TOTAL;

  pantallaCuenta.classList.remove('oculto');
  pantallaExplosion.classList.add('oculto');
  pantallaConfesion.classList.add('oculto');

  tick();
  intervalo = setInterval(() => {
    tiempoRestante--;
    tick();
  }, 1000);
}

btnReinicio.addEventListener('click', iniciarCuenta);

iniciarCuenta();
