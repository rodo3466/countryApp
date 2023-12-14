import { Component } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrls: ['./by-country-page.component.css']
})
export class ByCountryPageComponent {
  public countries: Country[] = [];
  constructor(private countriesService: CountriesService){}

  busquedaPorPais(valorBusqueda: string): void{
    this.countriesService.busquedaPorPais(valorBusqueda)
    .subscribe(c => {
      this.countries = c;
    });
  }
}
