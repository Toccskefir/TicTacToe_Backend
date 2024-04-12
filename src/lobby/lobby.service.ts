import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { v4 as uuid } from 'uuid';
import { Prisma } from '@prisma/client';

const gameBoard: string[][] = [
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
];

@Injectable()
export class LobbyService {
  constructor(private readonly prismaService: PrismaService) {}

  async createLobby() {
    const sessionId: string = uuid();
    const tableRows = await this.prismaService.lobbyEntry.findMany();
    if (tableRows.length > 0) {
      const players: Prisma.GameCreateInput = {
        sessionId1: tableRows[0].sessionId,
        sessionId2: sessionId,
        state: gameBoard,
      };
      await this.prismaService.game.create({
        data: players,
      });
      await this.prismaService.lobbyEntry.deleteMany();
      return sessionId;
    }

    const player: Prisma.LobbyEntryCreateInput = {
      sessionId: sessionId,
    };
    await this.prismaService.lobbyEntry.create({
      data: player,
    });
    return sessionId;
  }
}
