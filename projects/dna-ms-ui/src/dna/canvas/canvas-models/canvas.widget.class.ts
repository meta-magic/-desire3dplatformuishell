export class CanvasWidgetClass {
  public children: any[];
  public parentComponentRef?: CanvasWidgetClass;
  public componentId: any;
  public properties: any;
  public previewMode: boolean;
  public editMode: boolean;
  public isComponentValid: boolean;
  public isComponent: boolean;
  public isActive: boolean;
  public isOver: boolean;
  public name: any;
  public dataSource: any;
  public componentBehaviour: ComponentBehaviour;
  constructor() {
    this.isComponentValid = true;
    this.children = [];
    this.isComponent = true;
    this.componentBehaviour = new ComponentBehaviour();
  }
}

export class ComponentBehaviour {
  hasModelBinding: boolean;
  hasRelationship: boolean;
  isBindingComponent: boolean;
  hasDataSource: boolean;

  constructor() {
    this.hasModelBinding = false;
    this.hasRelationship = false;
    this.isBindingComponent = false;
    this.hasDataSource = false;
  }
}
