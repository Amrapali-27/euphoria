// const navbarCollapsed = document.querySelector(".navbar-collapsed");
// const menu = document.querySelector(".menu");

// let isMenuOpen = false;

// menu.addEventListener("click", () => {
//   navbarCollapsed.classList.toggle("active");
//   menu.classList.toggle("animate");

//   if (isMenuOpen) {
//     document.documentElement.style.overflow = "auto";
//     document.body.style.overflow = "auto";
//     isMenuOpen = false;
//   } else {
//     document.documentElement.style.overflow = "hidden";
//     document.body.style.overflow = "hidden";
//     isMenuOpen = true;
//   }
// });


AOS.init({
    once: true,
    offset: 150,
    easing: 'ease-out-cubic'
  });

  window.addEventListener('load', () => {
    AOS.refresh();
  });


  // LOOKS SECTION SWIPER

  new Swiper('.looks-swiper', {
    slidesPerView: 1,
    loop: true,
    speed: 900,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    }
  });

  // ====================================
// PREVIOUS STANDOUTS CAROUSEL
// ====================================

class StandoutsCarousel {
  constructor() {
    this.track = document.getElementById('standoutsTrack');
    this.slides = Array.from(this.track.querySelectorAll('.standout-slide'));
    this.prevBtn = document.getElementById('prevStandout');
    this.nextBtn = document.getElementById('nextStandout');
    this.titleEl = document.getElementById('standoutTitle');
    this.seasonEl = document.getElementById('standoutSeason');
    
    this.currentIndex = 2; // Start with center slide (SKIN)
    this.isAnimating = false;
    
    this.init();
  }
  
  init() {
    // Set initial positions
    this.updatePositions();
    
    // Add event listeners
    this.prevBtn.addEventListener('click', () => this.navigate('prev'));
    this.nextBtn.addEventListener('click', () => this.navigate('next'));
    
    // Click on slide to center it
    this.slides.forEach((slide, index) => {
      slide.addEventListener('click', () => {
        if (!this.isAnimating && index !== this.currentIndex) {
          this.navigateTo(index);
        }
      });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.navigate('prev');
      if (e.key === 'ArrowRight') this.navigate('next');
    });
  }
  
  navigate(direction) {
    if (this.isAnimating) return;
    
    this.isAnimating = true;
    
    if (direction === 'next') {
      this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    } else {
      this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    }
    
    this.updatePositions();
    
    setTimeout(() => {
      this.isAnimating = false;
    }, 800);
  }
  
  navigateTo(targetIndex) {
    if (this.isAnimating) return;
    
    this.isAnimating = true;
    this.currentIndex = targetIndex;
    this.updatePositions();
    
    setTimeout(() => {
      this.isAnimating = false;
    }, 800);
  }
  
  updatePositions() {
    this.slides.forEach((slide, index) => {
      const position = this.getRelativePosition(index);
      
      // Remove all position classes
      slide.classList.remove('active');
      slide.removeAttribute('data-position');
      
      // Set position attribute
      if (position === 0) {
        slide.classList.add('active');
        slide.setAttribute('data-position', '0');
      } else if (position >= -2 && position <= 2) {
        slide.setAttribute('data-position', position.toString());
      } else if (position < -2) {
        slide.setAttribute('data-position', 'hidden-left');
      } else {
        slide.setAttribute('data-position', 'hidden-right');
      }
    });
    
    // Update meta text
    this.updateMeta();
  }
  
  getRelativePosition(index) {
    let position = index - this.currentIndex;
    
    // Handle circular positioning
    const halfLength = Math.floor(this.slides.length / 2);
    
    if (position > halfLength) {
      position -= this.slides.length;
    } else if (position < -halfLength) {
      position += this.slides.length;
    }
    
    return position;
  }
  
  updateMeta() {
    const activeSlide = this.slides[this.currentIndex];
    const title = activeSlide.getAttribute('data-title');
    const season = activeSlide.getAttribute('data-season');
    
    this.titleEl.textContent = title;
    this.seasonEl.textContent = season;
  }
}

// Initialize carousel when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new StandoutsCarousel();
});

