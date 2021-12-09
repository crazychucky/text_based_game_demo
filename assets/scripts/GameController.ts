
import { _decorator, Component, instantiate, Node, RichText, CCFloat } from 'cc';
// import { QUIZ_TIME,QUIZ_TOTAL } from './Config';
const { ccclass, property } = _decorator;

let NEW_PLOT_SCROLL_TIME:number = 0.2

@ccclass('GameController')
export class GameController extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    @property({ type: Node })
    private textLayout = null;

    @property({ type: Node })
    private textLb = null;

    @property({ type: Node })
    private scroll = null;

    onLoad () {
      this.addAnswerListener()
    }

    addAnswerListener () {
      let asNode = this.node.getChildByName("Answers")
      let asList = asNode.children
      for (let elem of asList) {
        let btn = elem.getChildByName('btn')
        btn.on('chose_answer', (option) => {
          this.onChose(option)
        });
      }
    }

    onChose (option) {
      console.log(option)
      //TODO:find the next plot and update
      // this.updatePlot("New Add" + option)
    }

    updatePlot (newTxt: string) {
      let node = instantiate(this.textLb);
      let rt:RichText = node.getComponent("cc.RichText")
      rt.string = newTxt
      this.textLayout.addChild(node)
      let sc = this.scroll.getComponent("cc.ScrollView")
      sc.scrollToBottom(NEW_PLOT_SCROLL_TIME)
    }
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
