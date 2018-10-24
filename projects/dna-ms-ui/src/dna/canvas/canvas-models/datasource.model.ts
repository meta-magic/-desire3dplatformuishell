/**
 * Created by dattaram on 5/1/18.
 */

export class DatasourceModel {
  remote: Remote;
  local: Local;
  localTreeData: any;
  constructor() {
    this.remote = new Remote();
    this.local = new Local();
    this.localTreeData = null;
  }
}

//FOR REMOTE SERVICE CALL
export class Remote {
  httpUrl: any;
  httpMethod: any;
  constructor() {
    this.httpMethod = '';
    this.httpUrl = '';
  }
}
//FOR LOCAL DATA
export class Local {
  data: any;
  constructor() {
    this.data = null;
  }
}

export class Metadata {
  bcId: string;
  domainId: string;
  serviceId: string;
  operationId: string;
  methodType: string;
  recordData: any[];
  servicetype: any;

  constructor() {
    this.bcId = '';
    this.domainId = '';
    this.serviceId = '';
    this.operationId = '';
    this.methodType = '';
    this.recordData = [];
    this.servicetype = 1;
  }
}


