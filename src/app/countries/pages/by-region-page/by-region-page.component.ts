import { Component } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

type Region = 'Africa'|'America'|'Asia'|'Europe'|'Oceania';
@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrls: ['./by-region-page.component.css']
})
export class ByRegionPageComponent {

  public countries: Country[] = [];
  public regiones: Region[] = ['Africa', 'America', 'Asia', 'Europe', 'Oceania'];
  public RegionSelected?: Region;
  constructor(private countriesService: CountriesService){}

  busquedaPorRegion(valorBusqueda: Region): void{
    this.RegionSelected=valorBusqueda;
    this.countriesService.busquedaPorRegion(valorBusqueda)
    .subscribe(c => {
      this.countries = c;
    });
  }
}
