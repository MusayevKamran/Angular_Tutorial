import { Component, OnInit } from '@angular/core';
import {of} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-test-track-by',
  templateUrl: './test-track-by.component.html',
  styleUrls: ['./test-track-by.component.scss']
})
export class TestTrackByComponent implements OnInit {

  response: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('https://jsonplaceholder.typicode.com/users').subscribe(data => {
      this.response = data;
    });
  }

  addName(){
    // it shows good performance on http request
    this.http.get('https://jsonplaceholder.typicode.com/users').subscribe(data => {
      this.response = data;

      this.response.push({name: 'Elsen'});
    });


  }

  trackByFn(index, item){
    return index;
    // or item.id if it return id
  }
}
