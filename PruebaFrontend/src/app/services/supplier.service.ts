import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Supplier } from '../models/Supplier';
import { Observable, throwError  } from 'rxjs';
import { EntityResult } from '../models/EntityResult';
import { ErrorResponse } from '../models/ErrorRespons';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  serverPath: string="https://localhost:44356/api/Supplier";

  constructor(private http:HttpClient) { }

  saveSupplier(supplier:Supplier){
    return this.http.post<Supplier>(this.serverPath,supplier);
  }

  getSuppliers(){
    return this.http.get<Supplier[]>(this.serverPath)
  }

  getSupplier(Id:number){
    return this.http.get<Supplier>(this.serverPath+"/" + Id.toString());
  }

  updateSupplier(supplier: Supplier) {
    return this.http.put<Supplier>(this.serverPath +"/" + supplier.Id.toString(), supplier);
  }

  deleteSupplier(Id: number) {
    return this.http.delete(this.serverPath+"/" + Id.toString());
  }

  screningEntityResolut(Id: number): Observable<EntityResult | ErrorResponse> {
    return this.http
      .get<EntityResult>('https://localhost:44356/api/Supplier/screening/' + Id.toString())
      .pipe(
        catchError((error) => {
          const errorResponse: ErrorResponse = {
            Error: 'Hubo un error en la solicitud',
            Success: false,
          };
          return throwError(errorResponse);
        })
      );
  }
}
