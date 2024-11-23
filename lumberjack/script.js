// DOM
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const nextPage = urlParams.get('next');

const canvas = document.getElementById('lumberjackGame');
const ctx = canvas.getContext('2d');
const progressBar = document.querySelector('.progress');

// Cargar imágenes
const images = {
    playerLeft: new Image(),
    playerRight: new Image(),
    branchLeft: new Image(),
    branchRight: new Image(),
    trunk: new Image(),
};
  
  // Establecer las fuentes de las imágenes
images.playerLeft.src = 'imagenes/gato-left.png'; 
images.playerRight.src = 'imagenes/gato-right.png'; 
images.branchLeft.src = 'imagenes/pepino-left.png'; 
images.branchRight.src = 'imagenes/pepino-right.png'; 
images.trunk.src = 'imagenes/trunk.png'; 

const hit1 = new Audio('sonidos/hit1.mp3');
const hit2 = new Audio('sonidos/hit2.mp3');
const gameover = new Audio('sonidos/gameover.mp3');


// Variables globales
let progress = 0;
let gameOver = false;
let tree = []; // Ramas del árbol
const lumberjack = { side: 'left' }; 
const treeSize = 9; 
const branchHeight = 50; 
const progressIncrement = 10; 


// Iniciamos el árbol
function initTree() {
  tree = [];
  for (let i = 0; i < treeSize; i++) {
    tree.push(Math.random() > 0.5 ? 'left' : 'right');
  }
}

// DIBUJAR JUEGO
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // Dibujar el árbol
    for (let i = 0; i < tree.length; i++) {
      const y = i * branchHeight;
  
      // tronco
      ctx.drawImage(images.trunk, canvas.width / 2 - 50, y, 100, branchHeight);
  
      // ramas
      if (tree[i] === 'left') {
        ctx.drawImage(images.branchLeft, canvas.width / 2 - 150, y, 100, branchHeight);
      } else {
        ctx.drawImage(images.branchRight, canvas.width / 2 + 50, y, 100, branchHeight);
      }
    }
  
    // jugador
    if (lumberjack.side === 'left') {
      ctx.drawImage(images.playerLeft, canvas.width / 2 - 150, canvas.height - branchHeight, 100, branchHeight);
    } else {
      ctx.drawImage(images.playerRight, canvas.width / 2 + 50, canvas.height - branchHeight, 100, branchHeight);
    }
  }

//barra de progreso
function updateProgressBar() {
  progressBar.style.width = `${progress}%`;
  if (progress >= 100) {

    window.location.href = nextPage ? `${nextPage}` : '/';
  }
}

//movimiento del jugador
function movePlayer(direction) {
  const sound = Math.random() > 0.5 ? hit1 : hit2;
  sound.play();

  if (gameOver) return;

  const nextBranch = tree.pop(); 

  // si perdio
  if (direction === nextBranch) {
    gameOver = true;
    gameover.play();

    canvas.style.border = '8px solid rgba(255, 0, 0, 0.5)';
    canvas.style.transform = 'scale(1.2)';
    canvas.style.transition = 'transform 0.3s ease, background-color 0.3s';

    resetGame();
    return;
  }

  lumberjack.side = direction; 
  tree.unshift(Math.random() > 0.5 ? 'left' : 'right'); 
  progress += progressIncrement; 
  updateProgressBar(); 
  drawGame(); 
}

// Reiniciar el juego
function resetGame() {
  progress = 0;
  gameOver = false;
  initTree();
  updateProgressBar();
  drawGame();
  setTimeout(() => {
    canvas.style.transform = 'scale(1)';
    canvas.style.border = '3px solid white';
    canvas.style.transition = 'transform 0.3s ease';
  }, 100);
 


}

// Detectar teclas presionadas
const leftButton = document.getElementById("leftButton");
const rightButton = document.getElementById("rightButton");

window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    leftButton.classList.add("pressed"); 
    setTimeout(() => {
      leftButton.classList.remove("pressed"); 
    }, 200);
    movePlayer('left');
  } else if (e.key === 'ArrowRight') {
    rightButton.classList.add("pressed"); 
    setTimeout(() => {
      rightButton.classList.remove("pressed"); 
    }, 200);
    movePlayer('right');
  }
});

rightButton.addEventListener('click', () => {
 
    rightButton.classList.add("pressed"); 
    setTimeout(() => {
      rightButton.classList.remove("pressed"); 
    }, 200);
    movePlayer('right');

});

leftButton.addEventListener('click', () => {
 
  leftButton.classList.add("pressed"); 
  setTimeout(() => {
    leftButton.classList.remove("pressed"); 
  }, 200);
  movePlayer('left');

});



// Innicia el juego
function initGame() {
    initTree();
    resetGame();

}

// Iniciar el juego 
setTimeout(() => {
  const canvas = document.getElementById("lumberjackGame");
  canvas.style.display = "block";
  const progress_bar = document.querySelector(".progress-bar");
  progress_bar.style.display = "block";
  const controls = document.querySelector(".controls");
  controls.style.display = "flex";
  initGame();
}, 500);

