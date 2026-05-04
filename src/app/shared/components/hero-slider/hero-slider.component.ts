import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-hero-slider',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <section class="relative w-full h-[85vh] min-h-[600px] overflow-hidden bg-primary">
      <swiper-container 
        [loop]="true" 
        [pagination]="{ clickable: true }" 
        [navigation]="true"
        [autoplay]="{ delay: 6000, disableOnInteraction: false }"
        class="h-full w-full"
      >
        <swiper-slide *ngFor="let slide of slides">
          <div class="relative h-full w-full group">
            <!-- Background Image with Parallax-like effect -->
            <img [src]="slide.image" [alt]="slide.title" class="absolute inset-0 w-full h-full object-cover transition-transform duration-[10s] ease-linear group-hover:scale-110">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            
            <!-- Content Container -->
            <div class="relative h-full container-app flex flex-col justify-center items-start text-white">
              <div class="max-w-3xl space-y-6 animate-reveal">
                <span class="inline-block text-accent uppercase tracking-[0.4em] text-xs font-bold mb-2">
                  {{ slide.subtitle }}
                </span>
                
                <h1 class="text-5xl md:text-8xl font-bold leading-[0.9] tracking-tighter text-balance">
                  {{ slide.title }}
                </h1>
                
                <p class="text-lg md:text-xl text-white/70 max-w-xl font-light leading-relaxed text-balance">
                  {{ slide.description }}
                </p>
                
                <div class="flex flex-wrap gap-4 pt-4">
                  <button class="btn-primary">
                    Shop Now
                  </button>
                  <button class="px-8 py-3.5 border border-white/30 rounded-full text-sm font-semibold backdrop-blur-md hover:bg-white hover:text-primary transition-smooth">
                    View Lookbook
                  </button>
                </div>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper-container>
    </section>
  `,
  styles: [`
    swiper-container {
      --swiper-navigation-color: #FFFFFF;
      --swiper-pagination-color: #C5A059;
      --swiper-pagination-bullet-inactive-color: rgba(255, 255, 255, 0.5);
      --swiper-pagination-bullet-size: 8px;
      --swiper-pagination-bullet-horizontal-gap: 6px;
    }
    
    swiper-container::part(button-prev),
    swiper-container::part(button-next) {
      width: 48px;
      height: 48px;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border-radius: 50%;
      border: 1px solid rgba(255, 255, 255, 0.2);
      transition: all 0.3s ease;
    }

    swiper-container::part(button-prev):hover,
    swiper-container::part(button-next):hover {
      background: rgba(255, 255, 255, 0.2);
      transform: scale(1.1);
    }

    swiper-container::part(button-prev)::after,
    swiper-container::part(button-next)::after {
      font-size: 18px;
      font-weight: bold;
    }
  `]
})
export class HeroSliderComponent implements OnInit {
  slides = [
    {
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop',
      subtitle: 'New Arrival 2026',
      title: 'Art of Minimalist Fashion',
      description: 'Discover the latest collection of premium essentials designed for the modern individual.'
    },
    {
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop',
      subtitle: 'Spring Summer',
      title: 'Timeless Elegance Redefined',
      description: 'Experience the perfect blend of luxury and comfort with our handcrafted pieces.'
    },
    {
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop',
      subtitle: 'Exclusive Collection',
      title: 'Modern Luxury For You',
      description: 'Crafted with the finest materials and an eye for unparalleled detail.'
    }
  ];

  ngOnInit() {}
}
