import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';


@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrls: ['./by-region-page.component.css']
})
export class ByRegionPageComponent implements OnInit{

  public countries: Country[] = [];
  public isLoading: boolean = false;

  public regiones: Region[] = ['Africa', 'America', 'Asia', 'Europe', 'Oceania'];
  public RegionSelected?: Region;
  constructor(private countriesService: CountriesService){}

  ngOnInit(): void {
    this.getBackupService();
  }

  busquedaPorRegion(valorBusqueda: Region): void{
    this.isLoading=true;
    this.RegionSelected=valorBusqueda;
    this.countriesService.busquedaPorRegion(valorBusqueda)
    .subscribe(c => {
      this.countries = c;
      this.isLoading=false;;
    });
  }

  getBackupService(){
      this.countries=this.countriesService.cacheStore.byRegion.paises;
      this.RegionSelected=this.countriesService.cacheStore.byRegion.region!;
  }
}
