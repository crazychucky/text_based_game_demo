
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = TestButton
 * DateTime = Sat Oct 02 2021 16:16:30 GMT+0800 (中国标准时间)
 * Author = crazychucky
 * FileBasename = TestButton.ts
 * FileBasenameNoExtension = TestButton
 * URL = db://assets/TestButton.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */
 
@ccclass('StartGame')
export class StartGame extends Component {
    @property({ type: Node })
    private titleNode = null;

    @property({ type: Node })
    private gameNode = null;

    @property({ type: Node })
    private endingNode = null;

    onLoad() {
      // this.titleNode.active = true;
      // this.gameNode.active = false;
      // this.endingNode.active = false;
    }

    // update (deltaTime: number) {
    //     // [4]
    // }

    onClick(){
      this.titleNode.active = false;
      this.gameNode.active = true;

      // // 获取脚本组件
      let _gameController = this.gameNode.getComponent('GameController');
      _gameController.startGame()
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/en/scripting/life-cycle-callbacks.html
 */
