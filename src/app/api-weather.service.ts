import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiWeatherService {

  constructor(private http: HttpClient) {
  }

  getWeatherByCity(city: string) {
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d2730b6ccf5a180d5aba472b05c8eab5`)
      .pipe(
        map(answer => JSON.stringify(answer)),
        catchError(error => {
          console.log(error);
          return of(`Ошибка: Погода для города ${city} не найдена 😭`);
        })
      );
  }

  getWeatherByPosition(lat: number, lon: number) {
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d2730b6ccf5a180d5aba472b05c8eab5`)
      .pipe(
        map(answer => JSON.stringify(answer)),
        catchError(error => {
          console.log(error);
          return of(`Ошибка: Погода по координатам ${lat} ${lon} не найдена 😭`);
        })
      );
  }
}
