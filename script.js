const canvas = document.getElementById('waves');
const ctx = canvas.getContext('2d');

// Configurações do canvas
resizeCanvas();

// Configurações das ondas
const waves = [
  { amplitude: 30, frequency: 0.01, speed: 0.05, color: '#0047AB' }, // Azul escuro
  { amplitude: 20, frequency: 0.008, speed: 0.03, color: '#007FFF' }, // Azul médio
  { amplitude: 25, frequency: 0.012, speed: 0.07, color: '#1E90FF' } // Azul claro
];

// Imagem do barco
const boatImage = new Image();
boatImage.src = 'https://th.bing.com/th/id/R.99044111a84f74aa3b9522bf4f58cba8?rik=07GYaw82PamEjw&pid=ImgRaw&r=0'; // Caminho da imagem do barco

// Configurações do barco
const boat = {
  x: 0,
  y: canvas.height / 2, // Posição inicial vertical do barco
  width: 100,
  height: 150,
  // Propriedades para controlar o movimento vertical do barco
  startY: canvas.height / 2 - 100,
  amplitude: 20, // Amplitude do movimento vertical
  frequency: 0.005, // Frequência do movimento vertical
  phase: 0 // Fase do movimento vertical
};

// Função para ajustar o tamanho do canvas
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = 200; // Altura ajustada para dispositivos móveis
}

// Função para desenhar as ondas e o barco
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Desenhar as ondas
  for (const wave of waves) {
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);

    for (let i = 0; i < canvas.width; i++) {
      ctx.lineTo(i, wave.amplitude * Math.sin(i * wave.frequency + wave.speed) + canvas.height / 2);
    }

    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.closePath();

    ctx.fillStyle = wave.color;
    ctx.fill();

    wave.speed += 0.01; 
  }

  // Desenhar o barco usando uma imagem
  boat.y = boat.startY + boat.amplitude * Math.sin(boat.phase);
  ctx.drawImage(boatImage, boat.x, boat.y, boat.width, boat.height);

  // Mover o barco para a direita
  boat.x += 1;

  // Se o barco sair do canvas, reposicione-o para a esquerda
  if (boat.x > canvas.width) {
    boat.x = -boat.width;
  }

  boat.phase += boat.frequency; // Atualizar a fase do movimento vertical do barco

  requestAnimationFrame(draw);
}

// Iniciar a animação
draw();

// Adicionar um listener para ajustar o tamanho do canvas ao redimensionar a janela
window.addEventListener('resize', resizeCanvas);

// Adicionar um listener para detectar cliques no canvas
canvas.addEventListener('click', function(event) {
  // Obter as coordenadas do clique em relação ao canvas
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  // Verificar se o clique ocorreu dentro dos limites do barco
  if (mouseX > boat.x && mouseX < boat.x + boat.width && 
      mouseY > boat.y && mouseY < boat.y + boat.height) {
    // Se sim, abrir o modal com uma mensagem aleatória
    openModal(getRandomMessage());
  }
});






// Função para abrir o modal com uma mensagem, imagem e cor específicas
function openModal(message, imagePath, colorClass) {
  const modal = document.getElementById('myModal');
  const modalContent = document.querySelector('.modal-content');
  const modalMessage = document.getElementById('modal-message');
  const modalImage = document.getElementById('modal-image');
  
  modalMessage.innerText = message;
  modalImage.src = imagePath;

  
  // Remover todas as classes de cor existentes e adicionar a classe de cor específica
  modalContent.classList.remove('message-blue', 'message-green', 'message-red', 'message-pink', 'message-yellow', 'message-orange', 'message-brown', 'message-super', 'message-white', 'message-blue', 'message-purple' );
  modalContent.classList.add(colorClass);

  modal.style.display = 'block';


  // Adiciona a classe "show" após um pequeno atraso para permitir a animação de transição
  setTimeout(function() {
    modal.classList.add('show');
    modalContent.classList.add('show');
  }, 50); // Tempo de espera em milissegundos

  // Adicionar um listener para fechar o modal quando o usuário clicar no botão de fechar
  const closeButton = document.getElementsByClassName('close')[0];
  closeButton.onclick = function() {
    modal.style.display = 'none';
  }

  // Fechar o modal se o usuário clicar fora da área do modal
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.classList.remove('show');
      modalContent.classList.remove('show');
      setTimeout(function() {
        modal.style.display = 'none';
      }, 300); // Tempo de espera para coincidir com a duração da transição (300ms)
    }
  }
}

// Função para gerar uma mensagem aleatória, sua imagem correspondente e cor específica
function getRandomMessageAndImage() {
  const messages = [
    { text: "Uma festa sem boa comida não é festa de verdade! Deixe comigo, vou preparar um banquete que fará todos se apaixonarem!", image: "https://th.bing.com/th/id/OIP.9H4ENyoWqJiHLn8CXwaBewAAAA?rs=1&pid=ImgDetMain", colorClass: "message-yellow" },
    { text: "Festa? Hm, não sou muito de festas, mas estarei lá para garantir que todos estejam seguros e ninguém faça bobagem.", image: "https://64.media.tumblr.com/82dd4c7bbb495122c8a8be359a1a65ce/71196a356132dfee-d2/s1280x1920/18b10ed359a0080dc913eadcc39e66ee87385211.jpg", colorClass: "message-green" },
    { text: "Festa? Claro, eu estou dentro! Quem comer mais será o Rei dos Piratas!", image: "https://wallpaperaccess.com/full/4726499.jpg", colorClass: "message-red" },
    { text: "Festas significam diversão e oportunidades para ganhar mais dinheiro! Vamos lá, pessoal, vamos fazer desta a melhor festa dos mares!", image: "https://i.pinimg.com/originals/e1/6c/31/e16c311245f0e7fee0a6962afaefdfc9.jpg", colorClass: "message-orange" },
    { text: "Uma festa? É uma chance perfeita para contar minhas histórias mais incríveis e impressionar a todos!", image: "https://th.bing.com/th/id/OIP.mDPY3gwhgLIZRe40Woe0oQAAAA?rs=1&pid=ImgDetMain", colorClass: "message-brown" },
    { text: "Festas são ótimas para experimentar doces deliciosos e fazer novos amigos! Estou super animado!", image: "https://i.pinimg.com/originals/c0/2b/62/c02b629721224f3b386b62aadb126807.jpg", colorClass: "message-pink" },
    { text: "Festa? É hora de ligar o som alto e dançar até os parafusos se soltarem! SUUUUUUUUUUPER!", image: "https://th.bing.com/th/id/R.47148debdb9b9e45ebaced82859f07d0?rik=7imngV%2fB7zOeZg&riu=http%3a%2f%2fstatic1.wikia.nocookie.net%2f__cb20130205203039%2fonepiece-cat%2fca%2fimages%2fb%2fbf%2fFranky_anime_pre.png&ehk=55R9lE9E7iR0wmmnAN6%2fYwC6ReSnSI2Cj3ioYlKO4hQ%3d&risl=&pid=ImgRaw&r=0", colorClass: "message-super" },
    { text: "Uma festa? Estou morrendo de ansiedade, mas espera..., eu já estou morto! YOHOHOHOHO!", image: "https://th.bing.com/th/id/R.62f855f5aa7a485860f7320f29d73eb8?rik=%2b2nUO2VVTC1Xlg&pid=ImgRaw&r=0", colorClass: "message-white" },
    { text: "Estou ansiosa para observar e aprender com os outros convidados.", image: "https://i.pinimg.com/736x/7f/c0/8c/7fc08c65646aced80aa37ed3957ddf1d.jpg", colorClass: "message-purple" },
    { text: "Uma festa pode ser uma chance de fortalecer laços e construir alianças. Vamos celebrar a vida juntos!", image: "https://i.pinimg.com/736x/23/96/43/239643b6fcd730c95a5019fdc642b5c6.jpg", colorClass: "message-blue" },
    
  ];

  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
}

// Adicionar um listener para detectar cliques no canvas
canvas.addEventListener('click', function(event) {
  // Obter as coordenadas do clique em relação ao canvas
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  // Verificar se o clique ocorreu dentro dos limites do barco
  if (mouseX > boat.x && mouseX < boat.x + boat.width && 
      mouseY > boat.y && mouseY < boat.y + boat.height) {
    // Se sim, abrir o modal com uma mensagem, imagem e cor aleatórias
    const { text, image, colorClass } = getRandomMessageAndImage();
    openModal(text, image, colorClass);
  }
});


// Botão para abrir o modal de Data e Local
document.getElementById("data-local-button").onclick = function() {
  document.getElementById("modal-data-local").style.display = "block";
}

// Botão para abrir o modal de Sugestão de Presentes
document.getElementById("sugestao-presentes-button").onclick = function() {
  document.getElementById("modal-sugestao-presentes").style.display = "block";
}

// Adicionar funcionalidade de fechar para o botão de fechar (X) em cada modal
var closeButtons = document.querySelectorAll(".fechar");
for (var i = 0; i < closeButtons.length; i++) {
  closeButtons[i].onclick = function() {
    var modal = this.parentElement.parentElement;
    modal.style.display = "none";
  }
}

// Fechar modais ao clicar fora do conteúdo do modal
window.onclick = function(event) {
  var modals = document.getElementsByClassName("modalbutton");
  for (var i = 0; i < modals.length; i++) {
    if (event.target == modals[i]) {
      modals[i].style.display = "none";
    }
  }
}

// Adicionar funcionalidade de fechar para o botão de fechar (X) em cada modal
var closeButton = document.querySelectorAll(".fechar");
for (var i = 0; i < closeButton.length; i++) {
  closeButton[i].onclick = function() {
    var modal = this.parentElement.parentElement;
    modal.style.display = "none";
  }
}