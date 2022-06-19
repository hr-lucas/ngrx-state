import { getChannelName } from './../state/counter.selectors';
import { CounterState } from './../state/counter.state';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { customChangeName, customIncrement, editChangeName } from '../state/couter.actions';

@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrls: ['./custom-counter-input.component.css']
})
export class CustomCounterInputComponent implements OnInit {
  channelName: any;
  value: any;

  constructor(
    private store: Store<{ couter: CounterState }>
  ) { }

  ngOnInit(): void {


    this.store.select(getChannelName).subscribe(changeName =>{
      console.log('Selector', changeName)
      this.channelName = changeName
    })
  }
  onAdd(){
    this.store.dispatch(customIncrement({ teste: +this.value}))
  }

  onChannelName(){
    this.store.dispatch(customChangeName())
  }
  alteraName(){
    var value =  prompt('Insira por favor')
    this.store.dispatch(editChangeName({insertName: value}))
  }

}
