import { Component, OnInit } from '@angular/core';
//Interfaces
import { ICovidCities } from 'src/app/interfaces/iCovidCities';
import { ICovidState } from 'src/app/interfaces/iCovidState';

//Services
import { CovidStatesService } from 'src/app/services/covidStates/covidStates.service';
import { CovidCitiesService } from 'src/app/services/covidCities/covid-cities.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent {
  public states: Array<ICovidState> = [];
  public cities: Array<ICovidCities> = [];

  public dateSelectCities: Array<ICovidState> = [];
  public abrir: boolean = false;

  public vaccination?: any;
  public cases?: any;
  public deaths?: any;
  public recovered?: any;

  constructor(
    private citiesService: CovidCitiesService,
    private statesService: CovidStatesService
  ) {}


  ngOnInit(): void {
    this.getDataStates();
    this.getDataCities();
    setInterval(() => this.abrir = true, 5000);

  }

  private getDataCities(): void {
    this.citiesService.getData().subscribe((data) => {
      const list = data.split('\n');
      list.forEach((e: any) => {
        const item = e.split(',');
        this.cities.push({
          uf: item[1],
          name: item[2],
          deaths: item[4],
          new_deaths: item[12],
          total_cases: item[5],
          new_cases: item[11],
          date: item[10],
        });
        this.cities.sort((a, b) => a.uf.localeCompare(b.uf));
      });
      this.cities.splice(0, 1);
    });
  }

  private getDataStates(): void {
    this.statesService.getData().subscribe((data) => {
      const list = data.split('\n');
      list.forEach((e: any) => {
        const item = e.split(',');
        var today = new Date();
        var yesterday = new Date(today.getTime());
        yesterday.setDate(today.getDate() - 1);
        var dd: any = yesterday.getDate();
        var mm: any = yesterday.getMonth() + 1;
        var yyyy = yesterday.getFullYear();
        if (dd < 10) {
          dd = '0' + dd;
        }
        if (mm < 10) {
          mm = '0' + mm;
        }
        var data_ok = yyyy + '-' + mm + '-' + dd;
        if (item[1] == data_ok) {
          this.states.push({
            date: item[1],
            country: item[2],
            state: item[3],
            city: item[4],
            newDeaths: item[5],
            deaths: item[6],
            recovered: item[14],
            suspects: item[15],
            tests: item[16],
            vaccinated: item[18],
            vaccinated_second: item[20],
            vaccinated_third: item[24],
            vaccinated_single: item[22],
            cases: item[8],
            newCases: item[7],

          });
        }
      });
      this.states.sort((item1, item2) => item2.date.localeCompare(item1.date));
      this.vaccination = Number(this.states[27].vaccinated) + Number(this.states[27].vaccinated_second) + Number(this.states[27].vaccinated_third) + Number(this.states[27].vaccinated_single)
      this.vaccination = new Intl.NumberFormat('pt-BR').format(this.vaccination);

      this.cases = this.states[27].cases
      this.cases = new Intl.NumberFormat('pt-BR').format(this.cases);

      this.deaths = this.states[27].deaths
      this.deaths = new Intl.NumberFormat('pt-BR').format(this.deaths);

      this.recovered = this.states[27].recovered
      this.recovered = new Intl.NumberFormat('pt-BR').format(this.recovered);
    });
    this.getPerDate();
  }

  private getPerDate(): void {
    this.states.forEach((item) => {
      if (item.date == this.states[1].date) {
        this.dateSelectCities.push(item);
        console.log('inpput');
      }
    });
    this.states.sort((item1, item2) => item2.state.localeCompare(item1.state));
  }
}
