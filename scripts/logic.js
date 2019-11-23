/*
    1. As the page loads, we need to "wire-up" the buttons
    2. Also, prepare a random number as the game starts 
    3. As the user submits their answer:
        3a. We will take the input value, and compare it against the random number 
        3b. If the number matched, we will hsow the "win" visuals.
        3c. If the nubmer did not match, we will show the "lose" visuals.
        3d. If the user did not submit the number, 
            3d1. Alert the user that the input is invalid 
        3e. Keep count of their attemps 
    4. If the user clicks the restart button:
        4a. Clear up any win/lose visual indications 
        4b. Reset the counter for the number of attemps 
        4c. Clear off previous inputs 

    How to change the games visuals? 
    - We can point to the elements, and toggle the "hide" class
    - We also need to change the class button "win" and "lose"
 */


const generateRandomNumberWithinRange = function(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

const submitNumber = function(event){
    event.preventDefault();

    const numberTextField = document.querySelector("#numberTextInput");
    const submittedNumber = Number(numberTextField.value);
    window.attempts += 1;

    if(Number.isNaN(submittedNumber)){
        window.alert("Please enter a number!");
        return;
    }       

    if(submittedNumber === window.randomNumber){
        updateUIWithStatus("win");
    }else{
        updateUIWithStatus("lose");
    }
    console.log(window.attempts);
}

const restartGame = function(){
    const min = 1;
    const max = 5;
    window.randomNumber = generateRandomNumberWithinRange(min, max);
    window.attempts = 0;

    const inputLabel = document.querySelector("span.input-label");
    const labelText = inputLabel.textContent; //"Enter a number between {x} and {y}"
    const newLabel = labelText.replace("{x}", min).replace("{y}", max); //"Enter a number between 1 and 5"
    inputLabel.textContent = newLabel; //Replace the old textContent with new textContent

    const topBorder = document.querySelector(".feedback-divider:first-child");
    const bottomBorder = document.querySelector(".feedback-divider:last-child");
    const statusText = document.querySelector(".feedback-text .status");
    const attemptsText = document.querySelector(".attempts");

    topBorder.classList.add("hide");
    bottomBorder.classList.add("hide");
    statusText.classList.add("hide");
    attemptsText.classList.add("hide");
}

const updateUIWithStatus = function(status){
    const topBorder = document.querySelector(".feedback-divider:first-child");
    const bottomBorder = document.querySelector(".feedback-divider:last-child");
    const statusText = document.querySelector(".feedback-text .status");
    const attemptsText = document.querySelector(".attempts");
    let feedback;


    const text= `You tried ${window.attempts} time${window.attempts === 1 ? "":"s"}`; 
    attemptsText.textContent = text;
    topBorder.classList.remove("hide", "win", "lose");
    bottomBorder.classList.remove("hide", "win", "lose");
    statusText.classList.remove("hide", "win", "lose");
    attemptsText.classList.remove("hide");

    topBorder.classList.add(status);
    bottomBorder.classList.add(status);
    statusText.classList.add(status);

    if(status === "win"){
        feedback = "You Win";
    }else if(status === "lose"){
        feedback = "You Lose";
    }

    statusText.textContent = feedback;
}

document.querySelector("#taskForm").addEventListener("submit", submitNumber);
document.querySelector("#taskForm").addEventListener("reset", restartGame);
restartGame();