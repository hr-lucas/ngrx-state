import { Store } from '@ngrx/store';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CounterState } from '../state/counter.state';
import { Subscription, Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { getCounter } from '../state/counter.selectors';

@Component({
  selector: 'app-couter-output',
  templateUrl: './couter-output.component.html',
  styleUrls: ['./couter-output.component.css']
})
export class CouterOutputComponent implements OnInit {

  counter: any

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {


    this.store.select(getCounter).subscribe( data => {
      console.log( 'Data', data)
      this.counter = data
    })
  }


}
