<template>
  <div>
    <table ref="table" id="printTable" style="border-right: 0px solid #000000; border-bottom: 0px solid #000000; border-collapse:collapse;">
      <tr v-for="(o1, index1) in fTimer" :key="index1" >
        <td v-for="(o, index) in fCourse" :key="index" :tRow="index1-1" :tCell="index-1" style="border-left: 0px solid #000000; border-top: 0px solid #000000;">
          <ddv style="justify-content: center; display: flex; align-items: center;" :d-top="parseInt(fInitHeight) + 5 + index1 * fHeight + 'px'" :d-left="index * fWidth + 'px'" :ref="'dDv' + index1 + '' + index" d-font-color="#606266" d-background-color="#EEF1F6" v-if="index==0"
               :d-text="o1" :key="index1 + index" :d-width="(fWidth - 1).toString() + 'px'" :d-height="(fHeight - 1).toString() + 'px'" d-box-shadow="" d-weight="bold"></ddv>
          <ddv style="justify-content: center; display: flex; align-items: center;" :d-top="parseInt(fInitHeight) + 5 + index1 * fHeight + 'px'" :d-left="index * fWidth + 'px'" :ref="'dDv' + index1 + '' + index" d-font-color="#606266" d-background-color="#EEF1F6" v-if="index!=0 && index1==0"
               :d-text="o" :key="index1 + index" :d-width="(fWidth - 1).toString() + 'px'" :d-height="(fHeight - 1).toString() + 'px'" d-box-shadow="" d-weight="bold"></ddv>
          <ddv style="justify-content: center; display: flex; align-items: center;" :d-top="parseInt(fInitHeight) + 5 + index1 * fHeight + 'px'" :d-left="index * fWidth + 'px'" :ref="'dDv' + index1 + '' + index" d-background-color="white" v-if="index!=0 && index1!=0 && fMoveTable"
               :d-text="fData[index1-1].cellData[index-1]" :style="{backgroundColor: fData[index1-1].bgColor[index-1], color: fData[index1-1].color[index-1]}"
               @mouseleave.native="mouLeave($event)" @mouseenter.native="mouEnter($event)" @dblclick.native="dbCli($event, fDelbyDbCli)" @mousedown.native="dDown($event, true)" :id="'dDv' + index1 + '' + index" :d-width="(fWidth - 1).toString() + 'px'" :d-height="(fHeight - 1).toString() + 'px'" d-box-shadow="" :key="index1 + index">
<!--        <div v-show="fData[index1-1].cellData[index-1]!=''">-->
            <div v-show="false">
              <div :style="lStyle" class="DdvClass" @mousedown.stop="cliLeftButton($event)"></div>
              <div :style="RStyle" class="DdvClass" @mousedown.stop="cliRightButton($event)"></div>
              <div :style="DStyle" class="DdvClass" @mousedown.stop="cliDownButton($event)"></div>
              <div :style="TStyle" class="DdvClass" @mousedown.stop="cliUpButton($event)"></div>
              <div class="close" @mousedown.stop="cliDelButton($event)"></div>
            </div>
          </ddv>
          <ddv style="justify-content: center; display: flex; align-items: center;" :d-top="parseInt(fInitHeight) + 5 + index1 * fHeight + 'px'" :d-left="index * fWidth + 'px'" :ref="'dDv' + index1 + '' + index" d-background-color="white" v-if="index!=0 && index1!=0 && !fMoveTable"
               :d-text="fData[index1-1].cellData[index-1]" :style="{backgroundColor: fData[index1-1].bgColor[index-1], color: fData[index1-1].color[index-1]}"
               @dblclick.native="dbCli($event, fDelbyDbCli)" :id="'dDv' + index1 + '' + index" :d-width="(fWidth - 1).toString() + 'px'" :d-height="(fHeight - 1).toString() + 'px'" d-box-shadow="" :key="index1 + index"></ddv>
        </td>
      </tr>
    </table>
    <div v-if="felMouse">
      <ddv v-for="(o, index) in fTool" :key="'tool' + index" :ref="'tool' + index" :d-text="o.nameJ" d-width="45px" d-height="45px" :d-left="o.left + 'px'"
         @mouseenter.native="mEnter($event, o.name)" @mouseleave.native="mLeave($event, o.nameJ)" @dblclick.native="dbCliMov($event, fDelbyDbCli)" d-border="" :d-background-color="o.bgColor" :d-font-color="o.color" @mousedown.native="dDown($event, false)"></ddv>
    </div>
    <div v-if="!felMouse">
      <ddv v-for="(o, index) in fTool" :key="'tool' + index" :ref="'tool' + index" :d-text="o.name" :d-width="o.width + 'px'" :d-height="fInitHeight + 'px'" :d-left="o.left + 'px'"
         @dblclick.native="dbCliMov($event, fDelbyDbCli)" d-border="" :d-background-color="o.bgColor" :d-font-color="o.color" @mousedown.native="dDown($event, false)"></ddv>
    </div>
  </div>
</template>

<script>
import Ddv from './Ddv.vue'
/*import * as testIng from './testing.js'*/
import $ from "jquery"

export default {
  name: 'DesignVenue',
  props: {
    rowData: {
      type: Array,
      default: () => ['', '09:00-10:00', '10:00-11:00', '11:00-12:00', '13:00-14:00', '14:00-15:00']
    },
    cellData: {
      type: Array,
      default: () => ['', '篮球场1', '篮球场2', '篮球场3']
    },
    toolData: {
      type: Array,
      default: () => [{
          name: '暂时关闭',
          nameJ: '暂',
          color: 'white',
          bgColor: 'royalblue',
          width: '45'
        },
        {
          name: '设定票价',
          nameJ: '设',
          color: 'white',
          bgColor: 'yellowgreen',
          width: '45'
        }]
    },
    everyWidth: {
      type: String,
      default: '80'
    },
    everyHeight: {
      type: String,
      default: '80'
    },
    moveInto: {
      type: Boolean,
      default: false
    },
    delDbCli: {
      type: Boolean,
      default: false
    },
    elMouse: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Ddv
  },
  data() {
    return {
      //记录滚动条位置X
      fScrollPostionX: 0,
      //记录滚动条位置Y
      fScrollPostionY: 0,
      //方向键是否显示
      vDdvShow: false,
      //操作按钮组
      fTool: this.toolData,
      //自定义类对象
      tDdv: null,
      //自定义时间（行数）
      fTimer: this.rowData,
      //自定义场地（列数）
      fCourse: this.cellData,
      //表格数据
      fData: [],
      //当前移动到的区块
      fMoveDdv: null,
      //当前选中的区块
      fSelDdv: null,
      //实际宽度
      fWidth: parseInt(this.everyWidth) + 1,
      //实际高度
      fHeight: parseInt(this.everyHeight) + 1,
      //表格顶端初始高度
      fInitHeight: '45',
      //是否启用表格内区块移动功能
      fMoveTable: this.moveInto,
      //是否启用双击删除功能
      fDelbyDbCli: this.delDbCli,
      //是否启用工具栏按钮悬停缩放
      felMouse: this.elMouse,
      //鼠标按下的坐标记录
      mMouseX: 0,
      mMouseY: 0,
      //表格内移动区块的坐标
      mLift: '',
      mTop: '',
      lStyle: {
        'left': '5px',
        'transform': 'rotate(315deg)',
        'box-shadow': '-1px -1px 1px white',
        'top': (this.everyHeight / 2 - 4).toString() + 'px'
      },
      RStyle: {
        'right': '5px',
        'transform': 'rotate(135deg)',
        'box-shadow': '-1px -1px 1px white',
        'top': (this.everyHeight / 2 - 4).toString() + 'px'
      },
      DStyle: {
        'bottom': '5px',
        'transform': 'rotate(225deg)',
        'box-shadow': '-1px -1px 1px white',
        'left': (this.everyWidth / 2 - 4).toString() + 'px'
      },
      TStyle: {
        'top': '5px',
        'transform': 'rotate(45deg)',
        'box-shadow': '-1px -1px 1px white',
        'left': (this.everyWidth / 2 - 4).toString() + 'px'
      },
      DelStyle: {
        'right': '5px',
        'transform': 'rotate(135deg)',
        'box-shadow': '-1px -1px 1px white',
        'top': '5px'
      }
    }
  },
  created() {
    //this.tDdv = new testIng.dDvControl()
    this.createTable()
    //console.log(this.tDdv.testOneTwo('a', 'b'))
  },
  methods: {
    //传入外网滚动条坐标
    setWbScroll(x, y) {
      this.fScrollPostionX = x
      this.fScrollPostionY = y
    },
    //鼠标离开取消移动箭头显示
    mouLeave(dDvTmp) {
      if($(dDvTmp.currentTarget).text() != ''){
        $($(dDvTmp.currentTarget).children(1)[1]).hide()
      }
    },
    //鼠标进入显示移动箭头
    mouEnter(dDvTmp) {
      if($(dDvTmp.currentTarget).text() != ''){
        $($(dDvTmp.currentTarget).children(1)[1]).show()
      }
    },
    //点击左侧箭头
    cliLeftButton(tmpp) {
      let zrow = parseInt($($(tmpp.currentTarget)[0]).parent().parent().parent().attr('tRow'))
      //let zcell = parseInt($($(tmpp.currentTarget)[0]).parent().parent().parent().attr('tCell'))
      let idName = $($(tmpp.currentTarget)[0]).parent().parent().attr('id')
      //console.log(row, cell, this.fData)
      let postionRow = 0;
      for(let i=0; i<this.fData[zrow].id.length; i++){
        if(this.fData[zrow].id[i] == idName){
          postionRow = i
          break
        }
        else{
          $('#' + this.fData[zrow].id[i]).css('background-color', $('#' + idName).css('background-color'))
          $('#' + this.fData[zrow].id[i]).css('color', 'ghostwhite')
          $($('#' + this.fData[zrow].id[i]).children(0)[0]).text($($('#' + idName).children(0)[0]).text())
          //$($('#' + this.fData[zrow].id[i]).children(0)[1]).show()
        }
      }
      //console.log(postionRow)
      //左侧数据全部改变
      for(let i=postionRow; i>0; i--){
        //console.log(i)
        this.fData[zrow].bgColor[i-1] = this.fData[zrow].bgColor[postionRow]
        this.fData[zrow].cellData[i-1] = this.fData[zrow].cellData[postionRow]
        this.fData[zrow].color[i-1] = this.fData[zrow].color[postionRow]
        this.fData[zrow].state[i-1] = this.fData[zrow].state[postionRow]
        let lsObj = {
          id: this.fData[zrow].id[i-1],
          moveDdvText: this.fData[zrow].cellData[postionRow],
          title: this.fData[zrow].titleData[i-1]
        }
        this.fData[zrow].object[i-1] = lsObj
      }
    },
    //点击右侧箭头
    cliRightButton(tmpp) {
      let zrow = parseInt($($(tmpp.currentTarget)[0]).parent().parent().parent().attr('tRow'))
      //let zcell = parseInt($($(tmpp.currentTarget)[0]).parent().parent().parent().attr('tCell'))
      let idName = $($(tmpp.currentTarget)[0]).parent().parent().attr('id')
      //console.log(row, cell, this.fData)
      let postionRow = 0;
      for(let i=0; i<this.fData[zrow].id.length; i++){
        if(this.fData[zrow].id[i] == idName){
          postionRow = i
          break
        }
      }
      for(let i=postionRow+1; i<this.fData[zrow].id.length+1; i++){
          $('#' + this.fData[zrow].id[i]).css('background-color', $('#' + idName).css('background-color'))
          $('#' + this.fData[zrow].id[i]).css('color', 'ghostwhite')
          $($('#' + this.fData[zrow].id[i]).children(0)[0]).text($($('#' + idName).children(0)[0]).text())
          //$($('#' + this.fData[zrow].id[i]).children(0)[1]).show()
      }
      //console.log(postionRow)
      //右侧数据全部改变
      for(let i=postionRow+1; i<this.fData[zrow].id.length+1; i++){
        //console.log(i)
        this.fData[zrow].bgColor[i-1] = this.fData[zrow].bgColor[postionRow]
        this.fData[zrow].cellData[i-1] = this.fData[zrow].cellData[postionRow]
        this.fData[zrow].color[i-1] = this.fData[zrow].color[postionRow]
        this.fData[zrow].state[i-1] = this.fData[zrow].state[postionRow]
        let lsObj = {
          id: this.fData[zrow].id[i-1],
          moveDdvText: this.fData[zrow].cellData[postionRow],
          title: this.fData[zrow].titleData[i-1]
        }
        this.fData[zrow].object[i-1] = lsObj
      }
    },
    //点击下方箭头
    cliDownButton(tmpp) {
      let zrow = parseInt($($(tmpp.currentTarget)[0]).parent().parent().parent().attr('tRow'))
      let zcell = parseInt($($(tmpp.currentTarget)[0]).parent().parent().parent().attr('tCell'))
      let idName = $($(tmpp.currentTarget)[0]).parent().parent().attr('id')
      for(let i=zrow; i<this.fTimer.length - 1; i++){
        $('#' + this.fData[i].id[zcell]).css('background-color', $('#' + idName).css('background-color'))
        $('#' + this.fData[i].id[zcell]).css('color', 'ghostwhite')
        $($('#' + this.fData[i].id[zcell]).children(0)[0]).text($($('#' + idName).children(0)[0]).text())
        //$($('#' + this.fData[i].id[zcell]).children(0)[1]).show()
      }
      //下方数据全部改变
      for(let i=zrow; i<this.fTimer.length - 1; i++){
        this.fData[i].bgColor[zcell] = this.fData[zrow].bgColor[zcell]
        this.fData[i].cellData[zcell] = this.fData[zrow].cellData[zcell]
        this.fData[i].color[zcell] = this.fData[zrow].color[zcell]
        this.fData[i].state[zcell] = this.fData[zrow].state[zcell]
        let lsObj = {
          id: this.fData[i].id[zcell],
          moveDdvText: this.fData[i].cellData[zcell],
          title: this.fData[i].titleData[zcell]
        }
        this.fData[i].object[zcell] = lsObj
      }
    },
    //点击上方箭头
    cliUpButton(tmpp) {
      let zrow = parseInt($($(tmpp.currentTarget)[0]).parent().parent().parent().attr('tRow'))
      let zcell = parseInt($($(tmpp.currentTarget)[0]).parent().parent().parent().attr('tCell'))
      let idName = $($(tmpp.currentTarget)[0]).parent().parent().attr('id')
      for(let i=0; i<zrow; i++){
        $('#' + this.fData[i].id[zcell]).css('background-color', $('#' + idName).css('background-color'))
        $('#' + this.fData[i].id[zcell]).css('color', 'ghostwhite')
        $($('#' + this.fData[i].id[zcell]).children(0)[0]).text($($('#' + idName).children(0)[0]).text())
        //$($('#' + this.fData[i].id[zcell]).children(0)[1]).show()
      }
      //下方数据全部改变
      for(let i=0; i<zrow; i++){
        this.fData[i].bgColor[zcell] = this.fData[zrow].bgColor[zcell]
        this.fData[i].cellData[zcell] = this.fData[zrow].cellData[zcell]
        this.fData[i].color[zcell] = this.fData[zrow].color[zcell]
        this.fData[i].state[zcell] = this.fData[zrow].state[zcell]
        let lsObj = {
          id: this.fData[i].id[zcell],
          moveDdvText: this.fData[i].cellData[zcell],
          title: this.fData[i].titleData[zcell]
        }
        this.fData[i].object[zcell] = lsObj
      }
    },
    //点击删除箭头
    cliDelButton(dDvTmp) {
      if($($(dDvTmp.currentTarget)[0]).parent().parent()[0].innerText != '') {
        let lsRow = $($(dDvTmp.currentTarget)[0]).parent().parent().parent().attr('tRow')
        let lsCell = $($(dDvTmp.currentTarget)[0]).parent().parent().parent().attr('tCell')
        this.fData[lsRow].state[lsCell] = '0'
        this.fData[lsRow].bgColor[lsCell] = 'white'
        this.fData[lsRow].color[lsCell] = 'black'
        this.fData[lsRow].object[lsCell] = {}
        this.fData[lsRow].cellData[lsCell] = ''
        let lsId = this.fData[lsRow].id[lsCell]
        $('#' + lsId).css('background', 'white')
        $('#' + lsId).css('color', 'black')
        $($('#' + lsId).children(0)[0]).text('')
        $($('#' + lsId).children(0)[1]).hide()
        $('#' + lsId).css('box-shadow', '')
      }
    },
    //生成表格
    createTable() {
      let lsCourse = this.fCourse
      let lsData = [];
      this.fTimer.forEach(function (tiv, index){
        if(index != 0) {
          let rowD = {
            id: [],
            cellData: [],
            titleData: [],
            state: [],
            bgColor: [],
            color: [],
            object: []
          }
          lsCourse.forEach(function (tiv1, index1) {
            if (index1 != 0) {
              rowD.id.push('dDv' + index + index1)
              rowD.cellData.push('')
              rowD.titleData.push(tiv + ` ` + tiv1)
              rowD.state.push('0')
              rowD.bgColor.push('white')
              rowD.color.push('black')
              rowD.object.push({})
            }
          })
          lsData.push(rowD)
        }
      })
      this.fData = lsData
      lsData = []
      let fTl = this.fTool
      let felP = this.felMouse
      this.fTool.forEach(function (ft, index){
        let rowD = {
          name: ft.name,
          nameJ: ft.name.substr(0, 1),
          color: ft.color,
          bgColor: ft.bgColor,
          width: ft.width,
          left: (() => {
            let fhLen = 0
            for(let i=0;i<index;i++){
              fhLen += parseInt(fTl[i].width) + 10
            }
            return fhLen
          })(),
          index: index
        }
        if(felP){
          rowD.left = (() => {
            let fhLen = 0
            for(let i=0;i<index;i++){
              fhLen += 55
            }
            return fhLen
          })()
          rowD.width = '45'
        }
        lsData.push(rowD)
      })
      this.fTool = lsData

      this.$nextTick(() => {
        for(let i=0; i<this.fTool.length; i++){
          if(this.$refs['tool' + i] != undefined) {
            this.$refs['tool' + i][0].$el.style.backgroundColor = this.fTool[i].bgColor
            this.$refs['tool' + i][0].$el.style.left = this.fTool[i].left + 'px'
            this.$refs['tool' + i][0].$el.style.width = this.fTool[i].width + 'px'
          }
        }
        for(let i=0; i<this.fTimer.length; i++){
          for(let j=0; j<this.fCourse.length; j++){
            if(this.$refs['dDv' + i + j] != undefined) {
              this.$refs['dDv' + i + j][0].$el.style.width = this.fWidth + 'px'
              this.$refs['dDv' + i + j][0].$el.style.left = this.fWidth * j + 'px'
              this.$refs['dDv' + i + j][0].$el.style.height = this.fHeight + 'px'
              this.$refs['dDv' + i + j][0].$el.style.top = 50 + this.fHeight * i + 'px'
              //console.log($(this.$refs['dDv' + i + j][0].$el).children(0).children(1).hide())
            }
          }
        }
      })

      for(let i=0; i<this.fTimer.length; i++){
        for(let j=0; j<this.fCourse.length; j++){
          if(this.$refs['dDv' + i + j] != undefined) {
            if($(this.$refs['dDv' + i + j][0].$el).children(0)[1] != undefined){
              $($(this.$refs['dDv' + i + j][0].$el).children(0)[1]).hide()
              $($(this.$refs['dDv' + i + j][0].$el).children(0)[0]).text('')
            }
          }
        }
      }

      //console.log(lsData)
    },
    //鼠标进入工具栏按钮
    mEnter(dDvTmp, name){
      $($(dDvTmp.currentTarget).children(0)[0]).text(name)
      dDvTmp.currentTarget.style.width = $($(dDvTmp.currentTarget).children(0)[0]).text().length * 18 + 10 + 'px'
      dDvTmp.currentTarget.style.height = '45px'
      $(dDvTmp.currentTarget).css('zIndex', 1)
    },
    //鼠标离开工具栏按钮
    mLeave(dDvTmp, nameJ){
      $($(dDvTmp.currentTarget).children(0)[0]).text(nameJ)
      dDvTmp.currentTarget.style.width = '45px'
      dDvTmp.currentTarget.style.height = '45px'
      $(dDvTmp.currentTarget).css('zIndex', 0)
    },
    //鼠标双击
    dbCli(dDvTmp, pdDbCli) {
      if(pdDbCli) {
        if($(dDvTmp.currentTarget)[0].innerText != '') {
          let lsRow = $(dDvTmp.currentTarget).parent().attr('tRow')
          let lsCell = $(dDvTmp.currentTarget).parent().attr('tCell')
          //console.log($(dDvTmp.currentTarget).parent().attr('tRow'), $(dDvTmp.currentTarget).parent().attr('tCell'))
          this.fData[lsRow].state[lsCell] = '0'
          this.fData[lsRow].bgColor[lsCell] = 'white'
          this.fData[lsRow].color[lsCell] = 'black'
          this.fData[lsRow].object[lsCell] = {}
          this.fData[lsRow].cellData[lsCell] = ''
          let lsId = this.fData[lsRow].id[lsCell]
          $('#' + lsId).css('background', 'white')
          $('#' + lsId).css('color', 'black')
          $($('#' + lsId).children(0)[0]).text('')
          $($('#' + lsId).children(0)[1]).hide()
          $('#' + lsId).css('box-shadow', '')
        }
      }
    },
    //鼠标双击(移动块上)
    dbCliMov(dDvTmp, pdDbCli) {
      if(pdDbCli) {
        this.fTool.forEach(function (ft) {
          if ($($(dDvTmp.currentTarget).children(0)[0]).text().trim() == ft.name) {
            dDvTmp.currentTarget.style.left = ft.left + 'px'
            dDvTmp.currentTarget.style.top = '0px'
          }
        })
      }
    },
    //鼠标按下
    dDown(dDvTmp, pdInto) {
      this.mMouseX = dDvTmp.pageX + this.fScrollPostionX
      this.mMouseY = dDvTmp.pageY + this.fScrollPostionY
      let tmpO = dDvTmp.currentTarget
      this.fSelDdv = tmpO
      this.mLift = tmpO.style.left
      this.mTop = tmpO.style.top
      let oldRow = $($(tmpO).parent()).attr('tRow')
      let oldCell = $($(tmpO).parent()).attr('tCell')
      $(this.fSelDdv).css('zIndex', 1)
      //鼠标移动
      document.onmousemove = (ev) => {
        tmpO.style.top = ev.pageY + this.fScrollPostionY - dDvTmp.offsetY + 'px'
        tmpO.style.left = ev.pageX + this.fScrollPostionX - dDvTmp.offsetX + 'px'
        //console.log(this.fSelDdv.getBoundingClientRect().x)
        tmpO.style.zIndex = '1'
        this.fMoveDdv = null

        for(let dDvNum = 0; dDvNum < this.fTimer.length; dDvNum++){
          for(let dDvNum1 = 0; dDvNum1 < this.fCourse.length; dDvNum1++) {
            let dbDdv = this.$refs['dDv' + dDvNum + '' + dDvNum1][0].$el
            if (tmpO != dbDdv && dDvNum != 0 && dDvNum1 != 0) {
              if (this.testOneTwoForPoint(tmpO, dbDdv)) {
                let lsfSelDdv = $(this.fSelDdv)
                this.fTool.forEach(function (ft){
                  if($(lsfSelDdv.children(0)[0]).text().trim() == ft.name) {
                    dbDdv.style.boxShadow = ft.bgColor + ' 0px 0px 5px inset'
                  }
                })
                this.fMoveDdv = dbDdv
              } else {
                dbDdv.style.boxShadow = ''
              }
            }
          }
        }
      }
      //鼠标抬起
      document.onmouseup = (ev) => {
        if (this.mMouseX != ev.pageX + this.fScrollPostionX && this.mMouseY != ev.pageY + this.fScrollPostionY) {
          let row = -1, cell = -1
          let lsDdv = $(this.fMoveDdv).attr('id')
          this.fData.forEach(function (tiv1, index1) {
            tiv1.id.forEach(function (tiv, index) {
              if (tiv == lsDdv) {
                row = index1
                cell = index
                return
              }
            })
          })
          //如果是在表格内选中某个单元格
          if (row != -1) {
            if (pdInto) {
              this.changeData(row, cell, oldRow, oldCell)
              this.fSelDdv.style.top = $('#' + lsDdv).css('top')
              this.fSelDdv.style.left = $('#' + lsDdv).css('left')
              $('#' + lsDdv).css('left', this.mLift)
              $('#' + lsDdv).css('top', this.mTop)
              //两个容器互换
              let oneRq = $(this.fSelDdv).parent()
              let twoRq = $('#' + lsDdv).parent()
              oneRq.append($('#' + lsDdv))
              twoRq.append($(this.fSelDdv))
              $('#' + lsDdv).css('box-shadow', '')
            } else {
              //如果该单元格之前没有被选择过
              if (this.fData[row].state[cell] == '0') {
                this.fData[row].state[cell] = '1'
                let lsfSelDdv = $(this.fSelDdv)
                let lsfData = this.fData[row]
                /*let lsObj = {
                  moveDdvText: $($(this.fSelDdv).children(0)[0]).text().trim(),
                  selDataId: this.fData[row].id[cell],
                  selDataObj: this.fData[row].cellData[cell],
                  selDataTitle: this.fData[row].titleData[cell]
                }
                this.$emit('onDdvMouseUp', lsObj)*/
                this.fTool.forEach(function (ft) {
                  if ($(lsfSelDdv.children(0)[0]).text().trim() == ft.name) {
                    lsfData.bgColor[cell] = ft.bgColor
                    lsfData.color[cell] = ft.color
                    //赋值行列组合内容
                    //lsfData.cellData[cell] = lsfData.titleData[cell]
                    //$('#' + lsDdv).text(lsfData.cellData[cell])
                    //赋值工具栏内容
                    lsfData.cellData[cell] = ft.name
                    $($('#' + lsDdv).children(0)[0]).text(ft.name)
                    //$($('#' + lsDdv).children(0)[1]).show()

                    $('#' + lsDdv).css('background', ft.bgColor)
                    $('#' + lsDdv).css('color', ft.color)
                  }
                })
              }
              //如果该单元格之前被选择过
              else {
                this.fData[row].state[cell] = '0'
                this.fData[row].bgColor[cell] = 'white'
                this.fData[row].color[cell] = 'black'
                this.fData[row].object[cell] = {}
                this.fData[row].cellData[cell] = ''
                $('#' + lsDdv).css('background', 'white')
                $('#' + lsDdv).css('color', 'black')
                $($('#' + lsDdv).children(0)[0]).text('')
                $($('#' + lsDdv).children(0)[1]).hide()
                $('#' + lsDdv).css('box-shadow', '')
              }
            }
          } else {
            if (pdInto) {
              this.fSelDdv.style.top = this.mTop
              this.fSelDdv.style.left = this.mLift
            } else {
              this.fSelDdv.style.top = '0px'
              let lsfSelDdv = this.fSelDdv
              this.fTool.forEach(function (ft) {
                if ($($(lsfSelDdv).children(0)[0]).text().trim() == ft.name)
                  lsfSelDdv.style.left = ft.left + 'px'
              })
            }
          }
        }
        else {
          if (pdInto) {
            this.fSelDdv.style.top = this.mTop
            this.fSelDdv.style.left = this.mLift
            if($($(this.fSelDdv).children(0)[0]).text() != '' && !this.fDelbyDbCli){
              let lsId = this.fSelDdv.id, lsRow = -1, lsCell = -1
              this.fData.forEach(function (ev, inx){
                for(let i=0; i<ev.id.length; i++){
                  if(ev.id[i] == lsId){
                    lsRow = inx
                    lsCell = i
                    break
                  }
                }
              })
              let lsObj = {
                selDdvId: this.fSelDdv.id,
                selDdvText: $($(this.fSelDdv).children(0)[0]).text().trim(),
                selDdvTitle: [this.fCourse[lsCell + 1], this.fTimer[lsRow + 1]]
              }
              this.$emit('onDdvMouseUp', lsObj)
            }
          } else {
            this.fSelDdv.style.top = '0px'
            let lsfSelDdv = this.fSelDdv
            this.fTool.forEach(function (ft) {
              if ($($(lsfSelDdv).children(0)[0]).text().trim() == ft.name)
                lsfSelDdv.style.left = ft.left + 'px'
            })
          }
        }
        $(this.fSelDdv).css('zIndex', 0)
        document.onmousemove = null
        document.onmouseup = null
      }
    },
    //交换数据
    changeData(row, cell, oldR, oldC) {
      let lsMoveObj = {
        bgColor: '',
        cellData: '',
        color: '',
        id: '',
        object: '',
        state: '',
        titleData: ''
      }
      lsMoveObj.bgColor = this.fData[row].bgColor[cell]
      lsMoveObj.cellData = this.fData[row].cellData[cell]
      lsMoveObj.color = this.fData[row].color[cell]
      lsMoveObj.id = this.fData[row].id[cell]
      lsMoveObj.object = this.fData[row].object[cell]
      lsMoveObj.state = this.fData[row].state[cell]
      lsMoveObj.titleData = this.fData[row].titleData[cell]
      this.fData[row].bgColor[cell] = this.fData[oldR].bgColor[oldC]
      this.fData[row].cellData[cell] = this.fData[oldR].cellData[oldC]
      this.fData[row].color[cell] = this.fData[oldR].color[oldC]
      this.fData[row].id[cell] = this.fData[oldR].id[oldC]
      this.fData[row].object[cell] = this.fData[oldR].object[oldC]
      this.fData[row].state[cell] = this.fData[oldR].state[oldC]
      this.fData[row].titleData[cell] = this.fData[oldR].titleData[oldC]
      this.fData[oldR].bgColor[oldC] = lsMoveObj.bgColor
      this.fData[oldR].cellData[oldC] = lsMoveObj.cellData
      this.fData[oldR].color[oldC] = lsMoveObj.color
      this.fData[oldR].id[oldC] = lsMoveObj.id
      this.fData[oldR].object[oldC] = lsMoveObj.object
      this.fData[oldR].state[oldC] = lsMoveObj.state
      this.fData[oldR].titleData[oldC] = lsMoveObj.titleData
    },
    //获取表格数据
    submitData() {
      //console.log(this.fData)
      let objD = {
        fTimer: this.fTimer,
        fCourse: this.fCourse,
        fTool: this.fTool,
        fData: this.fData,
        fWidth: this.fWidth,
        fHeight: this.fHeight,
        felMouse: this.felMouse
      }
      return objD
    },
    //保存并下载数据
    doSave(value, type, name) {
      let blob;
      if (typeof window.Blob == "function") {
        blob = new Blob([value], {type: type});
      } else {
        let BlobBuilder = window.BlobBuilder || window.MozBlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder;
        let bb = new BlobBuilder();
        bb.append(value);
        blob = bb.getBlob(type);
      }
      let URL = window.URL || window.webkitURL;
      let bloburl = URL.createObjectURL(blob);
      let anchor = document.createElement("a");
      if ('download' in anchor) {
        anchor.style.visibility = "hidden";
        anchor.href = bloburl;
        anchor.download = name;
        document.body.appendChild(anchor);
        let evt = document.createEvent("MouseEvents");
        evt.initEvent("click", true, true);
        anchor.dispatchEvent(evt);
        document.body.removeChild(anchor);
      } else if (navigator.msSaveBlob) {
        navigator.msSaveBlob(blob, name);
      } else {
        location.href = bloburl;
      }
    },
    //随机生成十六进制颜色
    randomHexColor() {
      let hex = Math.floor(Math.random() * 16777216).toString(16); //生成ffffff以内16进制数
      while (hex.length < 6) { //while循环判断hex位数，少于6位前面加0凑够6位
        hex = '0' + hex;
      }
      return '#' + hex; //返回‘#'开头16进制颜色
    },
    //初始化数据
    initData(rowData, cellData, headData, felMouse, eWidth, eHeight, felDel) {
      rowData = ',' + rowData
      cellData = ',' + cellData
      this.fTimer = rowData.split(',')
      this.fCourse = cellData.split(',')
      this.felMouse = felMouse
      this.fDelbyDbCli = felDel
      this.fWidth = eWidth
      this.fHeight = eHeight
      if(headData != '') {
        let lsTools = []
        let objRandomColor = this.randomHexColor
        headData.split(',').forEach(function (tmp) {
          let lsTool = {
            name: tmp,
            color: 'white',
            bgColor: objRandomColor(),
            width: (17 * tmp.length + 10).toString()
          }
          lsTools.push(lsTool)
        })
        this.fTool = lsTools
      }
      setTimeout(this.createTable(), 100)
    },
    //清理数据
    clearData() {
      this.fData.forEach(function (ev){
        for(let i=0; i<ev.state.length; i++){
          ev.state[i] = 0
          ev.bgColor[i] = 'white'
          ev.color[i] = 'black'
          ev.object[i] = {}
          ev.cellData[i] = ''
        }
      })
      this.createTable()
    },
    //写入设置文本
    writeText(objData, dDvText) {
      this.fData.forEach(function (ev){
        for(let i=0; i<ev.id.length; i++){
          if(ev.id[i] == objData.selDdvId){
            ev.cellData[i] = dDvText
            $($("#" + objData.selDdvId).children(0)[0]).text(dDvText)
          }
        }
      })
    },
    //还原数据
    resumeData(fObj){
      this.fTimer = [...fObj.fTimer]
      this.fCourse = [...fObj.fCourse]
      this.fData = JSON.parse(JSON.stringify(fObj.fData))

      setTimeout(this.loadOther(fObj), 100)
    },
    //加载其他数据
    loadOther(fObj) {
      this.fTool = [...fObj.fTool]
      //this.fData = [...this.fDataCopy.fData]
      let lenTool = this.fTool.length
      for(let i=0; i<lenTool; i++){
        this.$refs['tool' + i][0].$el.style.backgroundColor = fObj.fTool[i].bgColor
      }
      this.fWidth = fObj.fWidth
      this.fHeight = fObj.fHeight
      this.felMouse = fObj.felMouse

      this.$nextTick(() => {
        if(!fObj.felMouse) {
          for (let i = 0; i < this.fTool.length; i++) {
            if (this.$refs['tool' + i] != undefined) {
              this.$refs['tool' + i][0].$el.style.backgroundColor = this.fTool[i].bgColor
              this.$refs['tool' + i][0].$el.style.left = this.fTool[i].left + 'px'
              this.$refs['tool' + i][0].$el.style.width = this.fTool[i].width + 'px'
            }
          }
        }
        for(let i=0; i<this.fTimer.length; i++){
          for(let j=0; j<this.fCourse.length; j++){
            if(this.$refs['dDv' + i + j] != undefined) {
              this.$refs['dDv' + i + j][0].$el.style.width = this.fWidth + 'px'
              this.$refs['dDv' + i + j][0].$el.style.left = this.fWidth * j + 'px'
              this.$refs['dDv' + i + j][0].$el.style.height = this.fHeight + 'px'
              this.$refs['dDv' + i + j][0].$el.style.top = 50 + this.fHeight * i + 'px'
              if( i != 0 && j != 0 ) {
                $($($(this.$refs['dDv' + i + j][0].$el)[0]).children(0)[0]).text(this.fData[i-1].cellData[j-1])
              }
            }
          }
        }
      })

      //修改id
      for(let i=0; i<this.fTimer.length; i++){
        for(let j=0; j<this.fCourse.length; j++){
          if($(this.$refs['dDv' + i + j][0].$el).attr('id') != undefined) {
            $(this.$refs['dDv' + i + j][0].$el).attr('id', fObj.fData[i-1].id[j-1])
          }
        }
      }
      //修改id结束
    },
    //检测两个dDv是否有覆盖（点碰撞）
    testOneTwoForPoint(one, two){
      if((this.delPx(one.style.top) >= this.delPx(two.style.top)) &&
          (this.delPx(one.style.top) <= this.delPx(two.style.height) + this.delPx(two.style.top)) &&
          (this.delPx(one.style.left) >= this.delPx(two.style.left)) &&
          (this.delPx(one.style.left) <= this.delPx(two.style.width) + this.delPx(two.style.left))){
        return true
      }
      else
        return false
    },
    //去除px,转整型
    delPx(str) {
      return parseInt(str.replace('px', ''))
    },
    //打印表格
    printTable() {
      let tableToPrint = document.getElementById('printTable')//将要被打印的表格
      let newWin= window.open("")//新打开一个空窗口
      //console.log(tableToPrint.outerHTML.replace(/border: 1px solid/g,"border: 0px solid").replace(/border-right: 0px solid/g, "border-right: 1px solid").replace(/border-top: 0px solid/g, "border-top: 1px solid").replace(/border-left: 0px solid/g, "border-left: 1px solid").replace(/border-bottom: 0px solid/g, "border-bottom: 1px solid"))
      newWin.document.write(tableToPrint.outerHTML.replace(/border: 1px solid/g,"border: 0px solid").replace(/border-right: 0px solid/g, "border-right: 1px solid").replace(/border-top: 0px solid/g, "border-top: 1px solid").replace(/border-left: 0px solid/g, "border-left: 1px solid").replace(/border-bottom: 0px solid/g, "border-bottom: 1px solid").replace(/color: white; border: 0px solid/g, "color: black; border: 0px solid").replace(/ghostwhite/g, 'black'))//将表格添加进新的窗口
      newWin.document.close()//在IE浏览器中使用必须添加这一句
      newWin.focus()//在IE浏览器中使用必须添加这一句
      newWin.print()//打印
      newWin.close()//关闭窗口
    }
  }
}
</script>

<style scoped>

  .DdvClass{
    display: inline-block;
    width: 0;
    height: 0;
    position: absolute;
    border-top: 10px solid red;
    border-right: 10px solid transparent;
  }
  .close {
    position: absolute;
    width: 12px;
    height: 12px;
    top: 3px;
    right: 0px;
  }
  .close::before,
  .close::after {
    position: absolute;
    content: ' ';
    background-color: red;
    left: 1px;
    width: 1px;
    height: 12px;
    box-shadow: -1px -1px 1px white;
  }
  .close::before {
    transform: rotate(45deg);
  }
  .close::after {
    transform: rotate(-45deg);
  }

</style>
