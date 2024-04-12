import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { v4 as uuid } from 'uuid';
import { Prisma } from '@prisma/client';

@Injectable()
export class LobbyService {
  constructor(private readonly prismaService: PrismaService) {}

  async createLobby() {
    const sessionId: string = uuid();
    const tableRows = await this.prismaService.lobbyEntry.findMany();
    if (tableRows.length > 0) {
      await this.prismaService.lobbyEntry.deleteMany();
      return sessionId;
    }

    const user: Prisma.LobbyEntryCreateInput = {
      sessionId: sessionId,
    };
    this.prismaService.lobbyEntry.create({
      data: user,
    });
    return sessionId;
  }
}
