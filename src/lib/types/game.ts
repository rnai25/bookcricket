export interface Team {
  id: string;
  name: string;
  score: number;
  wickets: number;
  overs: number;
  isBatting: boolean;
  ballHistory?: string[];
}

export interface GameState {
  team1: Team;
  team2: Team;
  currentInnings: number;
  score: number[];
  wickets: number[];
  overs: number;
  currentOver: number;
  currentBall: number;
  ballHistory: string[][];
  isGameOver: boolean;
  battingFirst: Team;
  bowlingFirst: Team;
  tossWinner: Team;
  totalOvers: number;
  gameCompleted: boolean;
  target: number | null;
  tossResult: {
    winner: string;
    decision: 'bat' | 'bowl';
  } | null;
}

export interface Commentary {
  over: number;
  result: string | number;
  message: string;
} 