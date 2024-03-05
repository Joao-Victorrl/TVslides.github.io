document.addEventListener("DOMContentLoaded", function() {
    let currentSlide = 0;
    let autoSlideInterval; // Variável para armazenar o intervalo da troca automática de slides
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
  
    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
      });
      // Se o slide atual for o último e for um vídeo, reproduza-o
      if (index === totalSlides - 1 && slides[index].querySelector('video')) {
        const video = slides[index].querySelector('video');
        video.play();
        // Defina um temporizador para pausar o vídeo após 30 segundos
        setTimeout(function() {
          video.pause();
          nextSlide(); // Avança para o próximo slide após 30 segundos
        }, 30000); // Tempo em milissegundos (30 segundos)
      }
    }
  
    function nextSlide() {
      currentSlide = (currentSlide + 1) % totalSlides;
      showSlide(currentSlide);
    }
  
    // Mostra a primeira imagem
    showSlide(currentSlide);
  
    // Intervalo para trocar de slide a cada 5 segundos (5000ms)
    autoSlideInterval = setInterval(nextSlide, 5000);
  
    // Pausar a troca automática de slides enquanto o vídeo estiver sendo reproduzido
    document.querySelectorAll('.slide video').forEach(video => {
      video.addEventListener('play', function() {
        clearInterval(autoSlideInterval);
      });
      video.addEventListener('pause', function() {
        autoSlideInterval = setInterval(nextSlide, 5000);
      });
    });
  });
  