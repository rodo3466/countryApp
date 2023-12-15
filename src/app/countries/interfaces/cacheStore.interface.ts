import { Country } from "./country.interface"
import { Region } from "./region.type"

export interface ValoresPais{
  valorBusqueda: string,
  paises: Country[]
}
export interface ValoresRegion{
  region?: Region,
  paises: Country[]
}
export interface IcacheStore{
  byCapital: ValoresPais,
  byCountry: ValoresPais,
  byRegion: ValoresRegion
}
