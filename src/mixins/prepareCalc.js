import config from '../config/errors.json'

export default {
    data() {
        return {
            config
        }
    },
    watch: {
        valueVisible(nw, old) {
          ['+', '÷', 'x', '-', '.'].map((op,i, arr)=> {
          if(nw === old + op && (nw.at(-1) === op && nw.at(-2) === op)) setValueVisible(old);
          if(nw.at(-1) === op && arr.includes(nw.at(-2))) setValueVisible(old);
          });
    
          if(nw.includes('.') && this.valueVisible.lastIndexOf('.') > this.valueVisible.indexOf('.') && this.checkDotUsageRepeatedly()) setValueVisible(old);
          if(nw.includes('%') && nw.lastIndexOf('%') !== -1 && nw.lastIndexOf('%') === nw.length-1) {
            let oldVal = (+old / 100).toString();
            this.clear();
            if(isNaN(oldVal)) {
              this.showError(config.percent.title, config.percent.description)
            } else
            setValueVisible(oldVal);
          }
    
          //for 0000 bug
          if(this.valueVisible.at(0) === '0' && !this.valueVisible.includes('.') && nw === old + '0' && old !== '')
          this.setValueVisible(old);

        },
        actualCalc(nw) {
          if(!isFinite(nw)) this.showError(config.forever.title, config.forever.description);
        }
      },
      methods: {
        makeCharWork(char) {
            switch(char) {
              case '()':
              if(
                this.valueVisible.indexOf('(') == -1 ||
                this.valueVisible.indexOf('(') != -1 &&
                this.valueVisible.indexOf(')') != -1 &&
                this.valueVisible.lastIndexOf('(') < this.valueVisible.lastIndexOf(')')
              ) this.valueVisible += '(';
              else if(
                this.valueVisible.indexOf('(') != -1 &&
                this.valueVisible.indexOf(')') == -1 ||
                this.valueVisible.indexOf('(') != -1 &&
                this.valueVisible.indexOf(')') != -1 &&
                this.valueVisible.lastIndexOf('(') > this.valueVisible.lastIndexOf(')')
              ) this.valueVisible += ')';
      
              if(!isNaN(this.valueVisible.at(this.valueVisible.lastIndexOf('(')-1))) {
                this.valueVisible = this.valueVisible.slice(0, this.valueVisible.length-1) + 'x(';
              }
              break;
              case '.':
              if(this.valueVisible.length == 1)
                this.valueVisible = '0.';
              if(this.valueVisible.at(-2) === '(')
                this.valueVisible = this.valueVisible.slice(0,-1) + '0.'
              break;
              case '+/-':
              this.valueVisible === '' ? this.valueVisible += '(-' : this.valueVisible === '(-' ? this.clear() : '';
              ['+', '-', 'x', '÷'].includes(this.valueVisible.at(-1)) && !this.valueVisible.includes('(-') ? this.valueVisible += '(-' : '';
             if(!isNaN(+this.valueVisible)) {
              let val = this.valueVisible;
              this.clear();
              this.valueVisible = '(-' + val;
             }
             break;
             case 'C':
             this.clear();
             break;
            }
          },
          setValueVisible(val) {
            this.valueVisible = val;
          }
      }
}