// Inicializando variáveis globais
let snake = [];           // Array para armazenar os segmentos da cobra
let positionX = 10;       // Posição inicial da cobra no eixo X
let positionY = 10;       // Posição inicial da cobra no eixo Y
let foodX = 15;           // Posição inicial da comida no eixo X
let foodY = 15;           // Posição inicial da comida no eixo Y
let velX = 0;             // Velocidade inicial da cobra no eixo X
let velY = 0;             // Velocidade inicial da cobra no eixo Y
let grid = 20;            // Tamanho da grade (célula)
let tam = 3;              // Tamanho inicial da cobra
let gameOver = false;     // Flag para verificar se o jogo terminou
let frameRateValue = 10;  // Taxa de quadros (fps) inicial

// Configuração inicial
function setup() {
  createCanvas(400, 400);  // Criar o canvas de 400x400 pixels
  
  // Criando botões de dificuldade e de reinício
  let easyButton = createButton('Fácil');
  easyButton.position(10, 420);
  easyButton.mousePressed(() => setFrameRateValue(5)); // Ajustar para fácil
  
  let mediumButton = createButton('Médio');
  mediumButton.position(70, 420);
  mediumButton.mousePressed(() => setFrameRateValue(10)); // Ajustar para médio
  
  let hardButton = createButton('Difícil');
  hardButton.position(140, 420);
  hardButton.mousePressed(() => setFrameRateValue(15)); // Ajustar para difícil
  
  let restartButton = createButton('Reiniciar');
  restartButton.position(210, 420);
  restartButton.mousePressed(resetGame); // Reiniciar o jogo
}

// Função para ajustar a taxa de quadros e reiniciar o jogo
function setFrameRateValue(value) {
  frameRateValue = value;
  frameRate(frameRateValue); // Ajusta a taxa de quadros
  resetGame(); // Reinicia o jogo
}

// Função para reiniciar o jogo
function resetGame() {
  snake = []; // Limpa a cobra
  positionX = 10;
  positionY = 10;
  foodX = 15;
  foodY = 15;
  velX = 0;
  velY = 0;
  tam = 3;
  gameOver = false; // Reinicia o estado do jogo
}

// Loop principal do jogo
function draw() {
  if (!gameOver) {  // Se o jogo não terminou
    background(41, 128, 185);  // Define a cor de fundo
    
    // Atualiza a taxa de quadros
    frameRate(frameRateValue);
    
    // Movimentação da cobra
    positionX += velX;
    positionY += velY;

    // Verificação de colisão com as paredes
    if (positionX < 0 || positionX >= width / grid || positionY < 0 || positionY >= height / grid) {
      gameOver = true;
      return;
    }

    // Desenha e atualiza a cobra
    fill(0, 241, 2);
    for (let i = 0; i < snake.length; i++) {
      rect(snake[i].x * grid, snake[i].y * grid, grid, grid);
      if (snake[i].x === positionX && snake[i].y === positionY) {
        tam = 3;  // Reinicia o tamanho se a cobra colidir consigo mesma
      }
    }

    // Atualiza a posição da cobra
    snake.push({ x: positionX, y: positionY });

    // Remove o segmento mais antigo da cobra
    while (snake.length > tam) {
      snake.shift();
    }

    // Desenha a comida
    fill(241, 196, 15);
    rect(foodX * grid, foodY * grid, grid, grid);

    // Verifica se a cobra comeu a comida
    if (positionX === foodX && positionY === foodY) {
      tam++;  // Aumenta o tamanho da cobra
      foodX = floor(random(grid)); // Nova posição aleatória para a comida no eixo X
      foodY = floor(random(grid)); // Nova posição aleatória para a comida no eixo Y
    }
  } else {
    // O jogo termina aqui
    background(0);
    fill(255);
    textSize(32);
    textAlign(CENTER);
    text("Game Over", width / 2, height / 2);  // Mostra a mensagem de Game Over
  }
}

// Captura eventos do teclado para controlar a cobra
function keyPressed() {
  switch (keyCode) {
    case RIGHT_ARROW:
      if (velX === 0) {  // Evita mudança de direção quando a cobra está se movendo verticalmente
        velX = 1;
        velY = 0;
      }
      break;
    case LEFT_ARROW:
      if (velX === 0) {  // Evita mudança de direção quando a cobra está se movendo verticalmente
        velX = -1;
        velY = 0;
      }
      break;
    case UP_ARROW:
      if (velY === 0) {  // Evita mudança de direção quando a cobra está se movendo horizontalmente
        velY = -1;
        velX = 0;
      }
      break;
    case DOWN_ARROW:
      if (velY === 0) {  // Evita mudança de direção quando a cobra está se movendo horizontalmente
        velY = 1;
        velX = 0;
      }
      break;
  }
}
