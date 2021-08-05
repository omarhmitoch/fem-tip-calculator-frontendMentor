// primary selectors
const selectElement = (e) => document.querySelector(e);
const selectElements = (e) => document.querySelectorAll(e);

// page elements
const bill = selectElement("#bill");
const customValue = selectElement("#customValue");
const numPeople = selectElement("#numPeople");
const tipAmount = selectElement("#tipAmount");
const totalTipAmount = selectElement("#tipTotal");
let billValue, tipValue, numPeopleValue;
const reset = selectElement("#reset");
const errorLabel = selectElement(".labelE");

// select tip value percentage
selectElements(".tip-amount").forEach((elem) => {
  elem.addEventListener("click", (e) => {
    e.preventDefault();
    removeAddedStyle();
    elem.classList.toggle("active");
    tipValue = +elem.innerText.replace("%", "");
    calculateBill();
    customValue.value = "";
  });
});

// reset calculated values
reset.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("clicked");
  bill.value = "";
  customValue.value = "";
  numPeople.value = "";
  tipAmount.innerHTML = "$0.00";
  totalTipAmount.innerHTML = "$0.00";
  removeAddedStyle();
  this.disabled = "true";
  this.classList.add("disabled");
  errorLabel.classList.remove("active");
  numPeople.classList.remove("active");
  billValue = tipValue = numPeopleValue = undefined;
});

// remove added style based on event
const removeAddedStyle = () => {
  selectElements(".tip-amount").forEach((e) => {
    e.className = "tip-amount";
  });
};

// onChange inputs
bill.addEventListener("input", function () {
  billValue = this.value;
  calculateBill();
});

customValue.addEventListener("input", function () {
  tipValue = this.value;
  removeAddedStyle();
  calculateBill();
});

numPeople.addEventListener("input", function () {
  if (this.value !== "0" && this.value.length > 0) {
    numPeopleValue = this.value;
    errorLabel.classList.remove("active");
    this.classList.remove("active");
    calculateBill();
  } else if (+this.value * 1 == 0) {
    console.log("what ?");
    errorLabel.classList.add("active");
    this.classList.add("active");
    numPeopleValue = undefined;
    tipAmount.innerHTML = totalTipAmount.innerHTML = "$0.00";
    calculateBill();
  }
});

// calculate

const calculateBill = () => {
  if (
    billValue !== undefined &&
    tipValue !== undefined &&
    numPeopleValue !== undefined
  ) {
    let tip = +(((billValue / numPeopleValue) * tipValue) / 100).toFixed(2);
    console.log(billValue / numPeopleValue + tip);
    tipAmount.innerHTML = `$${tip}`;
    totalTipAmount.innerHTML = `$${(billValue / numPeopleValue + tip).toFixed(
      2
    )}`;
    reset.removeAttribute("disabled");
    reset.classList.remove("disabled");
  }
};
