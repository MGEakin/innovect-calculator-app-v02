import { Component, OnInit } from '@angular/core';

import { Calculator } from '../calculator';
import { CalculatorService } from '../calculator.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-calculators',
  templateUrl: './calculators.component.html',
  styleUrls: ['./calculators.component.css']
})
export class CalculatorsComponent implements OnInit {

  calculators: Calculator[] = [];

  // title = 'another title';
  subDisplayText = '';
  mainDisplayText = '';
  // operand1 = 0;
  // operand2 = 0;
  // operator = '';
  // calculationString = '';
  // // This string  denotes the operation being performed
  // answered = false;
  // //  flag to check whether the solution has been processed
  // operatorSet = false;

  constructor(private calculatorService: CalculatorService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.getCalculators();
  }

  getCalculators(): void {
    this.calculatorService.getCalculators()
      .subscribe(calculators => this.calculators = calculators);
  }

  pressKey(key: string) {
    this.log(`key:${key}`)
    if (key === '/' || key === 'x' || key === '-' || key === '+') {
      const lastKey = this.calculators[0].mainDisplayText[this.calculators[0].mainDisplayText.length - 1];
      if (lastKey === '/' || lastKey === 'x' || lastKey === '-' || lastKey === '+') {
        this.calculators[0].operatorSet = true;
      }
      if ((this.calculators[0].operatorSet) || (this.calculators[0].mainDisplayText === '')) {
        return;
      }
      this.calculators[0].operand1 = parseFloat(this.calculators[0].mainDisplayText);
      this.calculators[0].operator = key;
      this.calculators[0].operatorSet = true;
    }
    if (this.calculators[0].mainDisplayText.length === 10) {
      return;
    }
    this.calculators[0].mainDisplayText += key;
  }
  allClear() {
    this.calculators[0].mainDisplayText = '';
    this.calculators[0].subDisplayText = '';
    this.calculators[0].operatorSet = false;
  }
  getAnswer() {
    this.calculators[0].calculationString = this.calculators[0].mainDisplayText;
    this.calculators[0].operand2 = parseFloat(this.calculators[0].mainDisplayText.split(this.calculators[0].operator)[1]);
    if (this.calculators[0].operator === '/') {
      this.calculators[0].subDisplayText = this.calculators[0].mainDisplayText;
      this.calculators[0].mainDisplayText = (this.calculators[0].operand1 / this.calculators[0].operand2).toString();
      this.calculators[0].subDisplayText = this.calculators[0].calculationString;
      if (this.calculators[0].mainDisplayText.length > 9) {
        this.calculators[0].mainDisplayText = this.calculators[0].mainDisplayText.substr(0, 9);
      }
    } else if (this.calculators[0].operator === 'x') {
      this.calculators[0].subDisplayText = this.calculators[0].mainDisplayText;
      this.calculators[0].mainDisplayText = (this.calculators[0].operand1 * this.calculators[0].operand2).toString();
      this.calculators[0].subDisplayText = this.calculators[0].calculationString;
      if (this.calculators[0].mainDisplayText.length > 9) {
        this.calculators[0].mainDisplayText = 'ERROR';
        this.calculators[0].subDisplayText = 'Range Exceeded';
      }
    } else if (this.calculators[0].operator === '-') {
      this.calculators[0].subDisplayText = this.calculators[0].mainDisplayText;
      this.calculators[0].mainDisplayText = (this.calculators[0].operand1 - this.calculators[0].operand2).toString();
      this.calculators[0].subDisplayText = this.calculators[0].calculationString;
    } else if (this.calculators[0].operator === '+') {
      this.calculators[0].subDisplayText = this.calculators[0].mainDisplayText;
      this.calculators[0].mainDisplayText = (this.calculators[0].operand1 + this.calculators[0].operand2).toString();
      this.calculators[0].subDisplayText = this.calculators[0].calculationString;
      if (this.calculators[0].mainDisplayText.length > 9) {
        this.calculators[0].mainDisplayText = 'ERROR';
        this.calculators[0].subDisplayText = 'Range Exceeded';
      }
    } else {
      this.calculators[0].subDisplayText = 'ERROR: Invalid Operation';
    }
    this.calculators[0].answered = true;
  }

  /** Log a CalculatorsComponent message with the MessageService */
  private log(message: string) {
    this.messageService.add(`CalculatorsComponent: ${message}`);
  }
}
