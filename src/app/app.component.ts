import {Component, OnInit} from '@angular/core';
import {ApiWeatherService} from './api-weather.service';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material';
import {LocalStorageService} from 'ng-storages';

export interface CityWeather {
  city: string;
  weather: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  displayedColumns: string[] = ['city', 'weather', 'action'];
  weatherJson$: Observable<string>;
  dataSource: MatTableDataSource<CityWeather>;

  constructor(private apiWeather: ApiWeatherService,
              private storage: LocalStorageService,
  ) {
    this.dataSource = new MatTableDataSource<CityWeather>([]);
    this.storage.getObject('weather').then(weather => {
      if (!!weather) {
        this.dataSource.data = weather;
        this.dataSource.filter = '';
      }
    });
  }

  ngOnInit() {
    this.getLocation();
  }

  addCity(city: string) {
    this.weatherJson$ = this.apiWeather.getWeatherByCity(city)
      .pipe(
        tap((weather: string) => {
          if (weather.toLowerCase().indexOf('ошибка:') === -1) {
            this.dataSource.data.push(<CityWeather>{city: city, weather: weather});
            this.dataSource.filter = '';
            this.storage.setObject({'weather': this.dataSource.data});
          }
        })
      );
  }

  addCityByPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const cityCoords = `Координаты ${lat}:${lon}`;
    const index = this.dataSource.data.findIndex(cw => cw.city === cityCoords);
    if (index !== -1) {
      return;
    }
    this.weatherJson$ = this.apiWeather.getWeatherByPosition(lat, lon)
      .pipe(
        tap((weather: string) => {
          if (weather.toLowerCase().indexOf('ошибка:') === -1) {
            this.dataSource.data.push(<CityWeather>{city: cityCoords, weather: weather});
            this.dataSource.filter = '';
            this.storage.setObject({'weather': this.dataSource.data});
          }
        })
      );
  }

  removeCity(city: string) {
    const cityIndex = this.dataSource.data.findIndex(cw => cw.city === city);
    this.dataSource.data.splice(cityIndex, 1);
    this.dataSource.filter = '';
    this.storage.setObject({'weather': this.dataSource.data});
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => this.addCityByPosition(pos));
    } else {
      console.log('Ошибка: ваше местоположение не найдено');
    }
  }
}
