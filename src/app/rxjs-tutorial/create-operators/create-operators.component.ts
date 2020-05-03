import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {defer, from, fromEvent, interval, Observable, of, range, timer} from 'rxjs';
import {ajax} from 'rxjs/ajax';

@Component({
  selector: 'app-create-operators',
  templateUrl: './create-operators.component.html',
  styleUrls: ['./create-operators.component.scss']
})
export class CreateOperatorsComponent implements OnInit, AfterViewInit {
  subscription;
  @ViewChild('btn') button: ElementRef; // referansdan olduqu ucun #btn referansindan
  constructor() {

  }
  ngOnInit(): void { // ajax burda olur
    this.checkCreate();
  }
  ngAfterViewInit(): void {
    this.checkFromEvent();
  }

  unsubscribe(){
    this.subscription.unsubscribe();
    console.log('unsubscribed');
  }
// creation operators
  checkOf(){
    const publisher = of(1000, 'Kamran', [1, 2, 3, 4]);
    this.subscription = publisher.subscribe(val => {
      console.log(val);
    });
  }
  checkInterval(){
    const publisher = interval(1000);
    this.subscription = publisher.subscribe(val => {
      console.log(val);
    });
  }
  checkTimer(){
    // const publisher = timer(2000); iki saniye sonra data geler
    const publisher = timer(2000, 3000); // 2 saniye sonra 3 saniye araliqla data geler
    this.subscription = publisher.subscribe(val => {
        console.log(val);
      },
      error => {},
      () => {
        console.log('checkTimer completed');
      });
  }
  checkRange(){
    const publisher = range(3, 20);
    publisher.subscribe(val => {
        console.log(val);
      },
      error => {},
      () => { console.log('range completed'); }
    );
  }
  checkFrom(){ // difference from of is of can everything from only arrays
    const map = new Map();
    map.set(1, 'Kamran');
    map.set(2, 'Bayram');
    map.set(3, 'Rehim');

    const publisher = from(map);
    publisher.subscribe(val => {
        console.log(`${val[0]} = ${val[1]}`);
      },
      error => {},
      () => { console.log('checkFrom completed'); }
    );
  }
  checkDefer(){

    const publisher1 = of(new Date()); // return data is when date is created
    const publisher2 = defer(() => of(new Date())); // return data is date when called

    const myTimer = timer(3000);

    myTimer.subscribe(value => {
      publisher1.subscribe(
        val => { console.log(val); },
        error => {},
        () => {console.log('publisher1 completed'); }
      );
      publisher2.subscribe(
        val => { console.log(val); },
        error => {},
        () => {console.log('publisher2 completed'); }
      );
    });

  }
  checkAjax(){
    ajax.getJSON('http://jsonplaceholder.typicode.com/users/1').subscribe(val => {
      console.log(val);
    });
  }
  checkCreate(){
    const myObservable =  Observable.create(observer => {
      observer.next('First message that subscriber will see');
      observer.next('Kamran Musayev');
      observer.complete(); // burda complete yazaraq butun subscriberler datanin bitdiyini deyirik.
      // buna gorede subscribde complete metodu calsacaq
    });

    myObservable.subscribe(val => {
        console.log(val);
      },
      error => {},
      () => { console.log('checkCreate completed');
      });
  }
  checkFromEvent(){
    fromEvent(this.button.nativeElement, 'click')
      .subscribe( val => { console.log(val); });
  }

}

