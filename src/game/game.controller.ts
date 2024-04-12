import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Coordinates, GameService } from './game.service';

@Controller('/game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get('/:sessionId')
  async getGameState(@Param('sessionId') sessionId: string) {
    return this.gameService.getGameState(sessionId);
  }

  @Post('/:sessionId/play')
  async postMove(
    @Param('sessionId') sessionId: string,
    @Body() coordinates: Coordinates,
  ) {
    return this.gameService.setGameState(sessionId, coordinates);
  }
}
