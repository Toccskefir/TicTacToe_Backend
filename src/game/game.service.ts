import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface Coordinates {
  x: number;
  y: number;
}

@Injectable()
export class GameService {
  constructor(private readonly prismaService: PrismaService) {}

  async getGameState(sessionId: string) {}

  async setGameBoard(sessionId: string, coordinates: Coordinates) {}
}
