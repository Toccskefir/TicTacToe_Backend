import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface Coordinates {
  x: number;
  y: number;
}

@Injectable()
export class GameService {
  constructor(private readonly prismaService: PrismaService) {}

  async getGameState(sessionId: string) {
    const game = await this.prismaService.game.findMany({
      where: {
        OR: [{ sessionId1: sessionId }, { sessionId2: sessionId }],
      },
    });

    return game[0].state;
  }

  async setGameBoard(sessionId: string, coordinates: Coordinates) {}
}
