import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Calculator } from './calculator';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const calculators = [
      { id: 1, title: 'angular-calculator-app', subDisplayText: '', mainDisplayText: '', operand1: 0,
        operand2: 0, operator: '', calculationString: '', answered: false, operatorSet: false}
    ];
    return {calculators};
  }
}
