import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from '../../../core/services/utilities/base-http.service';
import { API_ENDPOINTS } from '../../../core/constants/endpoints';
import { BrandResponse, SingleBrandResponse } from '../brands.interface';

/**
 * ── ARCHITECTURE: BRAND API LAYER ─────────────────────────────────────────
 * Exclusive responsibility for network communication with Brand endpoints.
 */
@Injectable({
  providedIn: 'root'
})
export class BrandApiService extends BaseHttpService {

  getAllBrands(): Observable<BrandResponse> {
    return this.get<BrandResponse>(API_ENDPOINTS.BRANDS.BASE);
  }

  getBrandById(id: string): Observable<SingleBrandResponse> {
    return this.get<SingleBrandResponse>(API_ENDPOINTS.BRANDS.BY_ID(id));
  }
}
