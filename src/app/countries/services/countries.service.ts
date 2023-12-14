import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';
  constructor(private http: HttpClient){}

  private getCountriesRequest(url: string): Observable<Country[]>{
    return this.http.get<Country[]>(url).pipe(
      catchError(() => of([])),
      //delay(2000)
    );
  }

  busquedaPorCapital(valorBusqueda: string): Observable<Country[]>{
    const url = `${this.apiUrl}/capital/${valorBusqueda}`;
    return this.getCountriesRequest(url);
  }

  busquedaPorPais(valorBusqueda: string): Observable<Country[]>{
    const url = `${this.apiUrl}/name/${valorBusqueda}`;
    return this.getCountriesRequest(url);
  }

  busquedaPorRegion(valorBusqueda: string): Observable<Country[]>{
    const url = `${this.apiUrl}/region/${valorBusqueda}`;
    return this.getCountriesRequest(url);
  }

  buscarPaisPorAlphaCode(id: string): Observable<Country | null >{
    const url = `${this.apiUrl}/alpha/${id}`;
    return this.http.get<Country[]>(url)
      .pipe(
        map(countries => countries.length>0 ? countries[0] : null),
        catchError(() => of(null))
      );
  }

}
