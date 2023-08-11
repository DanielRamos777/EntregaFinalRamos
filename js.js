document.addEventListener('DOMContentLoaded', () => { 
  mostrarCarrito(); 
}); 

function obtenerCarritoUsuario() { 
  const carritoUsuario = localStorage.getItem('carritoUsuario'); 
  return carritoUsuario ? JSON.parse(carritoUsuario) : []; 
} 

function guardarCarritoUsuario(carritoUsuario) { 
  localStorage.setItem('carritoUsuario', JSON.stringify(carritoUsuario)); 
} 


function agregarAlCarrito(nombre, precio) { 
  const carritoUsuario = obtenerCarritoUsuario(); 
  carritoUsuario.push({ nombre, precio }); 
  guardarCarritoUsuario(carritoUsuario); 
  mostrarCarrito(); 
} 

function eliminarDelCarrito(index) { 
  const carritoUsuario = obtenerCarritoUsuario(); 
  carritoUsuario.splice(index, 1); 
  guardarCarritoUsuario(carritoUsuario); 
  mostrarCarrito(); 
} 

function mostrarCarrito() { 
  const carritoUsuario = obtenerCarritoUsuario(); 
  renderizarCarrito(carritoUsuario); 
} 

function renderizarCarrito(carritoUsuario) { 
  const listaCarrito = document.getElementById("lista-carrito"); 
  listaCarrito.innerHTML = ""; 

  carritoUsuario.forEach((producto, index) => { 
    const itemCarrito = document.createElement("li"); 
    itemCarrito.textContent = `${producto.nombre} - $${producto.precio}`; 

    const botonEliminar = document.createElement("button"); 
    botonEliminar.textContent = "Eliminar"; 
    botonEliminar.addEventListener("click", () => { 
      eliminarDelCarrito(index); 
    }); 

    itemCarrito.appendChild(botonEliminar); 
    listaCarrito.appendChild(itemCarrito); 
  }); 

  const totalCarrito = document.getElementById("total-carrito"); 
  totalCarrito.textContent = `Total: $${calcularTotalCarrito(carritoUsuario)}`; 
} 

function calcularTotalCarrito(carritoUsuario) { 
  return carritoUsuario.reduce((total, producto) => total + producto.precio, 0); 
}




const loginForm = document.getElementById('login-form'); 
const registerForm = document.getElementById('register-form'); 

loginForm.addEventListener('submit', (e) => { 
  e.preventDefault(); 

  const username = document.getElementById('login-username').value; 
  const password = document.getElementById('login-password').value; 

  if (username && password) { 
    const usuariosRegistrados = obtenerUsuariosRegistrados(); 
    const usuarioEncontrado = usuariosRegistrados.find((usuario) => usuario.username === username && usuario.password === password); 

    if (usuarioEncontrado) { 
      swal({ 
        title: '¡Has iniciado sesión!', 
        icon: 'success', 
        timer: 1000, 
        button: false, 
      }); 
      localStorage.setItem('loggedIn', 'true'); 
      localStorage.setItem('currentUsername', username); 
      setTimeout(function() { 
        window.location.href = 'inicio.html'; 
      }, 1500); 
    } else { 
      swal({ 
        title: '¡Nombre de usuario o contraseña incorrectos!', 
        icon: 'error', 
        timer: 2000, 
        button: false, 
      }); 
    } 
  } else { 
    alert('Por favor, completa todos los campos'); 
  } 
}); 

registerForm.addEventListener('submit', (e) => { 
  e.preventDefault(); 

  const username = document.getElementById('register-username').value; 
  const password = document.getElementById('register-password').value; 

  if (username && password) { 
    registrarUsuario(username, password); 
  } else { 
    alert('Por favor, completa todos los campos'); 
  } 
}); 

const welcomeMessage = document.getElementById('welcome-message'); 

if (localStorage.getItem('loggedIn') === 'true') { 
  const username = localStorage.getItem('currentUsername'); 
  welcomeMessage.textContent = `¡Bienvenido, ${username}!`; 
} else { 
  welcomeMessage.textContent = 'Inicia sesión o crea una cuenta'; 
}

const logoutButton = document.getElementById('logout-button'); 

logoutButton.addEventListener('click', () => { 
  localStorage.removeItem('currentUsername'); 
  localStorage.removeItem('loggedIn'); 
  swal({ 
    title: '¡Sesion Cerrada!', 
    timer: 1250, 
    button: false, 
  }); 
  setTimeout(function() { 
    window.location.href = 'inicio.html'; 
  }, 2000); 
}); 


const usernameHeading = document.getElementById('username-heading'); 

if (localStorage.getItem('loggedIn') === 'true') { 
  const username = localStorage.getItem('currentUsername'); 
  usernameHeading.textContent = username; 
} else { 
  usernameHeading.textContent = 'Inicia sesión o crea una cuenta'; 
} 

function obtenerUsuariosRegistrados() { 
  const usuariosRegistrados = localStorage.getItem('usuariosRegistrados'); 
  return usuariosRegistrados ? JSON.parse(usuariosRegistrados) : []; 
} 

function guardarUsuariosRegistrados(usuariosRegistrados) { 
  localStorage.setItem('usuariosRegistrados', JSON.stringify(usuariosRegistrados)); 
} 

function registrarUsuario(username, password) { 
  const usuariosRegistrados = obtenerUsuariosRegistrados(); 
  usuariosRegistrados.push({ username, password }); 
  guardarUsuariosRegistrados(usuariosRegistrados); 
  swal({ 
    title: '¡Registro exitoso!' + ' ' + username, 
    text:  '¡Inicia sesión!', 
    icon: 'success', 
    timer: 2000, 
    button: false, 
  }); 
} 
