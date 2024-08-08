/*
legga un file da un path inserito in input dall’utente (può essere un path locale o un
indirizzo web)
- il numero totale di parole nel file
- il numero di lettere nel file
- il numero di spazi nel file
- le parole che si ripetono più di 10 volte e indicare il numero di volte in cui si ripete.
*/
import readline from 'node:readline/promises';

import { stat, readFile } from 'node:fs/promises'
import { stdin as input, stdout as output } from 'node:process';

import axios from 'axios'

//Creating a cli instance, allows us to get input from the user
const cli = readline.createInterface({
  input,
  output,
});

//getting the filepath and opening the resource

let isPathValid = false

let data: string = ""

do{
    let path = await cli.question("Insert path, either local or an http(s) starting URL\nPath: ")

    if(path.startsWith("http://") || path.startsWith("https://")){
        try{
            let req = await axios.get(path)
            if(req.status<200 || req.status >=300){
                throw Error()
            }

            isPathValid = true
            
            data = req.data.toString().toLowerCase().trimEnd()
        }catch{
            console.log("Resource not found\n$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
        }
    }else{
        try{
            //reading file stats
            let filestats = await stat(path)
            //verify that the provided path corresponds to a file
            if (!filestats.isFile()) throw Error()
            data = (await readFile(path)).toString().toLowerCase().trimEnd()
            isPathValid = true
        }catch{
            console.log("File doesn't exist\n$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
        }
    }

}while(isPathValid == false)

//do you want to include numbers?
let includeNums = false

let answer = await cli.question("Do you want to include numbers? (Y/Yes, N/No) : ")

switch (answer.toLowerCase()) {
    case "yes": includeNums = true
        break;
    case "y": includeNums = true
        break;
    case "no": includeNums = false
        break;
    case "n": includeNums = false
        break;
    default: includeNums = false
}

if(includeNums == false){
    let nums = RegExp(/[0-9]+/gu)
    data = data.replaceAll(nums, "")
    console.log(`You've decided to not include numbers`)
}else{
    console.log(`You've decided to include numbers`)
}

//closing the interactive cli as we don't need it anymore
cli.close()

//counting spaces
let spacecount = 0

for(let i = 0; i<data.length; i++){
    if(data[i]== " "){
        spacecount++
    }
}

//counting letters
let lettercount = 0
const letters = RegExp(/[\p{L}]/gu)

for(let i = 0; i<data.length; i++){
    if(letters.test(data[i])){
        lettercount++
    }
}

//removing everything but words

const notwords = RegExp(/[\W]+/gu)

let parsed = data
    .replaceAll(notwords, " ")
    .trimEnd()
    .trimStart()
    .split(" ")

let wordscount = parsed.length

let ledger:{
    [data:string]: number
} = {}

for(let i in parsed){
    if(ledger[parsed[i]]==undefined){
        ledger[parsed[i]] = 1
        continue
    }
    ledger[parsed[i]] += 1
}

//removing words appearing less than 10 times
for(let i in ledger){
    if(ledger[i]<10){
        delete ledger[i]
    }
}

//data output

console.log("Words count:", wordscount)
console.log("Letters count:", lettercount)
console.log("Spaces count:", spacecount)

console.log("Words repeating more than 10 times:", Object.keys(ledger).length)

for(let i in ledger){
    console.log("\t", i, "\b,", ledger[i], "times")
}