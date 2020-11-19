class EmployeePayrollData{
  //getters and setters
  get name(){return this._name}
  set name(name){
    let nameRegex = RegExp('^[A-Z]{1}[a-z]{2,}$')
    if(nameRegex.test(name))
      this._name = name
    else
      throw "Name is Incorrect!"
  }
  get profilePic(){return this._profilePic}
  set profilePic(profilePic){
    this._profilePic = profilePic
  }
  get gender(){return this._gender}
  set gender(gender){
    this._gender = gender
  }
  get department(){return this._department}
  set department(department){
    this._department = department
  }
  get salary(){return this._salary}
  set salary(salary){
    this._salary = salary
  }
  get startDate(){return this._startDate}
  set startDate(date){
    this._startDate = date
  }
  get note(){return this._note}
  set note(note){
    this._note = note
  }
  toString(){
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    const empDate = !this.startDate ? "undefined": this.startDate.toLocaleDateString("en-US", options);
    return "name = " + this.name + ", gender = " + this.gender + ", profilePic = " + this.profilePic + ", department = " + this.department + ", salary = " + this.salary + ", startDate = " + empDate + ", note = " + this.note;
  }
}

window.addEventListener('DOMContentLoaded', (event) => {
  const name = document.querySelector('#name');
  const nameError = document.querySelector('.name-error');
  name.addEventListener('input', function(){
    if(name.value.length == 0){
      nameError.textContent = "";
      return;
    }
    try{
      (new EmployeePayrollData()).name = name.value;
      nameError.textContent = "";
    }
    catch(e){
      nameError.textContent = e;
    }
  })
})

const input = document.querySelector('#salary');
const output = document.querySelector('.salary-output');
salary.addEventListener('input', function(){
  output.textContent = salary.value;
});

const date = document.querySelector("#year");
const dateError = document.querySelector('.date-error');
date.oninput = function(){
  let dateLimit = Date.now();
  if(new Date(date.value) < dateLimit)
    dateError.textContent = "";
  else
    dateError.textContent = "Put a valid Date";
};

const save = () => {
  try{
    let employeePayrollData = createEmployeePayroll();
  }
  catch(e){
    return;
  }
}
const createEmployeePayroll = () => {
  let employeePayrollData = new EmployeePayrollData();
  try{
    employeePayrollData.name = getInputValueById('#name');
  }
  catch(e){
    setTextValue('.name-error', e);
    throw e;
  }
  employeePayrollData.profilePic = getSelectedValues('[name = profile]').pop();
  employeePayrollData.gender = getSelectedValues('[name = gender]').pop();
  employeePayrollData.department = getSelectedValues('[name = department]');
  employeePayrollData.salary = getInputValueById('#salary');
  employeePayrollData.note = getInputValueById('#notes');
  // let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " + getInputValueById('#year');
  // employeePayrollData.startDate = Date.parse(date);
  alert(employeePayrollData.toString());
  return employeePayrollData;
}

const getSelectedValues = (propertyValue) => {
  let allItems = document.querySelectorAll(propertyValue);
  let selItems = [];
  allItems.forEach(item => {
    if(item.checked)
      selItems.push(item.value);
  })
  return selItems;
}

const getInputValueById = (id) => {
  let value = document.querySelector(id).value;
  return value;
}