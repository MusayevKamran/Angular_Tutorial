import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {from, fromEvent, interval, timer} from 'rxjs';
import {
  debounce,
  debounceTime,
  distinct,
  filter,
  find,
  first,
  last,
  single,
  skip,
  skipUntil,
  skipWhile,
  take,
  takeLast, takeWhile, throttle, throttleTime
} from 'rxjs/operators';

@Component({
  selector: 'app-filtering-operators',
  templateUrl: './filtering-operators.component.html',
  styleUrls: ['./filtering-operators.component.scss']
})
export class FilteringOperatorsComponent implements OnInit, AfterViewInit {
  subscription;
  @ViewChild('textSearch') searchText: ElementRef;

  constructor() {
  }

  ngOnInit(): void {
    this.checkThrottleTime();
  }

  ngAfterViewInit(): void {
    this.checkDebounceTime();
  }

  unsubscribe() {
    this.subscription.unsubscribe();
    console.log('unsubscribed');
  }


  checkFirst() {
    const myArray = from([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    //  returns only one value
    // first will throw exception if cannot find any filtered data
    myArray.pipe(first(val => val > 20)).subscribe(
      data => console.log(data),
      error => console.log(error),
      () => console.log('first completed'));
  }
  checkFind() {
    const myArray = from([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    //  returns only one value
    // first will not throw exception if cannot find any filtered data
    myArray.pipe(find(val => val > 20)).subscribe(data => {
      console.log(data);
    });
  }
  checkFilter() {
    const myArray = from([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    //  return all filtered data
    // first will not throw exception if cannot find any filtered data
    myArray.pipe(filter(val => val > 5)).subscribe(data => {
      console.log(data);
    });
  }
  checkLast() {
    const myArray = from([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    //  returns only one value
    // first will throw exception if cannot find any filtered data
    myArray.pipe(last(val => val > 5)).subscribe(
      data => console.log(data),
      error => console.log(error),
      () => console.log('last completed'));
  }
  checkSingle() {
    const myArray = from([1, 2, 1, 4]); // 1 dublicate olduqu ucun 1 goturmek olmaz
    // if you know that there is no dublicate for filtered value
    myArray.pipe(single(val => val === 2)).subscribe(
      data => console.log(data),
      error => console.log(error),
      () => console.log('single completed'));
  }
  checkDistinct() {
    const myArray = from([1, 1, 1, 2, 3, 3, 4, 4, 5, 6]);
    // dublicate deyerin 1 ni getirir. meselen 1 in bir denesini goturecek
    // if you know that there is no dublicate for filtered value
    myArray.pipe(distinct()).subscribe(
      data => console.log(data),
      error => console.log(error),
      () => console.log('distinct completed'));
  }
  checkDebounceTime() {
    fromEvent<KeyboardEvent>(this.searchText.nativeElement, 'keyup')
      .pipe(debounceTime(3000)) // her keyup dan sonra 3 saniye gozleyir
      .subscribe(data => {
        console.log((data.target as HTMLInputElement).value);
      });
  }
  checkSkip() {
    const nums = from([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    nums.pipe(skip(6)).subscribe(data => {
      console.log(data);
    });
  }
  checkSkipUntil() {
    const interVal =  interval(1000);
    interVal.pipe(skipUntil(timer(3000))).subscribe(data => {
      console.log(data);
    });

  }
  checkSkipWhile(){
    from([1, 2, 3, 4, 5, 6, 7])
      .pipe(skipWhile(val => val < 5))
      .subscribe(data => console.log(data));
  }
  checkTake(){
    from([1, 2, 3, 4, 5, 6, 7])
      .pipe(take(3))
      .subscribe(data => console.log(data));
  }
  checkTakeLast(){
    from([1, 2, 3, 4, 5, 6, 7])
      .pipe(takeLast(3))
      .subscribe(data => console.log(data));
  }
  checkTakeWhile(){
    from([1, 2, 3, 4, 5, 6, 7])
      .pipe(takeWhile(val => val < 4))
      .subscribe(data => console.log(data));
  }
  checkThrottle(){
  const myInterval = interval(1000);
  myInterval.pipe(throttle(x => interval(2000))).subscribe(data => console.log(data));
  }
  checkThrottleTime(){
    const myInterval = interval(1000);
    myInterval.pipe(throttleTime(3000)).subscribe(data => console.log(data));
  }

}
