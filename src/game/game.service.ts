import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

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

    if (game.length === 0) {
      throw new NotFoundException(
        'Game not found with session id: ' + sessionId,
      );
    }
    return game[0].state;
  }

  async setGameState(sessionId: string, coordinates: Coordinates) {
    if (
      coordinates.x > 4 ||
      coordinates.y > 4 ||
      coordinates.x < 0 ||
      coordinates.y < 0
    ) {
      throw new BadRequestException('Bad coordinates');
    }

    const game = await this.prismaService.game.findMany({
      where: {
        OR: [{ sessionId1: sessionId }, { sessionId2: sessionId }],
      },
    });

    if (game.length === 0) {
      throw new NotFoundException(
        'Game not found with session id: ' + sessionId,
      );
    }

    const boardState = game[0].state;
    const currentPlayer = game[0].currentPlayer;
    const nextPlayer: string = currentPlayer === 'X' ? 'O' : 'X';

    if (boardState[coordinates.x][coordinates.y] !== '') {
      throw new BadRequestException('Field already marked');
    }
    boardState[coordinates.x][coordinates.y] = currentPlayer;

    const gameUpdateData: Prisma.GameUpdateInput = {
      state: boardState,
      currentPlayer: nextPlayer,
    };

    await this.prismaService.game.update({
      where: {
        id: game[0].id,
      },
      data: gameUpdateData,
    });

    return boardState;
  }
}
