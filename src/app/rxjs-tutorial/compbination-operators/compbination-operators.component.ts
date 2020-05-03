import { Component, OnInit } from '@angular/core';
import {concat, forkJoin, from, fromEvent, interval, merge, of} from 'rxjs';
import {map, mergeAll, mergeMap, startWith, withLatestFrom} from 'rxjs/operators';
import {ajax} from 'rxjs/ajax';

@Component({
  selector: 'app-compbination-operators',
  templateUrl: './compbination-operators.component.html',
  styleUrls: ['./compbination-operators.component.scss']
})
export class CompbinationOperatorsComponent implements OnInit {
  subscription;
  constructor() { }

  ngOnInit(): void {
    this.checkConcat();
  }
  unsubscribe(){
    this.subscription.unsubscribe();
    console.log('unsubscribed');
  }

  checkMerge(){
    const myEvent = fromEvent(document , 'click');
    const myInterval = interval(2000);

    merge(myEvent, myInterval).subscribe(data => console.log(data));
  }
  checkMergeAll(){
    const myEvent = fromEvent(document, 'click');

    myEvent
      .pipe(
        map(val => interval(1000)))
      .pipe(mergeAll(2))
      .subscribe(data => console.log(data));
  }
  checkStartWith(){
    const myArray = from(['Kamran', 'Bayram', 'Mehemmedeli']);
    myArray.pipe(startWith('Adlar')).subscribe(data => console.log(data));
  }
  checkForkJoin(){
    forkJoin({
      // hamisi hazir olandan sonra gosterir
      ilk: ajax.getJSON('https://jsonplaceholder.typicode.com/todos/1'),
      iki: ajax.getJSON('https://jsonplaceholder.typicode.com/posts/1'),
      uc: ajax.getJSON('https://jsonplaceholder.typicode.com/users/1'),
    }).subscribe(data => console.log(data));
  }
  checkWithLatestFrom(){
    const myInterval = interval(1000);
    fromEvent(document, 'click')
      .pipe(withLatestFrom(myInterval))
      .subscribe(data => console.log(data));
  }
  checkConcat(){
  // sira ile observable leri birlesdirir. biri qutarmamis o birine kecmir.
    const myArray1 = of(1, 2, 3, 4);
    const myArray2 = of(5, 6, 7);
    const myArray3 = of(8, 9);

    concat(myArray1, myArray2, myArray3).subscribe(data => console.log(data));


  }

}
