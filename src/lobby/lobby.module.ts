import { Module } from "@nestjs/common";
import { LobbyController } from "./lobby.controller";
import { PrismaModule } from "../prisma/prisma.module";
import { LobbyService } from "./lobby.service";

@Module({
  controllers: [LobbyController],
  imports: [PrismaModule],
  providers: [LobbyService],
})
export class LobbyModule{}