// Q7. Smart Guessing Game (Number Range)

// Secret number between 1 and 50
const secretNumber = Math.floor(Math.random() * 50) + 1;
const userGuess = 25;      // test guess

console.log(`Your guess   : ${userGuess}`);
console.log(`Secret number: ${secretNumber} (shown for testing)`);

if (userGuess === secretNumber) {
  console.log("Correct guess!");
} else {
  // Not exact: check whether the guess is within ±3
  const difference = Math.abs(userGuess - secretNumber);

  if (difference <= 3) {
    console.log("Very close!");
  } else {
    // Nested condition for direction
    if (userGuess > secretNumber) {
      console.log("Too high");
    } else {
      console.log("Too low");
    }
  }
}