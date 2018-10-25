import { ServiceBlockBehaviour } from '../event-relationship/relationship-component/serviceblock.component';
import { UpdateModelBlockBehaviour } from '../event-relationship/relationship-component/updatemodelBlock.component';
import { NotificationBlockBehaviour } from '../event-relationship/relationship-component/notificationblock.component';
import { NavigateBlockBehaviour } from '../event-relationship/relationship-component/navigateblock.component';
import {ElseIfBlockBehaviour} from '../event-relationship/relationship-component/elseIfblock.component';
import {ElseBlockBehaviour} from '../event-relationship/relationship-component/elseblock.component';
import {ConditionBlockBehaviour} from "../event-relationship/relationship-component/ifblock.component";
import {IfBlockBehaviour} from "../event-relationship/relationship-component/condition.block.component";
/**
 * Created by dattaram on 25/6/18.
 */
export namespace RelationshipBlockMap {
  export const Block_MAP: any = {
    service: ServiceBlockBehaviour,
    updatemodel: UpdateModelBlockBehaviour,
    navigate: NavigateBlockBehaviour,
    notify: NotificationBlockBehaviour,
    condition: ConditionBlockBehaviour,
    elseif: ElseIfBlockBehaviour,
    else: ElseBlockBehaviour,
    if: IfBlockBehaviour
  };
  export const Component_Restrict: any = {
    button: true,
    buttongroup: true,
    buttondropdown: true,
    buttonfloat: true,
    buttonfloatgroup: true,
    accordion: true,
    column: true,
    fieldset: true,
    paginator: true,
    progress: true,
    form: true,
    stepbox: true,
    horizontaltabcontainer: true,
    verticaltab: true,
    rightvertical: true
  };
}

export namespace MethodTypeMap {
  export const METHOD_TYPE_MAP: any = {
    0: '',
    1: 'GET',
    2: 'POST',
    3: 'PUT',
    4: 'DELETE'
  };
}
