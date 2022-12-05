<template>
      <div class="main">
      <Alert :title="title" :description="description" class="alertik" @close="closeError" v-if="error"/>
      <div class="calculator-block">
    <div class="input-block">
      <textarea class="input-sum" autofocus rows="7" v-model="valueVisible" ref="textarea" @keydown="controlPressedKey"></textarea>
      <p>{{actualCalc}}</p>
    </div>
    <div class="separator-block">
      <div class="icon" :class="{ backspaceEnabled: true }">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="gray"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          :stroke="valueVisible ? backspaceIcon.active : backspaceIcon.passive"
          @click="handleBackspace"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z"
          />
        </svg>
      </div>
    </div>
    <div class="button-block">
      <div
        class="btn"
        :class="{
          operators: operators.includes(char),
          equal: char === '=',
          clear: char === 'C'
        }"
        v-for="char in characters"
        :key="char"
        @click="handleBtnsClick(char)"
      >
        {{ char }}
      </div>
    </div>
  </div>
      </div>

</template>

<script>
import Alert from '../widgets/Alert';
import config from '../config/errors.json';
import calcPrepare from '../mixins/prepareCalc'

export default {
  data() {
    return {
      characters: ["C","()","%","÷","7","8","9","x", "4","5","6","-","1","2","3","+","+/-","0",".","="],
      operators: ["%", "÷", "x", "-", "+", "()"],
      mathOps: ['+', '÷', 'x', '-'],
      backspaceIcon: {passive: "#c1dfa3", active: "#569415" },
      valueVisible: '',
      title: '',
      description: '',
      actualCalc: '',
      error: false,
      config
    };
  },
  components: {
    Alert
  },
  mixins: [calcPrepare],
  methods: {
    handleBtnsClick(char) {
      this.focus();

      if(!['C', '=', '()', '+/-'].includes(char))
      this.valueVisible += char;

      if([...this.mathOps, '%'].includes(char) && (this.valueVisible.length === 1)) this.clear();

      if(['()', '.', '+/-', 'C'].includes(char)) this.makeCharWork(char);

      //enter
      if(char === '=') {
        if(this.mathOps.includes(this.valueVisible.at(-1))) {
          this.showError(config.notFinished.title, config.notFinished.description)
          return false; 
        }
      else
        this.calculate(this.calcValue)
      }
    },
    controlPressedKey(event) {
      let allowedChars = [...this.characters, 'Backspace', '(', ')', 'ArrowRight', 'ArrowLeft', '/', '*']
      if(!allowedChars.includes(event.key) || event.key === 'x')
        event.preventDefault();
    },
    calculate(string) {
     let calc = function(string) {
        return new Function( 'return ' + string )();
      }
      this.actualCalc = calc(string);
    },
    clear() {
      this.valueVisible = '';
      this.actualCalc = '';
    },
    focus() {
      this.$refs.textarea.focus();
    },
    checkDotUsageRepeatedly() {
      let a = this.valueVisible.indexOf(this.operators[1]) < this.valueVisible.indexOf('.');
      let b = this.valueVisible.indexOf(this.operators[2]) < this.valueVisible.indexOf('.');
      let c = this.valueVisible.indexOf(this.operators[3]) < this.valueVisible.indexOf('.');
      let d = this.valueVisible.indexOf(this.operators[4]) < this.valueVisible.indexOf('.');
      if(a === b === c === d === true)
        return true;
      else return false;
    },
    showError(title, desc) {
      this.clear();
      this.title = `Error: ${title}!`;
      this.description = desc;
      this.error = true;

      setTimeout(() => this.error = false, 5000);
    },
    closeError() {
      this.error = false;
    },
    handleBackspace() {
      this.valueVisible ? this.valueVisible = this.valueVisible.slice(0, this.valueVisible.length-1) : '';
    }
  },
  computed: {
    calcValue() {
      let valVis = this.valueVisible;
      let result = valVis.replaceAll('÷', '/').replaceAll('x', '*');
      return result;
    }
  }
};
</script>

<style scoped>

</style>
