// Q6: Real-Time Table Filter Using the input event

const searchBox = document.getElementById("search-box");
const tableBody = document.getElementById("student-table-body");
const noResultsRow = document.getElementById("no-results");

// Only the real student rows (exclude the hidden "No results found" row)
const studentRows = Array.from(tableBody.querySelectorAll("tr")).filter((row) => row !== noResultsRow);

// The "input" event fires on EVERY change (typing, deleting, pasting)
searchBox.addEventListener("input", () => {
  // Lower-case both sides so the search is case-insensitive
  const searchText = searchBox.value.trim().toLowerCase();
  let visibleCount = 0;

  studentRows.forEach((row) => {
    // row.textContent contains Name + Branch + CGPA, so any column can match
    const rowText = row.textContent.toLowerCase();
    const isMatch = rowText.includes(searchText);

    row.hidden = !isMatch; // matching rows remain visible, others are hidden
    if (isMatch) visibleCount++;
  });

  // Show the message only when nothing matched
  noResultsRow.hidden = visibleCount > 0;
});