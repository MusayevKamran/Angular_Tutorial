import {Component, OnInit} from '@angular/core';
import {AsyncSubject, BehaviorSubject, Observable, ReplaySubject, Subject} from 'rxjs';


@Component({
  selector: 'app-rxjs-tutorial',
  templateUrl: './rxjs-tutorial.component.html',
  styleUrls: ['./rxjs-tutorial.component.scss']
})
export class RxjsTutorialComponent implements OnInit {

  ngOnInit(): void { // ajax burda olur
    this.checkReplaySubject();
  }

  checkObservable(){
    const myObservable =  Observable.create(observer => {
      observer.next(Math.random());
    });

    // her subscribere ferqli datani gonderir.
    myObservable.subscribe(data => console.log('1' + data));
    myObservable.subscribe(data => console.log('2' + data));
  }
  checkSubject(){
    const mySubject = new Subject();

    mySubject.subscribe(data => console.log('1  ' + data));
    mySubject.subscribe(data => console.log('2  ' + data));

    // her subscribere eyni datani gonderir.
    mySubject.next(Math.random());
    // nextden sonra gelenler data ala bilmiyecek
    mySubject.subscribe(data => console.log('3  ' + data));
    mySubject.next(Math.random());
    mySubject.subscribe(data => console.log('4  ' + data));

  }
  checkAsyncSubject(){ // Subscriberler en son datani gorer
    const myAsyncSubject =  new AsyncSubject();
    myAsyncSubject.subscribe(data => console.log('1 ci subscriber=  ' + data));
    myAsyncSubject.next('1 ci data');

    myAsyncSubject.subscribe(data => console.log('2 ci subscriber=  ' + data));
    myAsyncSubject.next('2 ci data');

    myAsyncSubject.complete(); // complete calismazsa data gormezler
  }
  checkBehaviorSubject(){
    const myBehaviorSubject = new BehaviorSubject('Constructor deyer mutleq almalidi');
    myBehaviorSubject.subscribe(data => console.log(data));

    myBehaviorSubject.next('her iki subscriber bunu gorecek');
    myBehaviorSubject.subscribe(data => console.log(data));
  }
  checkReplaySubject(){
    const myReplaySubject = new ReplaySubject(2);
    myReplaySubject.next('1');
    myReplaySubject.next('2');
    myReplaySubject.subscribe(data => console.log('1 subscriber ' + data));
    myReplaySubject.next('3');
    myReplaySubject.next('4');
    myReplaySubject.subscribe(data => console.log('2 subscriber ' + data));
    myReplaySubject.next('5');
  }
}
