let displayPanelNum = 0;
let operation = [];
let numCurrent = "";
let followUp = false;
const nameBtn = "btn";


const numberConcat = (num, numConcat) => {
    if (numConcat){
        numConcat += num
    }else{
        numConcat = num
    }
    return numConcat
}

const numberPush = (num) => {
    if (Number.isInteger(parseFloat(num))){
        operation.push(parseInt(num))
    }
    else{
        operation.push(parseFloat(num))
    }
    numCurrent = ""
}

const isNumeric = (val) => {
    return !isNaN(parseInt(val))
}

const pointHandler = () => {
    if (numCurrent === ""){
        numCurrent = "0."
        if (displayPanelNum === 0){
            displayPanelNum += "."
        }else{
            displayPanelNum += "0."
        }
    }else if (!numCurrent.includes(".")){
        numCurrent = numberConcat(".", numCurrent)
        displayPanelNum += "."
    }

// hay un problema cuando sumas algunos números con coma a otros, no sé qué es. Ejemplo: 2.3 + 0.4
}


const displayChange = (value) => {
    console.log(value)
    if (displayPanelNum === 0 && isNumeric(value)){
        displayPanelNum = value
    }else if (isNumeric(value)){
        displayPanelNum += value
    }
    else{
        switch (value){
            case "Addition":
                displayPanelNum += "+"
                break
            case "Substraction":
                displayPanelNum += "-"
                break
            case "Multiplication":
                displayPanelNum += "x"
                break
            case "Division":
                displayPanelNum += "÷"
                break
        }
    }
}

const insertResult = (i, res) => {
    operation[i-1] = res
    operation.splice(i, 2)
    return 0
}

const getResult = () => {
    for(let i = 0; i <= operation.length; i++){
        if(operation[i] === "Multiplication"){
            const res = operation[i-1] * operation[i+1]
            i = insertResult(i, res)
        }
        if(operation[i] === "Division"){
            const res = operation[i-1] / operation[i+1]
            i = insertResult(i, res)
        }
    }
    for(let i = 0; i <= operation.length; i++){
        if(operation[i] === "Addition"){
            const res = operation[i-1] + operation[i+1]
            i = insertResult(i, res)
        }
        if(operation[i] === "Substraction"){
            const res = operation[i-1] - operation[i+1]
            i = insertResult(i, res)
        }
    }

    displayPanelNum = operation
    followUp = true
}

const normalOperation = (buttonId) => {
    if (isNumeric(buttonId)){
        displayChange(buttonId)
        numCurrent = numberConcat(buttonId, numCurrent)
    }else if (buttonId == "Point"){
        pointHandler()
    }
    else if (buttonId == "Equal"){
        numberPush(numCurrent)
        getResult()
    }
    else if(displayPanelNum !== 0){
        displayChange(buttonId)
        numberPush(numCurrent)
        operation.push(buttonId)
    }
}

const followUpOperation = (buttonId) => {
    if (isNumeric(buttonId)){
        operation = []
        displayPanelNum = 0
        displayChange(buttonId)
        numCurrent = numberConcat(buttonId, numCurrent)
    }else if (buttonId == "Point"){
        operation = []
        displayPanelNum = 0
        pointHandler()
    }else if (buttonId !== "Equal"){
        displayChange(buttonId)
        operation.push(buttonId)
    }
    followUp = false
}

const buttonHandler = (eventId) => {
    let buttonId = eventId.substring(nameBtn.length)
    if (buttonId == "Clear"){
        displayPanelNum = 0
        operation = []
        followUp = false
    }else if (!followUp){
        normalOperation(buttonId)
    }
    else{
        followUpOperation(buttonId)
    }
    displayPanel.innerText = displayPanelNum
}

const btnAnimation = (e, button) => {
    e.preventDefault;
    button.classList.remove("buttonAnim");
    void button.offsetWidth;
    button.classList.add("buttonAnim");
}

const clickHandler = (e) => {
    let id = e.target.id
    if (id.includes(nameBtn)){
        buttonHandler(id)
        btnAnimation(e, e.target)
    }
}


let displayPanel = document.getElementById("displayPanel")
displayPanel.innerText = displayPanelNum

document.onclick = clickHandler