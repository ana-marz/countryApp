import { Component, ElementRef, ViewChild } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent {

  public countries: Country[] = [];

  constructor(private countriesService: CountriesService) {}

  searchByCapital(term: string) : void {
    console.log('desde byCapitalPage');
    console.log({term});
    this.countriesService.searchCountry(term)
      .subscribe(countries => {
        this.countries = countries;
    });
  }

}
