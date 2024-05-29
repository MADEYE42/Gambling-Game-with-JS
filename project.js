//1. Deposit some Money
//2. Determine number of lines to bet on
//3.collect the bet amount
//4.Spin the slot machine
//5,Checkl if the user won the money
//6.give the user their money
//7.play again
const prompt = require("prompt-sync")();
const ROWS = 3;
const COLS = 3;

const SYMBOL_COUNTS = {
    "A":2,
    "B":4,
    "C":6,
    "D":8
}
const SYMBOL_VALUES = {
    "A":5   ,
    "B":4,
    "C":3,
    "D":2
}
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
};
const spin = () => {
    const symbols = [];
    for(const [symbol,count] of Object.entries(SYMBOL_COUNTS)){
        for(let i = 0;i<count;i++){
            symbols.push(symbol);
        }
    }
    const reels = [];
    for(let i = 0 ;i<COLS;i++){ 
        reels.push([])
        const reelSymbols= [...symbols];
        for(let j = 0;j<ROWS;j++){
            const RandomIndex = Math.floor(Math.random()*reelSymbols.length);
            const selectedSymbols = reelSymbols[RandomIndex];
            reels[i].push(selectedSymbols);
            reelSymbols.splice(RandomIndex,1);
        }
    }
    return reels
};
const transpose = (reels) =>{
    const rows = [];
    for(let i = 0;i<ROWS;i++){
        rows.push([])
        for(let j = 0;j<COLS;j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
};
const printrows = (rows) => {
    for(const row of rows){
        let rowString = " ";
        for(const[i,symbol] of row.entries()){
            rowString += symbol;
            if(i!=row.length -1 ){
                rowString += " | "
            }
        }
        console.log(rowString)
    }
};
const getWinnings = (rows,bet,lines) =>{
    let winnings = 0;
    for(let i = 0;i<lines;i++){
        const  symbols = rows[i];
        let allSame = true;
        for (const symbol of symbols){
            if(symbol != symbols[0]){
                allSame = false;
                break;
            }
        }
        if(allSame){
            winnings += bet*SYMBOL_VALUES[symbols[0]]
        }
    }
    return winnings
};
const game = () =>{
    let balance = deposit();
    while(true){
        console.log("You have a balance of $"+balance)
        const Lines = NumberofLinestoBetOn();
        const BetAmount = getBet(balance,Lines);
        balance -= BetAmount*Lines;
        const reels = spin();
        const rows = transpose(reels);
        const winnings  = getWinnings(rows,BetAmount,Lines);
        console.log("You won,$ " + winnings.toString())
        printrows(rows);
        if(balance<=0 ){
            console.log("You ran out of amount!!!")
            break;
        }
        const playAgain = prompt("Do you want to play again? (Y/N) : ");
        if(playAgain!="Y"){
            break;
        }
    }
};
game();