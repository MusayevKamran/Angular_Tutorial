import { Component, OnInit } from '@angular/core';
import {fromEvent, interval, of, pipe} from 'rxjs';
import {catchError, delay, delayWhen, finalize, map, repeat, retry, retryWhen, take, tap, timeout} from 'rxjs/operators';
import {ajax} from 'rxjs/ajax';

@Component({
  selector: 'app-utility-operators',
  templateUrl: './utility-operators.component.html',
  styleUrls: ['./utility-operators.component.scss']
})
export class UtilityOperatorsComponent implements OnInit {

  subscription;
  constructor() { }

  ngOnInit(): void {
    this.checkRetryWhen();
  }
  unsubscribe(){
    this.subscription.unsubscribe();
    console.log('unsubscribed');
  }

  checkTap(){
    of(1, 2, 3, 4, 5, 6, 7)
      .pipe(tap(val => console.log(`log ve s yazmaq meqsedi ile istifade ede bilerik.Value tesit etmeden. Meselen hazirki value:  ${val}`)))
      .subscribe(data => console.log(data));
  }
  checkDelayWhen(){

    ajax.getJSON<any>('https://jsonplaceholder.typicode.com/todos/1')
      .pipe(
        delay(5000), // 5 saniye gozledir
        delayWhen(value => fromEvent(document, 'click'))) // datani cekir click edene qeder gozledir
      .subscribe(data => console.log(data));
  }
  checkFinalize(){
    interval(1000)
      .pipe(
        take(5),
        finalize(() => console.log('take limit bitdi')))
      .subscribe(data => console.log(data));
  }
  checkRepeat(){
    interval(1000)
      .pipe(
        take(5),
        repeat(3)) // datani 3 defe tekrar edir
      .subscribe(data => console.log(data));
  }
  checkTimeOutAndCatchError(){
    const myAjax =
      ajax.getJSON<any>('https://jsonplaceholder.typicode.com/todos/1')
        .pipe(
          delay(4000),
          timeout(3000),
          catchError(err => of('3 saniye icerisinde data gelmedi')))
        .subscribe(data => console.log(data));
  }
  checkRetry(){
    ajax.getJSON<any>('bele url yoxdu')
      .pipe(
        delay(4000),
        timeout(3000),
        retry(3), // sorqunu problem yaranarsa retry count qeder tekrar eder,
        catchError(err => of('3 saniye icerisinde data gelmedi')))
      .subscribe(data => console.log(data));
  }
  checkRetryWhen(){
    const myInterval = interval(1000)
      .pipe(
        map(val => {
          if (val > 3) {
            throw new Error('value 3 dan boyu');
          } else {
            return val;
          }}
      ));

    myInterval
      .pipe(
        retryWhen(err =>
          err.pipe(
            tap(x => console.log(x)),
            delay(3000))))
      .subscribe(data => console.log(data));
  }
}



