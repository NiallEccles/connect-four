import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'connect-four';
  state: any[] = [
    [[null], [null], [null], [null], [null], [null], [null]],
    [[null], [null], [null], [null], [null], [null], [null]],
    [[null], [null], [null], [null], [null], [null], [null]],
    [[null], [null], [null], [null], [null], [null], [null]],
    [[null], [null], [null], [null], [null], [null], [null]],
    [[null], [null], [null], [null], [null], [null], [null]],
  ];
  currentPlayer = 0;

  public checkAvailable(col: number, row: number, input: number) {
    if (this.state[col][row][0] !== 0 && this.state[col][row][0] !== 1) {
      // this is where the fun begins
      this.adjustPosition(col, row, input);
    } else {
      console.log('Invalid move.');
    }
  }

  adjustPosition(col: number, row: number, input: number) {
    // keep track for recursion
    let currentCol = col;
    const nextSlot = () => {
      if (
        this.state[currentCol + 1] &&
        this.state[currentCol + 1][row][0] === null
      ) {
        currentCol = currentCol + 1;
        // continues recursion
        nextSlot();
      } else {
        // set the final slot
        this.state[currentCol][row][0] = input;
        //check for connect four
        this.checkHorizontal(currentCol);
        this.checkVertical(row);
        // change player
        this.currentPlayer === 0
          ? (this.currentPlayer = 1)
          : (this.currentPlayer = 0);
        return;
      }
    };
    // starts recursion
    nextSlot();
  }

  checkHorizontal(col: number) {
    if (
      this.state[col].toString().includes('0,0,0,0') ||
      this.state[col].toString().includes('1,1,1,1')
    ) {
      console.log('C-C-C-CONNECT');
    }
  }

  checkVertical(row: number) {
    let columns: any[] = [];
    for (let i = 0; i < this.state.length; i++) {
      columns.push(this.state[i][row]);
    }
    if (
      columns.toString().includes('0,0,0,0') ||
      columns.toString().includes('1,1,1,1')
    ) {
      console.log('C-C-C-CONNECT');
    }
  }
}
