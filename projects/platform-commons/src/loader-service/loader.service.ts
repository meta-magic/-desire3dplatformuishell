import { Injectable } from '@angular/core';
@Injectable()
export class LoaderService {
  isLoading = false;
  constructor() {}

  showLoader() {
    this.isLoading = true;
  }

  hideLoader() {
    this.isLoading = false;
  }
}
