// Q7: Banking Application (private fields)

class BankAccount {
  #balance; // PRIVATE field: only code inside this class can read or change it

  constructor(initialBalance = 0) {
    if (initialBalance < 0) throw new Error("Initial balance cannot be negative");
    this.#balance = initialBalance;
  }

  deposit(amount) {
    if (typeof amount !== "number" || amount <= 0) {
      throw new Error("Deposit amount must be a positive number");
    }
    this.#balance += amount;
    return this.#balance;
  }

  withdraw(amount) {
    if (typeof amount !== "number" || amount <= 0) {
      throw new Error("Withdrawal amount must be a positive number");
    }
    if (amount > this.#balance) {
      throw new Error(`Insufficient balance. Available: ₹${this.#balance}, requested: ₹${amount}`);
    }
    this.#balance -= amount;
    return this.#balance;
  }

  getBalance() {
    return this.#balance;
  }
}

const account = new BankAccount(1000);
console.log(`Opening balance: ₹${account.getBalance()}`);

// ---------- Valid deposits ----------
account.deposit(500);
console.log(`After depositing ₹500: ₹${account.getBalance()}`);
account.deposit(250);
console.log(`After depositing ₹250: ₹${account.getBalance()}`);

// ---------- Valid withdrawal ----------
account.withdraw(300);
console.log(`After withdrawing ₹300: ₹${account.getBalance()}`);

// ---------- Invalid operations handled with try/catch ----------
const invalidOperations = [
  () => account.withdraw(5000),   // more than the balance
  () => account.withdraw(-100),   // negative amount
  () => account.deposit(0),       // zero deposit
];

invalidOperations.forEach((operation) => {
  try {
    operation();
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
});

// ---------- Privacy check ----------
console.log("\naccount.balance  ->", account.balance);   // undefined: no public property
console.log("Final balance    ->", account.getBalance());
// Writing `account.#balance` outside the class would be a SyntaxError.