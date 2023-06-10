import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) {
  }

  public findAll(): Observable<any> {
    return this.http.get('http://localhost:8000/api/v1/paytypies/member/list');
  }
}
