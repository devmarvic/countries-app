import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {
  constructor(private http: HttpClient) { }

  private apiUrl: string = 'https://restcountries.com/v3.1'

  // si no hay ningun .suscribe esta peticion simplemente se esta definiendo pero no se ejecuta
  searchCapital( searchTerm: string): Observable<Country[]> {
    const url = `${ this.apiUrl }/capital/${searchTerm}`;
    return this.http.get<Country[]>( url ).pipe(
      catchError( error => of([]) )
    )
  }

  searchCountry( searchTerm: string): Observable<Country[]>{
    const url = `${ this.apiUrl }/name/${searchTerm}`;
    return this.http.get<Country[]>( url ).pipe(
      catchError( error => of([]) )
    )
  }

  searchRegion( region: string): Observable<Country[]>{
    const url = `${ this.apiUrl }/region/${region}`;
    return this.http.get<Country[]>( url ).pipe(
      catchError( error => of([]) )
    )
  }

  // method para buscar por id by/:id
  searchCountryByAlphaCode( code: string): Observable<Country | null>{
    const url = `${ this.apiUrl }/alpha/${code}`;

    return this.http.get<Country[]>( url )
    .pipe(
      map( countries => countries.length > 0 ? countries[0]: null),
      catchError( error => of(null) )
    )
  }

}
