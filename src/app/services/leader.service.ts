import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {
  
  constructor() { }

  getLeaders(): Observable<Leader[]>{
    return of(LEADERS).pipe(delay(2000));
    // return new Promise(resolve=> {
    //   setTimeout(() => {
    //     resolve(LEADERS)
    //   }, 2000);
    // });  
  }

  getLeader(id: string): Observable<Leader>{
    return of(LEADERS.filter((leaders) => leaders.id === id)[0]).pipe(delay(2000));
    // return new Promise(resolve=> {
    //   setTimeout(() => {
    //     resolve(LEADERS.filter((leaders) => leaders.id === id)[0])
    //   }, 2000);
    // });
  }

  getFeaturedLeader() : Observable<Leader>{
    return of(LEADERS.filter((leaders) => leaders.featured)[0]);
    // return new Promise(resolve=> {
    //   setTimeout(() => {
    //     resolve(LEADERS.filter((leaders) => leaders.featured)[0])
    //   }, 2000);
    // });
  }
}
