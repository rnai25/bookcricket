import { Team } from './game';

export interface GameResult {
  id: string;
  date: string;
  team1: Team;
  team2: Team;
  winner: string;
  totalOvers: number;
  target?: number;
  userId: string;
} 