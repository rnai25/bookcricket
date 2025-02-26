export type Team = {
  name: string;
  score: number;
  wickets: number;
  overs: number;
  isBatting: boolean;
};

export type BallResult = {
  runs: number;
  isWicket: boolean;
  over: number;
  ball: number;
};

export type Commentary = {
  over: number;
  result: number | 'W';
  message: string;
}; 