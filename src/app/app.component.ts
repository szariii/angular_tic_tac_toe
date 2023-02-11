import { SlicePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public title = 'tic-tac-toe';
  public endGameInfo = '';
  public ruch = 'Twój ruch';
  public board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  //-1 - 0
  //0 - free
  //1 - X

  public fieldValue_0_0 = '';
  public fieldValue_0_1 = '';
  public fieldValue_0_2 = '';
  public fieldValue_1_0 = '';
  public fieldValue_1_1 = '';
  public fieldValue_1_2 = '';
  public fieldValue_2_0 = '';
  public fieldValue_2_1 = '';
  public fieldValue_2_2 = '';

  findYourId = (id: string, value: string) => {
    if (id === '0_0') {
      this.fieldValue_0_0 = value;
    } else if (id === '0_1') {
      this.fieldValue_0_1 = value;
    } else if (id === '0_2') {
      this.fieldValue_0_2 = value;
    } else if (id === '1_0') {
      this.fieldValue_1_0 = value;
    } else if (id === '1_1') {
      this.fieldValue_1_1 = value;
    } else if (id === '1_2') {
      this.fieldValue_1_2 = value;
    } else if (id === '2_0') {
      this.fieldValue_2_0 = value;
    } else if (id === '2_1') {
      this.fieldValue_2_1 = value;
    } else if (id === '2_2') {
      this.fieldValue_2_2 = value;
    }
  };

  clickField(field: HTMLDivElement) {
    if (this.endGameInfo === '') {
      const idArray = field.id.split('_');
      const position: Position = {
        i: parseInt(idArray[0]),
        j: parseInt(idArray[1]),
      };

      if (this.board[position.i][position.j] === 0) {
        this.board[position.i][position.j] = -1;
        this.findYourId(field.id, 'O');
        let endGame = this.checkWin(this.board);
        if (endGame !== -2) {
          this.finishGameInfo(endGame);
        } else {
          //this.startMinMaxAlgorithm();
          //this.minmaxStart();
          this.minmaxStart();
        }
      }
    }
  }

  finishGameInfo = (endGame: number) => {
    if (endGame === 0) {
      this.endGameInfo = 'Tie';
    }

    if (endGame === -1) {
      this.endGameInfo = 'O wins';
    }

    if (endGame === 1) {
      this.endGameInfo = 'X wins';
    }
  };

  minmaxStart = () => {
    let maxVal = -2;
    let place: Position = {
      i: -1,
      j: -1,
    };
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.board[i][j] === 0) {
          const array = this.board.map((ele) => ele.slice());
          array[i][j] = 1;
          const newValue = this.algorithm(array, false);
          console.log(newValue);
          if (maxVal < newValue) {
            maxVal = newValue;
            place = { i: i, j: j };
          }
        }
      }
    }
    console.log(maxVal);
    this.board[place.i][place.j] = 1;
    this.findYourId(`${place.i}_${place.j}`, 'X');
    let endGame = this.checkWin(this.board);
    if (endGame !== -2) {
      this.finishGameInfo(endGame);
    }
  };

  algorithm = (board: number[][], findMaxValue: boolean) => {
    const winValue = this.checkWin(board);
    if (winValue !== -2) {
      return winValue;
    }

    if (findMaxValue) {
      let maxReturnedValue = -2;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === 0) {
            board[i][j] = 1;
            const newValue = this.algorithm(board, false);
            board[i][j] = 0;
            if (maxReturnedValue < newValue) {
              maxReturnedValue = newValue;
            }
          }
        }
      }
      return maxReturnedValue;
    }

    let minReturnedValue = 2;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === 0) {
          board[i][j] = -1;
          const newValue = this.algorithm(board, true);
          board[i][j] = 0;
          if (minReturnedValue > newValue) {
            minReturnedValue = newValue;
          }
        }
      }
    }

    return minReturnedValue;
  };

  checkWin = (board: number[][]) => {
    let winningSide = -2;
    //-2 - play
    //0 - tie
    // -1 - O win
    //1 - X win
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] === board[i][1] &&
        board[i][0] === board[i][2] &&
        board[i][0] !== 0
      ) {
        winningSide = board[i][0];
      }

      if (
        board[0][i] === board[1][i] &&
        board[0][i] === board[2][i] &&
        board[0][i] !== 0
      ) {
        winningSide = board[0][i];
      }
    }

    if (
      board[0][0] === board[1][1] &&
      board[0][0] === board[2][2] &&
      board[0][0] !== 0
    ) {
      winningSide = board[0][0];
    }

    if (
      board[2][0] === board[1][1] &&
      board[2][0] === board[0][2] &&
      board[2][0] !== 0
    ) {
      winningSide = board[2][0];
    }

    if (winningSide === -2) {
      let freePlace = false;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === 0) {
            freePlace = true;
          }
        }
      }

      if (freePlace === false) {
        winningSide = 0;
      }
    }

    return winningSide;
  };
}

interface Position {
  i: number;
  j: number;
}

interface Points {}
