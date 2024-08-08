# TextParser
CLI tool written in typescript to showcase RegExp use and manipulate filesystem in Node.JS
## Usage
After getting the repo and the latest Node version, run these commands
```
  npm run i
```
to install the required modules
```
  tsc
```
to run the typescript compiler, generating the index.js file
```
  node index.js
```
to run the actual tool via Node.JS
## Purpose
This comes from a job interview exercise, feel free to try and compare.
## Functions
The interface is pretty intuitive, asking the user to insert the path (either local or a remote URL starting with http(s)).
After this the tool will check for the file existance and, if that is the case, prompt to choose if numbers in the report are to be included.
Then it will calculate
  - words in the file
  - letters in the file
  - spaces in the file
  - words appearing more than 10 times and how many times they are present
## Solution
The process is pretty straightforward, as we
  - create the CLI instance to prompt question to the user
      - ask for the file and verify its existance
      - ask if numbers should be considered
  - format the file as a string
  - count spaces looping through every character
  - count letters via a regexp match looping through every character
  - parse the text, removing anything but words and putting them into an array (which gives us the words count)
  - create a ledger object that stores each word and how many times they appear
  - loop through the ledger and deleting keys for the words appearing less than 10 times
  - finally, we can output the record
## Conclusion
This was a pretty easy problem, I've personally chosen to include the axios library to manage http(s) requests as it was cleaner than using the http(s) modules included in Node.JS.
While this might be an acceptable solution, I feel like many things could be improved.