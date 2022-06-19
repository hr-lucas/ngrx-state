import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CouterComponent } from './couter/couter.component';
import { CouterOutputComponent } from './couter-output/couter-output.component';
import { CouterButtonsComponent } from './couter-buttons/couter-buttons.component';
import { CustomCounterInputComponent } from './custom-counter-input/custom-counter-input.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './state/counter.reducer';

const router = [
  {
    path: '',
    component: CouterComponent
  },
]

@NgModule({
  declarations: [
    CouterComponent,
    CouterOutputComponent,
    CouterButtonsComponent,
    CustomCounterInputComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(router),
    FormsModule,
    StoreModule.forFeature('couter',counterReducer),
  ]
})
export class CounterModule { }
