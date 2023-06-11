import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient) { }

  public saveInvoice(data:any):Observable<any>{
    // let url =this.baseUrl+"customer/create";
    return this.http.post("http://localhost:8000/api/v1/customerinvoiceheaders/member/create",data);
  }
}
