import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlowbiteService } from './core/services/flowbite/flowbite.service';
import { CartStore } from './features/cart/stores/cart.store';

import { LoadingComponent } from './shared/components/loading/loading.component';
import { ToastContainerComponent } from './shared/components/toast-container/toast-container.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoadingComponent, ToastContainerComponent],
  template: `
    <app-loading></app-loading>
    <app-toast-container></app-toast-container>
    <router-outlet></router-outlet>
  `,
  styleUrl: './app.css',
})
export class App {
  private readonly flowbiteService = inject(FlowbiteService);
  private readonly cartStore = inject(CartStore);

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      flowbite.initFlowbite();
    });
    this.cartStore.load();
  }
}
