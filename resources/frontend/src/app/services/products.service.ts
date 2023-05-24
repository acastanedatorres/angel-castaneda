import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }

  get(): Observable<any> {
    return this.http.get(`${environment.apiUrl}productos`);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}productos/${id}`)
  }

  getTipoDeCambio(): Observable<any> {
    const headers = {
      "Access-Control-Allow-Origin" : "*",
      "Bmx-Token" : "bc11040602b0e554b09c5058618a12b1f19dd523d3516cf8d8caf4cfb2692f17",
      "Content-Type": "application/json",
      "dataType": "jsonp"
    }
    return this.http.jsonp(`https://www.banxico.org.mx/SieAPIRest/service/v1/series/SF43718/datos/2023-05-23/2023-05-23?token=bc11040602b0e554b09c5058618a12b1f19dd523d3516cf8d8caf4cfb2692f17`, 'callback')
  }
}
