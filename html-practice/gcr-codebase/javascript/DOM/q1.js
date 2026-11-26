// Q1: Dynamic Product List Manager (Add / Edit / Delete using EVENT DELEGATION)

const productInput = document.getElementById("product-input");
const addButton = document.getElementById("add-button");
const productList = document.getElementById("product-list");
const emptyMessage = document.getElementById("empty-message");

// Keeps track of which <li> (if any) is currently in edit mode
let currentlyEditingItem = null;

// Show / hide the "No products yet" message
function updateEmptyMessage() {
  emptyMessage.hidden = productList.children.length > 0;
}

// Build one <li> with a name and Edit / Delete buttons
function createProductItem(name) {
  const item = document.createElement("li");
  item.className = "product-item";
  item.dataset.originalName = name; // remembered so Escape / empty edits can revert

  const nameSpan = document.createElement("span");
  nameSpan.className = "product-name";
  nameSpan.textContent = name;

  const actions = document.createElement("div");
  actions.className = "actions";

  const editButton = document.createElement("button");
  editButton.className = "edit-button";
  editButton.textContent = "Edit";

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-button";
  deleteButton.textContent = "Delete";

  actions.append(editButton, deleteButton);
  item.append(nameSpan, actions);
  return item;
}

// ---------- ADD ----------
function addProduct() {
  const name = productInput.value.trim();
  if (name === "") return; // ignore empty input
  productList.appendChild(createProductItem(name));
  productInput.value = "";
  productInput.focus();
  updateEmptyMessage();
}

addButton.addEventListener("click", addProduct);
productInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") addProduct();
});

// ---------- EDIT MODE helpers ----------
function startEdit(item) {
  // Only one item may be edited at a time: save the previous one first
  if (currentlyEditingItem && currentlyEditingItem !== item) {
    saveEdit(currentlyEditingItem);
  }

  const nameSpan = item.querySelector(".product-name");
  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.className = "edit-input";
  editInput.value = nameSpan.textContent;

  item.replaceChild(editInput, nameSpan);           // swap text -> input (inline editing)
  item.querySelector(".edit-button").textContent = "Save";
  item.classList.add("editing");
  editInput.focus();
  editInput.select();

  currentlyEditingItem = item;
}

// cancel = true -> discard the typed text and restore the old name
function saveEdit(item, cancel = false) {
  const editInput = item.querySelector(".edit-input");
  if (!editInput) return;

  const typedName = editInput.value.trim();
  // Empty text is not allowed, so fall back to the previous name
  const finalName = cancel || typedName === "" ? item.dataset.originalName : typedName;

  const nameSpan = document.createElement("span");
  nameSpan.className = "product-name";
  nameSpan.textContent = finalName;
  item.dataset.originalName = finalName;

  item.replaceChild(nameSpan, editInput);           // swap input -> text
  item.querySelector(".edit-button").textContent = "Edit";
  item.classList.remove("editing");

  if (currentlyEditingItem === item) currentlyEditingItem = null;
}

// ---------- EVENT DELEGATION ----------
// ONE listener on the parent <ul> handles clicks from every current and future
// child button. We find which button was clicked using event.target.
productList.addEventListener("click", (event) => {
  const clickedButton = event.target;
  const item = clickedButton.closest(".product-item");
  if (!item) return;

  if (clickedButton.matches(".delete-button")) {
    if (currentlyEditingItem === item) currentlyEditingItem = null;
    item.remove();
    updateEmptyMessage();
  } else if (clickedButton.matches(".edit-button")) {
    if (item.classList.contains("editing")) saveEdit(item); // button acts as "Save"
    else startEdit(item);
  }
});

// Keyboard support inside the edit box (also delegated): Enter = save, Escape = cancel
productList.addEventListener("keydown", (event) => {
  if (!event.target.matches(".edit-input")) return;
  const item = event.target.closest(".product-item");
  if (event.key === "Enter") saveEdit(item);
  if (event.key === "Escape") saveEdit(item, true);
});

// ---------- AUTO-SAVE when clicking outside the edited item ----------
document.addEventListener("click", (event) => {
  if (currentlyEditingItem && !currentlyEditingItem.contains(event.target)) {
    saveEdit(currentlyEditingItem);
  }
});

updateEmptyMessage();