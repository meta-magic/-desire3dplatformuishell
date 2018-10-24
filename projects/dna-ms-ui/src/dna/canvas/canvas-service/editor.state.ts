/**
 * Created by pratik on 12/9/17.
 */
import { Injectable } from '@angular/core';

@Injectable()
export class EditorStateService {
  past: any[];
  present: any;
  future: any[];

  constructor() {
    this.past = [];
    this.future = [];
  }

  onAddNewState(state: any) {
    if (this.present != null) {
      this.past.push(this.present);
      this.present = state;
    } else {
      this.present = state;
    }
  }

  onUndoState() {
    if (this.past.length > 0) {
      const previousState = this.past.pop();
      this.future.push(this.present);
      this.present = previousState; //call view updation here
      return true;
    } else {
      if (this.present != null) {
        this.future.push(this.present);
      }
      return false;
    }
  }

  onRedoState(): boolean {
    if (this.future.length > 0) {
      const nextState = this.future.pop();
      this.past.push(this.present);
      this.present = nextState;
      return true;
    } else {
      return false;
    }
  }

  resetState() {
    this.present = null;
    this.past = [];
    this.future = [];
  }
}
