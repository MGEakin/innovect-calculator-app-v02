export class Calculator {
  constructor(
    public id: number,
    public title: string,
    public subDisplayText: string,
    public mainDisplayText: string,
    public operand1: number,
    public operand2: number,
    public operator: string,
    public calculationString: string,
      // This string  denotes the operation being performed
    public answered: boolean,
      //  flag to check whether the solution has been processed
    public operatorSet: boolean
  ) { }
}
export interface Calculator {
}
