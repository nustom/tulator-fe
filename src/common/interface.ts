import { ITopic } from "../features/topic/interface";

export enum EStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  FAILED = 'failed',
}

export interface IResponseData<T> {
  data: T;
  status: number;
}

export interface IResponseDataArray<T> {
  data: Array<T>;
  status: number;
}

export type Operator = "+" | "-" | "*" | "/";

export interface IAppCalculator {
  /**
   * Calculate the result of the current topic
   */
  calculate: (items: ITopic, newCalculation: string) => number;

  /**
   * Calculate the result of the current child topic, start from the beginning to the current position of child.
   */
  calculateResultCurrentTopic: (rootTopic: ITopic, currentTopic: ITopic) => number;
}