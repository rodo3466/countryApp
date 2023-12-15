import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrls: ['./by-capital-page.component.css']
})
export class ByCapitalPageComponent implements OnInit {
    public countries: Country[] = [];
    public valueInput: string = '';
    public isLoading: boolean = false;

    constructor(private countriesService: CountriesService){}

    ngOnInit(){
      this.getBackupService();
    }

    busquedaPorCapital(valorBusqueda: string): void{
      this.isLoading=true;
      this.countriesService.busquedaPorCapital(valorBusqueda)
      .subscribe(c => {
        this.countries = c;
        this.isLoading=false;
      });
    }

    getBackupService(){
        this.countries=this.countriesService.cacheStore.byCapital.paises;
        this.valueInput=this.countriesService.cacheStore.byCapital.valorBusqueda;
    }
}
