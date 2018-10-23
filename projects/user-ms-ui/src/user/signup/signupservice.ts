import {Injectable} from '@angular/core';
import {ActiveSteps} from './signup.component';
@Injectable()
export class SignupService {
    activeStep: ActiveSteps;
    constructor() {

    }
    setSteps(activeStep: ActiveSteps) {
    this.activeStep = activeStep;
    }
    getActiveStepbox() {
       if (this.activeStep.subscription) {
        return 'subscription';
       } else if (this.activeStep.license) {
        return 'license';
       } else if (this.activeStep.payment) {
        return 'payment';
       }
    }
}
