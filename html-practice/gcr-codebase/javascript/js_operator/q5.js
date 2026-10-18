// Q5. Boolean Logic Access System

function checkSecurity(isDoorLocked, isWindowClosed, isAlarmOn, isOwnerInside) {
  // Door "closed" is represented by the door being locked
  const isDoorClosed = isDoorLocked;

  // Access granted only if ALL conditions hold
  const isSecure = isAlarmOn && isDoorClosed && isWindowClosed && isOwnerInside;

  console.log(
    `Door locked: ${isDoorLocked}, Window closed: ${isWindowClosed}, ` +
    `Alarm on: ${isAlarmOn}, Owner inside: ${isOwnerInside} -> ${isSecure ? "Secure" : "Unsafe"}`
  );

  // Show which condition failed using ! and ||
  if (!isSecure) {
    if (!isAlarmOn) console.log("   - Alarm is off");
    if (!isDoorLocked || !isWindowClosed) console.log("   - Door or window is open");
    if (!isOwnerInside) console.log("   - Owner is not inside");
  }
}

// Test multiple outcomes
checkSecurity(true, true, true, true);    // Secure
checkSecurity(true, true, false, true);   // Unsafe (alarm off)
checkSecurity(false, true, true, true);   // Unsafe (door open)
checkSecurity(true, false, true, true);   // Unsafe (window open)
checkSecurity(true, true, true, false);   // Unsafe (owner away)
checkSecurity(false, false, false, false);// Unsafe (everything off)