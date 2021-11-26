<template>
  <div>
    <DesignVenue :row-data="fTimer" :del-db-cli="felDbcli" move-into :el-mouse="felMouse" :cell-data="fCourse" :tool-data="fTool" ref="dv" :every-width="eWidth" :every-height="eHeight" @onDdvMouseUp="setPj"/>
    <!--        <design-venue ref="dv"/>-->
    <div class="optionArea" @mousedown.stop="moveOptionArea($event)">
      <br/>
      头：<textarea rows="5" cols="50" id="idhead">语文,数学,英语,思想品德,课间操</textarea><br/>
      行：<textarea rows="5" cols="50" id="idrow">(上午)第一节,(上午)第二节,(上午)第三节,(上午)第四节,(下午)第一节,(下午)第二节</textarea><br/>
      列：<textarea rows="5" cols="50" id="idcell">星期一,星期二,星期三,星期四,星期五</textarea><br/>
      宽：<input type="text" id="idwidth" value="128" style="width: 80px"/>&nbsp;&nbsp;&nbsp;&nbsp;高：<input type="text" id="idheight" value="60" style="width: 80px"/><br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" id="idtool"/>工具栏缩放&nbsp;&nbsp;<input type="checkbox" id="iddel"/>启用双击删除<br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="button" value="初始化数据" @click="setInit(1)" id="butInit"/>
      <input type="button" value="清理选择" @click="clearInit"/>
      <input type="button" value="获取数据" @click="getData"/>
      <input type="button" value="获取并下载数据" @click="getDataDownload"/><br/><br/>
      源：<textarea rows="5" cols="50" id="iddata"></textarea><br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="button" value="还原数据" @click="resumeData" id="butResume" />
      <input type="button" value="打印表格" @click="printTable"/>
      <input type="button" value="重置表格" @click="resumeTable"/><br/><br/>
      功能说明：<br/>
      1、上方按钮拖拽到对应表格位置中<br/>
      2、表格内的数据也可以互相拖拽替换<br/>
      3、启用双击删除后，双击表格中某项可以将其删除<br/>
      4、拖拽移动块覆盖也可以删除表格中某项数据<br/>
      5、单击移动块可以使其归位
    </div>
  </div>
</template>

<script>
import DesignVenue from './components/DesignVenue.vue'

export default {
  name: 'App',
  components: {
    DesignVenue
  },
  data() {
    return {
      //自定义时间（行数）
      fTimer: [],
      //自定义场地（列数）
      fCourse: [],
      //自定义工具栏
      fTool: [],
      //启用缩放
      felMouse: false,
      //启用双击删除
      felDbcli: false,
      //区块宽度
      eWidth: '128',
      //区块高度
      eHeight: '60'
    }
  },
  created() {
    //this.setInit()
  },
  mounted() {
    //this.felMouse = false
    this.setInit(0)
  },
  methods: {
    moveOptionArea(dDvTmp) {
      let tmpO = dDvTmp.currentTarget
      //鼠标移动
      document.onmousemove = (ev) => {
          if(dDvTmp.toElement.id == "") {
          tmpO.style.top = ev.clientY - dDvTmp.offsetY + 'px'
          tmpO.style.left = ev.clientX - dDvTmp.offsetX + 'px'
        }
      }
      //鼠标抬起
      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
      }
    },
    setPj(data) {
      let name = prompt("请输入要设置的值", data.selDdvText)
      if (name!=null && name!=""){
        this.$refs.dv.writeText(data, name)
      }
    },
    getData() {
      let objData = this.$refs.dv.submitData()
      document.getElementById('iddata').value = JSON.stringify(objData)
      console.log(objData)
    },
    getDataDownload() {
      this.$refs.dv.doSave(JSON.stringify(this.$refs.dv.submitData()),"text/latex", "dDvData.txt")
    },
    clearInit() {
      this.$refs.dv.clearData()
    },
    resumeData() {
      try {
        let dataSrc = JSON.parse(document.getElementById('iddata').value)
        document.getElementById('idcell').value = dataSrc.fCourse
        document.getElementById('idcell').value = document.getElementById('idcell').value.substr(1)
        document.getElementById('idrow').value = dataSrc.fTimer
        document.getElementById('idrow').value = document.getElementById('idrow').value.substr(1)
        document.getElementById('idwidth').value = dataSrc.fWidth
        document.getElementById('idheight').value = dataSrc.fHeight
        document.getElementById('idtool').checked = dataSrc.felMouse
        document.getElementById('iddel').checked = dataSrc.felDbcli
        let strNames = ''
        dataSrc.fTool.forEach(function (tmp){
          strNames += tmp.name + ','
        })
        document.getElementById('idhead').value = strNames.substr(0, strNames.length - 1)
        this.$refs.dv.resumeData(dataSrc)
        document.getElementById('butInit').disabled = true
        document.getElementById('butResume').disabled = true
      }
      catch {
        console.log('还原数据格式错误！')
      }
    },
    setInit(num) {
      this.felMouse = document.getElementById('idtool').checked
      this.felDbcli = document.getElementById('iddel').checked
      this.eWidth = document.getElementById('idwidth').value
      this.eHeight = document.getElementById('idheight').value
      let pdCf = false
      let rowData = document.getElementById('idrow').value
      for(let i=0; i<rowData.split(',').sort().length - 1; i++){
        if(rowData.split(',').sort()[i] == rowData.split(',').sort()[i+1]){
          pdCf = true
          break
        }
      }
      let cellData = document.getElementById('idcell').value
      for(let i=0; i<cellData.split(',').sort().length - 1; i++){
        if(cellData.split(',').sort()[i] == cellData.split(',').sort()[i+1]){
          pdCf = true
          break
        }
      }
      let headData = document.getElementById('idhead').value
      for(let i=0; i<headData.split(',').sort().length - 1; i++){
        if(headData.split(',').sort()[i] == headData.split(',').sort()[i+1]){
          pdCf = true
          break
        }
      }
      if(!pdCf) {
        this.$refs.dv.initData(rowData, cellData, headData, this.felMouse, this.eWidth, this.eHeight, this.felDbcli)
        if(num == 1) {
          document.getElementById('butInit').disabled = true
          document.getElementById('butResume').disabled = true
        }
      }
      else
        alert('头、行、列的值不可以重复！')
    },
    printTable() {
      this.$refs.dv.printTable()
    },
    resumeTable() {
      window.location.reload()
    }
  }
}
</script>

<style>

  .optionArea{
    background: slategray;
    position: fixed;
    right: 0px;
    padding: 10px;
    color: white;
    width: 410px;
    user-select: none;
  }

</style>

<!--<template>
  <div>
    <design-venue/>
  </div>
</template>

<script>
import DesignVenue from './components/DesignVenue.vue'
export default {
  name: 'App',
  components: {
    DesignVenue
  }
}
</script>

<style>
</style>-->