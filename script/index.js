let displayPanelNum = 0;
let numbers = [];
let numCurrent = "";
let operation;
let result;
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
        numbers.push(parseInt(num))
    }
    else{
        numbers.push(parseFloat(num))
    }
    numCurrent = ""
}

const isNumeric = (val) => {
    return !isNaN(parseInt(val))
}

const addition = (total, num) => total + num
const substraction = (total, num) => total - num
const multiplication = (total, num) => total * num
const division = (total, num) => total / num

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

const getResult = () => {
    switch (operation){
        case "Addition":
            console.log(numbers)
            result = numbers.reduce(addition)
            break
        case "Substraction":
            result = numbers.reduce(substraction)
            break
        case "Multiplication":
            result = numbers.reduce(multiplication)
            break
        case "Division":
            result = numbers.reduce(division)
            break
    }
    displayPanelNum = result
    numbers = [result]
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
        operation = buttonId
        displayChange(buttonId)
        numberPush(numCurrent)
    }
}

const followUpOperation = (buttonId) => {
    if (isNumeric(buttonId)){
        numbers = []
        displayPanelNum = 0
        displayChange(buttonId)
        numCurrent = numberConcat(buttonId, numCurrent)
    }else if (buttonId == "Point"){
        numbers = []
        displayPanelNum = 0
        pointHandler()
    }else if (buttonId !== "Equal"){
        operation = buttonId
        displayChange(buttonId)
    }
    followUp = false
}

const buttonHandler = (eventId) => {
    let buttonId = eventId.substring(nameBtn.length)
    if (buttonId == "Clear"){
        displayPanelNum = 0
        numbers = []
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
    if (id.includes("btn")){
        buttonHandler(id)
        btnAnimation(e, e.target)
    }
}


let displayPanel = document.getElementById("displayPanel")
displayPanel.innerText = displayPanelNum

document.onclick = clickHandler
