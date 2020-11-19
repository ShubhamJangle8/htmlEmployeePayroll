const input = document.querySelector('#salary');
const output = document.querySelector('.salary-output');
salary.addEventListener('input', function(){
  output.textContent = salary.value;
});

const text = document.querySelector('#name');
const textError = document.querySelector('.name-error');
text.oninput = function(){
  let nameRegex = RegExp('^[A-Z]{1}[a-z]{2,}$');
    if(nameRegex.test(text.value) || text.value == "")
      textError.textContent = "";
    else
      textError.textContent = "Name is Incorrect";
};

const date = document.querySelector("#year");
const dateError = document.querySelector('.date-error');
date.oninput = function(){
  let dateLimit = Date.now();
  if(new Date(date.value) < dateLimit)
    dateError.textContent = "";
  else
    dateError.textContent = "Put a valid Date";
};