<template>
  <div class="dDv" :style="dStyle">
    <div class="tDv">{{ this.dText }}</div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Ddv",
  props: {
    dWidth: {
      type: String,
      default: '80px'
    },
    dHeight: {
      type: String,
      default: '80px'
    },
    dTop: {
      type: String,
      default: '0px'
    },
    dLeft: {
      type: String,
      default: '0px'
    },
    dBackgroundColor: {
      type: String,
      default: 'lightgray'
    },
    dText: {
      type: String,
      default: 'Ddv'
    },
    dFontColor: {
      type: String,
      default: 'black'
    },
    dBoxShadow: {
      type: String,
      default: '3px 3px 3px #888888'
    },
    dBorder: {
      type: String,
      default: '1px solid #DFE6EC'
    },
    dWeight: {
      type: String,
      default: ''
    },
    dIndex: {
      type: String,
      default: ''
    },
    dPosition: {
      type: String,
      default: 'fixed'
    }
  },
  data() {
    return{
      dStyle: {
        'height': this.dHeight,
        'width': this.dWidth,
        'top': this.dTop,
        'left': this.dLeft,
        'background-color': this.dBackgroundColor,
        'color': this.dFontColor,
        'box-shadow': this.dBoxShadow,
        'border': this.dBorder,
        'font-weight': this.dWeight,
        'z-Index': this.dIndex
      }
    }
  }
}
</script>

<style scoped>
  .dDv {
    /*position: fixed;*/
    position: absolute;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
  }
  .tDv {
    pointer-events: none;
  }
</style>