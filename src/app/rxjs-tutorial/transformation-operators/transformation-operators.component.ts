import { Component, OnInit } from '@angular/core';
import {from, interval, of} from 'rxjs';
import {concatMap, delay, map, mapTo, mergeMap, reduce, skip, switchMap, take, toArray} from 'rxjs/operators';

@Component({
  selector: 'app-transformation-operators',
  templateUrl: './transformation-operators.component.html',
  styleUrls: ['./transformation-operators.component.scss']
})
export class TransformationOperatorsComponent implements OnInit {
  subscription;
  constructor() { }

  ngOnInit(): void {
    this.checkReduce();
  }
  unsubscribe() {
    this.subscription.unsubscribe();
    console.log('unsubscribed');
  }

  checkMap(){
    const num = from([2, 3, 4]);
    num
      .pipe(
        map(x => 'native datalara deyisiklikler etmek olar : ' + x * x * x))
      .subscribe(data => console.log(data));

    const users = from([
      {name: 'Kamran', surname: 'Musayev', email: 'kamran@gmail.com'},
      {name: 'Bayram', surname: 'Bayram', email: 'kamran@gmail.com'}
    ]);
    users
      .pipe(
        map(val => 'Ancaq istediyin fieldi select ede bilirsen ' + val.name))
      .subscribe(data => console.log(data));
  }
  checkMapTo(){
    const users = from([
      {name: 'Kamran', surname: 'Musayev', email: 'kamran@gmail.com'},
      {name: 'Bayram', surname: 'Bayram', email: 'kamran@gmail.com'}
    ]);
    users
      .pipe(
        mapTo('Bura ne yazilsa subscriberler onu gorecek'))
      .subscribe(data => console.log(data));
  }
  checkMergeMap(){
    of('a', 'b', 'c', 'd', 'e')
      .pipe(
        mergeMap(val => of(1, 2)
          .pipe(
            delay(2000),
            map(num => val + ' ' + num))))
      .subscribe(data => console.log(data));
  }
  checkSwitchMap(){
    of('a', 'b', 'c', 'd', 'e')
      .pipe(
        switchMap(val => of(1, 2)
          .pipe(
            delay(2000),
            map(num => val + ' ' + num))))
      .subscribe(data => console.log(data));
  }
  checkConcatMap(){
    of('a', 'b', 'c', 'd', 'e')
      .pipe(
        concatMap(val => of(1, 2)
          .pipe(
            delay(3000),
            map(num => val + ' ' + num))))
      .subscribe(data => console.log(data));
  }
  checkToArray(){
    const myInterval = interval(1000);
    myInterval
      .pipe(
        skip(3),
        take(5),
        toArray()
      )
      .subscribe(data => console.log(data));
  }
  checkReduce(){
    of(1, 2, 3, 4, 5)
      .pipe(
        reduce((acc, val) => acc + val))
      .subscribe(data => console.log(data));
  }

}
