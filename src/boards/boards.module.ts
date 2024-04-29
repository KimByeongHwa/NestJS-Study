import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { BoardProviders } from './board.provider';

@Module({
  controllers: [BoardsController],
  providers: [...BoardProviders, BoardsService],
})
export class BoardsModule {}
