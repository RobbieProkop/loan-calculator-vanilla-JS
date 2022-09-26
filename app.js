// Listen for submit
document
  .getElementById("loan-form")
  .addEventListener("submit", calculateResults);

function calculateResults(e) {
  e.preventDefault();

  console.log("Calculating...");

  //UI vars
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  const principle = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  //COmpute monthly payments
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principle * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    return (
      (monthlyPayment.value = monthly.toFixed(2)),
      (totalPayment.value = (monthly * calculatedPayments).toFixed(2)),
      (totalInterest.value = (monthly * calculatedPayments - principle).toFixed(
        2
      ))
    );
  }
  return showError("Please check your number");
}

//show Error
function showError(error) {
  //create a div
  const errorDiv = document.createElement("div");

  //Add bootstrap class
  errorDiv.className = "alert alert-danger";

  // create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));
}
