// Listen for submit
document.getElementById("loan-form").addEventListener("submit", (e) => {
  e.preventDefault();
  // hide results
  document.getElementById("results").style.display = "none";
  // show loader when clicked
  document.getElementById("loading").style.display = "block";

  setTimeout(calculateResults, 2000);
});

function calculateResults() {
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

  //Compute monthly payments
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principle * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    return (
      (monthlyPayment.value = monthly.toFixed(2)),
      (totalPayment.value = (monthly * calculatedPayments).toFixed(2)),
      (totalInterest.value = (monthly * calculatedPayments - principle).toFixed(
        2
      )),
      //show results
      (document.getElementById("results").style.display = "block"),
      //hide loader
      (document.getElementById("loading").style.display = "none")
    );
  }
  return showError("Please check your number");
}

//show Error
function showError(error) {
  //show results
  document.getElementById("results").style.display = "none";
  //hide loader
  document.getElementById("loading").style.display = "none";
  //create a div
  const errorDiv = document.createElement("div");

  // Get element
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  //Add bootstrap class
  errorDiv.className = "alert alert-danger";

  // create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  //insert errror above heading
  card.insertBefore(errorDiv, heading);

  // clear error message after 3 sec
  setTimeout(clearError, 3000);
}

//clear error
function clearError() {
  document.querySelector(".alert").remove();
}
