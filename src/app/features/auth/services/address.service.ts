import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from '../../../core/services/utilities/base-http.service';
import { API_ENDPOINTS } from '../../../core/constants/endpoints';

export interface Address {
  _id?: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}

@Injectable({ providedIn: 'root' })
export class AddressApiService extends BaseHttpService {
  
  getAddresses(): Observable<{ status: string, results: number, data: Address[] }> {
    return this.get(API_ENDPOINTS.USER.ADDRESSES);
  }

  addAddress(address: Address): Observable<any> {
    return this.post(API_ENDPOINTS.USER.ADDRESSES, address);
  }

  removeAddress(addressId: string): Observable<any> {
    return this.delete(`${API_ENDPOINTS.USER.ADDRESSES}/${addressId}`);
  }

  getAddressById(addressId: string): Observable<{ status: string, data: Address }> {
    return this.get(`${API_ENDPOINTS.USER.ADDRESSES}/${addressId}`);
  }
}
