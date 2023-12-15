import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrls: ['./by-country-page.component.css']
})
export class ByCountryPageComponent implements OnInit {
  public countries: Country[] = [];
  public valueInput: string = '';
  public isLoading: boolean = false;

  constructor(private countriesService: CountriesService){}

  ngOnInit(){

    this.getBackupService();
    //console.log("country: "+this.valueInput);
  }

  busquedaPorPais(valorBusqueda: string): void{
    this.isLoading=true;
    this.countriesService.busquedaPorPais(valorBusqueda)
    .subscribe(c => {
      this.countries = c;
      this.isLoading=false
    });
  }

  getBackupService(){
      this.countries=this.countriesService.cacheStore.byCountry.paises;
      this.valueInput=this.countriesService.cacheStore.byCountry.valorBusqueda;
  }
}
