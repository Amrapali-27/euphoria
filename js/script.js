
// Luxy Initializing
luxy.init({
  wrapper: "#luxy",
  targets: ".luxy-el",
  wrapperSpeed: 0.08,
});

AOS.init({
  duration: 1000,
  once: true
});

  
  // LOOKS SECTION SWIPER

  new Swiper('.looks-swiper', {
    slidesPerView: 1,
    loop: true,
    speed: 900,
    effect: "fade",
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






document.querySelectorAll('.marquee').forEach(marquee => {
  const track = marquee.querySelector('.marquee-track');

  marquee.addEventListener('mouseenter', () => {
    track.style.animationPlayState = 'paused';
  });

  marquee.addEventListener('mouseleave', () => {
    track.style.animationPlayState = 'running';
  });

  marquee.addEventListener('click', () => {
    track.style.animationPlayState = 'paused';

    // Resume after short delay (UX friendly)
    setTimeout(() => {
      track.style.animationPlayState = 'running';
    }, 400);
  });
});



//  PAGE LOADER

const loader = document.getElementById("pageLoader");

// Prevent scrolling while loader is visible
document.body.classList.add("loading");

window.addEventListener("load", function () {
  setTimeout(() => {
    loader.classList.add("hidden");
    document.body.classList.remove("loading");

    //Refresh AOS after loader disappears
    AOS.refreshHard();

  }, 4000);
});


// TITLE1 ZOOM
document.addEventListener("DOMContentLoaded", function () {

  gsap.registerPlugin(ScrollTrigger);

  gsap.to("#heroTitle", {
    scale: 1.5,
    ease: "none",
    scrollTrigger: {
      trigger: ".banner-section",
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });

  AOS.init({
    duration: 1000,
    once: true
  });

  // Fix for GSAP + AOS conflict
  ScrollTrigger.addEventListener("refresh", () => AOS.refresh());
  ScrollTrigger.refresh();

});


 const cursor = document.querySelector(".cursor");
      const cursorBorder = document.querySelector(".cursor-border");
      let pageX = 0;
      let pageY = 0;
      let cursorX = 0;
      let cursorY = 0;
      let newX = 0;
      let newY = 0;

      window.addEventListener("mousemove", (e) => {
        pageX = e.clientX;
        pageY = e.clientY;
      });

      function cursorMove() {
        cursorX += (pageX - cursorX) / 18;
        cursorY += (pageY - cursorY) / 18;
        newX += (pageX - newX) / 6;
        newY += (pageY - newY) / 6;
        cursorBorder.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
        cursor.style.transform = `translate(${newX}px, ${newY}px) translate(-50%, -50%)`;
        requestAnimationFrame(cursorMove);
      }

      cursorMove();







