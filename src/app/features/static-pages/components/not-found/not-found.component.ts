import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface SuggestedCategory {
  name: string;
  imageAlt: string;
  image: string;
  route: string;
}

@Component({
  selector: 'app-not-found',
  imports: [FormsModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
})
export class NotFoundComponent {
  /** Bound to the search input via two-way binding */
  searchQuery = signal('');

  readonly suggestedCategories: SuggestedCategory[] = [
    {
      name: 'Furniture',
      imageAlt: 'Minimalist modernist wooden chair with clean lines against a soft neutral studio background',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjk_hJ8UM0BAA2W0NTE_-q4xW1VWB_8AdvFLZsnLPVRu1JPZYYtZjyxm0hzRLDfWzh1WzP7gVexhCtOrbtR0bq0RClWKpKxHI4gI8l3oo-Ey7xpN_YDy-hbyecvMQbDRvM06LrvMrXj4lfusdOo6sqJEEcIM9rL2PHcYShS76ivnffHp7Mp_3s0pkulLaX9-Fa_p-vgmJ05Ulyp7aD5hpuX5qNVom-_NoI2ciQcrIHMhzXgrybwZHXNOAJgeH3fWHSTNbcWJz5z2rx',
      route: '/products?category=furniture',
    },
    {
      name: 'Lighting',
      imageAlt: 'Architectural brass pendant lamp casting soft warm light in a minimalist white interior space',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZ3LQTkBjc54c0F_VhdnNyE-Z1CzyoIhaX5q49t4GXGLOseJQT3P6hyAUs1nNx5yjMxl5tKke4_hZqYZ5EstctfaMba5zpG0901p8VyS_tZrwnH_uVtTsoObP-2-1EMxFnefO2OWmtQjT4CV1lpa49wpmYbLv_NLVWkwYuvF5GEYTZrlSoi8MtGzdJ7QNzVg5Sr9znLAhOVRsxGnfJDD44eC_yN1B4EwnoMtVfjjdUTH3izwAumuqiTFjxCLbEll5-IFnqNqZqjVtZ',
      route: '/products?category=lighting',
    },
    {
      name: 'Accessories',
      imageAlt: 'Curated selection of artisan ceramic vases with matte texture on a stone pedestal',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCuzJoPrfICGnlMfvmKcGcZJa1UFXgVnsN_CFv2C5F5LOp4IbAh5Qlv4r32id_IWzW5jzicci-D4e2_OcYGeJ9fwb6ptNUgUul-EIa1YtKdHc3geywUham2qRY7IDhOhVl_9ly28crM8LN5lTk9KSm0aXUBUj7nqxKOXoHNpLpAX6-Vr2cTRREB1iSoweCtafgodNhiVA6z9QmLqk3H0FaNsF2VGvoMLV94UYXgABSHRNvQWZHffSZgQ1IsEp5L9rzBwTejsAyjeGSR',
      route: '/products?category=accessories',
    },
  ];

  constructor(private readonly router: Router) {}

  onSearch(): void {
    const query = this.searchQuery().trim();
    if (query) {
      this.router.navigate(['/products'], { queryParams: { q: query } });
    }
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }

  goToCatalog(): void {
    this.router.navigate(['/products']);
  }

  navigateToCategory(route: string): void {
    this.router.navigateByUrl(route);
  }

  onSearchInput(value: string): void {
    this.searchQuery.set(value);
  }
}
