//1. Deposit some Money
//2. Determine number of lines to bet on
//3.collect the bet amount
//4.Spin the slot machine
//5,Checkl if the user won the money
//6.give the user their money
//7.play again
const prompt = require("prompt-sync")();
const deposit = () =>{
    while(true){
        const depositAmount = prompt("Enter the amount to deposit : ");
        const numberDeposited = parseFloat(depositAmount);
        if(isNaN(numberDeposited)||numberDeposited <= 0 ){
            console.log("Invalid Deposit, try again.")
        }
        else{
            return numberDeposited
        }
    }
};
const NumberofLinestoBetOn = () =>{
    while(true){
        const getNum = prompt("Number of lines you want to  bet on :");
        const getIntNum = parseFloat(getNum);
        if(isNaN(getIntNum)||getIntNum<=0||getIntNum>3){
            console.log("Invalid Input !!,try again.");
        }
        else{
            return getIntNum;
        }
    }
};
const getBet = (balance,lines) =>{
    while(true){
        const AmtToBet = prompt("Enter the amount to bet on each line: ");
        const BetAmt = parseFloat(AmtToBet);
        if(BetAmt>balance/lines||balance<=0||isNaN(BetAmt)){
            console.log("Invalid Bet ,try again ")
        }
        else{
            //balance = balance - BetAmt;
            return BetAmt;
        }
    }
}
let balance = deposit();
const Lines = NumberofLinestoBetOn();
const BetAmount = getBet(balance,Lines);
console.log(BetAmount);