
import { _decorator, Component, instantiate, Node, RichText, Label, resources, JsonAsset, CCInteger } from 'cc';
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
    private nextBtn = null;

    @property({ type: Node })
    private scroll = null;

    @property({ type: Map })
    private _plotMap = null

    @property({ type: CCInteger })
    private _step = 1

    onLoad () {
      this.addAnswerListener()
    }

    start () {
      this._loadAndStart()
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

    _loadAndStart () {
      if(this._plotMap != null){
        this._startGame()
        return
      }
      resources.load("configs/plot", JsonAsset, (err, JsonAsset) => {
        if (err) {
          console.log(err)
          return
        }
        let json = JsonAsset.json;
        console.log(json)
        let list = json["plot"]
        let plotMap = new Map()
        for (let entry of list) {
          let t = new Map()
          t["plot"] = entry["plot"]
          let branch = entry["branch"]
          if (branch != null){
            let ba = branch.split("|") 
            let answerList = []
            for (let choiceData of ba) {
              let tmp = choiceData.split(",") 
              let choice = new Map()
              choice["des"] = tmp[0]
              choice["goto"] = tmp[1]
              answerList.push(choice)
            }
            t["branch"] = answerList
          }
          t["end"] = entry["end"]
          let kid:number = entry["kid"]
          plotMap[kid] = t
        }
        this._plotMap = plotMap
        this._startGame()
      })
    }

    _startGame () {
      this._step = 1
      let data = this._plotMap[this._step]
      let rt:RichText = this.textLb.getComponent("cc.RichText")
      rt.string = data.plot
      this._checkChoice(data.branch)
    }

    onNext () {
      this._step = this._step + 1
      let data = this._plotMap[this._step]
      this.updatePlot(data.plot)
      this._checkChoice(data.branch)
    }

    _checkChoice (branches) {
      let asNode = this.node.getChildByName("Answers")
      if(branches == null){
        asNode.active = false
        this.nextBtn.active = true
        return
      }
      this.nextBtn.active = false
      let asList = asNode.children
      for (let i in asList) {
        let n = asList[i]
        let choice = branches[i]
        if(choice == null){
          n.active = false
        }else{
          n.active = true
          let btn = n.getChildByName('btn')
          let tmp = btn.getChildByName('text')
          let lb = tmp.getComponent("cc.Label")
          lb.string = choice.des

          let script = btn.getComponent('AnswerBtn')
          script.setOption(choice.goto)
        }
      }
      asNode.active = true
    }

    onChose (option) {
      // console.log(option)
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
