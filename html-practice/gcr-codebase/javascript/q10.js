// Q10. Citizen Eligibility Validator
//
// NOTE: The assignment lists "citizen and age >= 18" for ALL services and
// "citizen and 18-20" for VOTE ONLY, which overlap. To make them distinct,
// I treat "all services" as citizen AND age >= 21 (driving/passport age),
// and "vote only" as citizen AND age 18-20.

const age = 19;
const isCitizen = true;

if (isCitizen) {
  if (age >= 21) {
    console.log("Eligible for all services.");
  } else if (age >= 18 && age <= 20) {
    console.log("Eligible to vote only.");
  } else {
    console.log("Not eligible yet.");
  }
} else {
  if (age >= 18) {
    console.log("Only age criteria met.");
  } else {
    console.log("Not eligible yet.");
  }
}