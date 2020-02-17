// KENT WONG, 00318833, Tutorial B05
// query selectors
// reg buttons
const numbButtons = document.querySelectorAll('[data-num]') // select all data nums
const operationButtons = document.querySelectorAll('[data-op]') // select all data

// special objects
const currOpText = document.querySelector('[data-curr-op]')
const prevOpText = document.querySelector('[data-prev-op]')
const allClearButton = document.querySelector('[data-clear]')
const delButton = document.querySelector('[data-delete]')
const computeButton = document.querySelector('[data-compute]')

// general calc class with
// Constructor takes prevop and currop
class Calculator {
    constructor(prevOpText,currOpText) {
        // local vars take in from construc args
        this.prevOpText = prevOpText
        this.currOpText = currOpText
        this.thecurrentop = '' // initalize empty current op
        this.theprevop = '' // init the empty prev op
        this.lastcomputedanswer = '' 
    }

    // class methods

        //clear
        clear() {
            this.thecurrentop = '' // destroy instance var currentop
            this.theprevop = '' // destroy instance var theprevop
            this.op = undefined // remove the operation
        }
        //append method
        // params: userinput type: any, but should be an "integer"
        // used in the for loop
        appendNum(userinput) {
            
            if (this.thecurrentop.toString().includes('.') && userinput === '.'){
                return
            }
            this.thecurrentop = this.thecurrentop.toString() + userinput.toString()
        }

        //refresh method
        // params: none
        refresh() {
            this.currOpText.innerText = this.thecurrentop

            if (this.op != null) {
                this.prevOpText.innerText = this.theprevop + this.op
            }

            // check if op is undef and last computed answer is still empty str
            if (this.op === undefined && this.lastcomputedanswer !== '') {
                this.prevOpText.innerText = 'ans:' + this.lastcomputedanswer
            }
            
            // this will clear out the display everytime refresh is called if undefined, do not use as thats not how the google calc works
            // if (this.op === undefined) {
            //     this.prevOpText.innerText = ''
            // }

        }

        //compute method
        // params: none
        // change prev and curr answers
        // switch depending on op and return
        // clear out the instance vars so it's ready for next calcs
        compute() {
            let work
            const prevanswer = parseFloat(this.theprevop)
            const currentanswer = parseFloat(this.thecurrentop)
            
            if (isNaN(prevanswer) || isNaN(currentanswer)){
                return
            }
            
            switch (this.op) {

                case '+':
                    work = prevanswer + currentanswer
                    break // get out of switch
                case '-':
                    work = prevanswer - currentanswer
                    break // get out of switch
                case '*':
                    work = prevanswer * currentanswer
                    break // get out of switch
                case '÷':
                    work = prevanswer / currentanswer
                    break // get out of switch
                default:
                    work = 'ERROR'
            }
            this.thecurrentop = work
            this.op = undefined
            this.theprevop = ''
            this.lastcomputedanswer = work

        } 


        //delete method
        // params: none
        delete() {

            let strlength = this.thecurrentop.length
            let substr = this.thecurrentop.toString()
            this.thecurrentop = substr.substring(0, strlength -1 );// take everything but slice the last

        }
        // opselect method
        // params:op type: any, but should be a mathematical "operator"
        opselect(op) {
            
            if (this.thecurrentop === '') {
                return
            } // check if empty str
            if (this.theprevop !== '') {
                this.compute()
            }

            this.op = op
            this.theprevop = this.thecurrentop
            this.thecurrentop = ''
        }

} // end of calc class

// make an instance of the calc 
const calc = new Calculator(prevOpText, currOpText)

// find number buttons
// we're going to loop through all the numb butts we found
// then for each numb butt as a butt, attach add event listeners
// everytime theres a click
// call append and refresh
// append will shove the innertext into the calc.currOp (so I press 5, I see 5)
// ok then refresh
// personal note:
// maybe check if there's a better dom way to acquire/grab these buttons?

// grab the buttons for numbers
numbButtons.forEach(butt => {
    butt.addEventListener('click', () => {
        calc.appendNum(butt.innerText)
        calc.refresh()
        })
    })

// grab the buttons for math operators
operationButtons.forEach(butt => {
    butt.addEventListener('click', () => {
        calc.opselect(butt.innerText)
        calc.refresh()
        })
    })

// add listeners for clicky clicks
computeButton.addEventListener('click', butt => {
    calc.compute()
    calc.refresh()
})

allClearButton.addEventListener('click', butt => {
    calc.clear()
    calc.refresh()
})

delButton.addEventListener('click', butt => {
    calc.delete()
    calc.refresh()
})
