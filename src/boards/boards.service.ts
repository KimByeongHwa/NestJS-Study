import { Injectable, NotFoundException } from '@nestjs/common';
import { Board as BoardModel, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './board.entity';
@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}

  private boards: BoardModel[] = [];

  getAllBoards(): BoardModel[] {
    return this.boards;
  }

  createBoard(createBoardDto: CreateBoardDto) {
    const board: BoardModel = {
      id: uuid(),
      title: createBoardDto.title,
      description: createBoardDto.description,
      status: BoardStatus.PUBLIC,
    };

    this.boards.push(board);
    return board;
  }

  getBoardById(id: string): BoardModel {
    const found = this.boards.find((board) => board.id === id);

    if (!found) {
      throw new NotFoundException(`${id}번 게시글을 찾을 수 없습니다!`);
    }

    return found;
  }

  deleteBoard(id: string): void {
    const found = this.getBoardById(id);

    this.boards.filter((board) => board.id !== found.id);
  }

  updateBoardStatus(id: string, status: BoardStatus): BoardModel {
    const board = this.getBoardById(id);
    board.status = status;
    return board;
  }
}
