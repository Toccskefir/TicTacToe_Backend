import { Controller, Post } from '@nestjs/common';
import { LobbyService } from './lobby.service';

@Controller('/lobby')
export class LobbyController {
  constructor(private readonly todoService: LobbyService) {}

  @Post()
  async createLobby() {
    return this.todoService.createLobby();
  }
}
