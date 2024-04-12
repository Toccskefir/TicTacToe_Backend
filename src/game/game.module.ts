import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { GameService } from './game.service';

@Module({
  controllers: [GameController],
  imports: [PrismaModule],
  providers: [GameService],
})
export class GameModule {}
