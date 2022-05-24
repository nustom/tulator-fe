import { ITopic } from "../features/topic/interface";
import { IAppCalculator, Operator } from "./interface";

const CALCULATE_HANDLER = Object.freeze({
  "+"(a: number, b: number) {
    return a + b;
  },
  "-"(a: number, b: number) {
    return a - b;
  },
  "*"(a: number, b: number) {
    return a * b;
  },
  "/"(a: number, b: number) {
    return a / b;
  }
})

export class AppCalculator implements IAppCalculator {
  calculate(topic: ITopic, newCalculation: string): number {
    const children = topic.topics;
    const allCalculations = [];
    if (children.length) {
      const allChildrenCalculations = children.map(child => child.content);
      allCalculations.push(...allChildrenCalculations);
    };
    allCalculations.push(newCalculation);
    const result = this.traversingResults(topic, allCalculations);
    return result;
  }

  calculateResultCurrentTopic(rootTopic: ITopic, currentTopic: ITopic): number {
    const currentIndex = rootTopic.topics.findIndex(topic => topic.id === currentTopic.id);
    if (currentIndex !== -1) {
      const listChildren = rootTopic.topics.slice(0, currentIndex + 1);
      const allCalculations = listChildren.map(child => child.content);
      const result = this.traversingResults(rootTopic, allCalculations);
      return result;
    }
    return 0;
  }

  private operatorReflection(op: Operator, x: number, y: number): number {
    return CALCULATE_HANDLER[op](x, y);
  }

  traversingResults(root: ITopic, data: string[]): number {
    let result = parseFloat(root.content);
    data.forEach(calc => {
      const operator = calc[0] as Operator;
      const y = parseFloat(calc.substring(1));
      result = this.operatorReflection(operator, result, y);
    });
    return result;
  };
}