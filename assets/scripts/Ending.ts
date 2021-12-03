
import { _decorator, Component, Label, CCInteger, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Ending')
export class Ending extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    @property({ type: Label })
    private lb1 = null;

    @property({ type: Label })
    private lb2 = null;

    @property({ type: Label })
    private lb3 = null;

    @property({ type: Node })
    private continueNode = null;

    @property({ type: Node })
    private gameNode = null;

    @property({ type: Node })
    private titleNode = null;

    //@resultCode
    public onContinue () {
      this.node.active = false
      this.titleNode.active = true
    }

    //delay to enable click to continue
    public onEnable () {
      this.continueNode.active = false

      this.scheduleOnce(function() {
        this.continueNode.active = true
      }, 3);
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.0/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
 */
