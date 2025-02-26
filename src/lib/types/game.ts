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
  ballHistory: string[][];
  tossWinner: string | null;
  battingFirst: string | null;
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