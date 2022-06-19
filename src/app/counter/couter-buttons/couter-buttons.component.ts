
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { increment ,decrement, reset} from '../state/couter.actions';

@Component({
  selector: 'app-couter-buttons',
  templateUrl: './couter-buttons.component.html',
  styleUrls: ['./couter-buttons.component.css']
})
export class CouterButtonsComponent implements OnInit {



  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
  }

  onIncrement() {
    this.store.dispatch(increment())
  }
  onDecrement() {
    this.store.dispatch(decrement())

  }

  onReset() {
    this.store.dispatch(reset())

  }
}
