import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { IcacheStore } from '../interfaces/cacheStore.interface';
import { Region } from '../interfaces/region.type';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';
  public cacheStore: IcacheStore ={
    byCapital:{
      valorBusqueda: '',
      paises: []
    },
    byCountry:{
      valorBusqueda: '',
      paises: []
    },
    byRegion:{
      region: '',
      paises: []
    },
  }

  constructor(private http: HttpClient){
    this.getLocalStorage();
  }

  private setLocalStorage(){
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }
  private getLocalStorage(){
    if(!localStorage.getItem('cacheStore')) return;

    this.cacheStore=JSON.parse(localStorage.getItem('cacheStore')!);

  }
  private getCountriesRequest(url: string): Observable<Country[]>{
    return this.http.get<Country[]>(url).pipe(
      catchError(() => of([]))
    );
  }

  busquedaPorCapital(valorBusqueda: string): Observable<Country[]>{
    const url = `${this.apiUrl}/capital/${valorBusqueda}`;
    return this.getCountriesRequest(url).pipe(
      tap(c => this.cacheStore.byCapital= {paises: c, valorBusqueda: valorBusqueda}),
      tap(() => this.setLocalStorage())
    );
  }

  busquedaPorPais(valorBusqueda: string): Observable<Country[]>{
    const url = `${this.apiUrl}/name/${valorBusqueda}`;
    return this.getCountriesRequest(url).pipe(
      tap(c => this.cacheStore.byCountry= {paises: c, valorBusqueda: valorBusqueda}),
      tap(() => this.setLocalStorage())
    );
  }

  busquedaPorRegion(valorBusqueda: Region): Observable<Country[]>{
    const url = `${this.apiUrl}/region/${valorBusqueda}`;
    return this.getCountriesRequest(url).pipe(
      tap(c => this.cacheStore.byRegion= {paises: c, region: valorBusqueda}),
      tap(() => this.setLocalStorage())
    );
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
