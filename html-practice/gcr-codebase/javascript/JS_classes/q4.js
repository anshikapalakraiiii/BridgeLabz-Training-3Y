"use strict";
// Q4 – Custom Form Builder (Forms + Classes). Open q4_form_builder.html in a browser.

class FormBuilder {
  // fields: [{ type, label, name?, options? }]   types: text, email, password, number, textarea, select, checkbox
  constructor(container, fields) {
    this.container = container;
    this.fields = fields;
  }

  // Key used in the returned object: explicit name, or label turned into snake_case
  keyOf(field) {
    return field.name ?? field.label.toLowerCase().replace(/\W+/g, "_");
  }

  // Escape text so labels/options can't inject HTML
  static escape(text) {
    return String(text).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  fieldHtml(field) {
    const key = this.keyOf(field);
    const label = FormBuilder.escape(field.label);
    let control;
    if (field.type === "textarea") {
      control = `<textarea id="${key}" name="${key}" rows="3"></textarea>`;
    } else if (field.type === "select") {
      const options = (field.options || []).map((o) => `<option>${FormBuilder.escape(o)}</option>`).join("");
      control = `<select id="${key}" name="${key}">${options}</select>`;
    } else {
      control = `<input id="${key}" name="${key}" type="${field.type}">`;
    }
    return `<div class="field"><label for="${key}">${label}</label>${control}</div>`;
  }

  // Builds the whole form using innerHTML
  render(onSubmit) {
    this.container.innerHTML =
      `<form id="built-form">${this.fields.map((f) => this.fieldHtml(f)).join("")}<button type="submit">Submit</button></form>`;
    this.form = this.container.querySelector("form");
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      onSubmit(this.getFormData());
    });
  }

  // Returns every entered value as { key: value }
  getFormData() {
    const data = {};
    for (const field of this.fields) {
      const element = this.form.elements[this.keyOf(field)];
      if (field.type === "checkbox") data[this.keyOf(field)] = element.checked;
      else if (field.type === "number") data[this.keyOf(field)] = element.value === "" ? null : Number(element.value);
      else data[this.keyOf(field)] = element.value;
    }
    return data;
  }
}

const builder = new FormBuilder(document.getElementById("form-root"), [
  { type: "text", label: "Username" },
  { type: "email", label: "Email" },
  { type: "password", label: "Password" },
  { type: "number", label: "Age" },
  { type: "select", label: "Country", options: ["India", "USA", "UK"] },
  { type: "textarea", label: "Bio" },
  { type: "checkbox", label: "Subscribe to newsletter" }
]);

builder.render((data) => {
  document.getElementById("output").textContent = JSON.stringify(data, null, 2);
  console.log(data);
});