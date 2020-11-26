class EmployeePayrollData{
  //getters and setters
  get id(){return this._id}
  set id(id){
    this._id = id
  }
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
  set startDate(startDate){
    let now = new Date();
    if(startDate > now) {
        throw 'Start Date is a Future Date!';
    }
    var diff = Math.abs(now.getTime() - startDate.getTime());
    if(diff / (1000 * 60 * 60 * 24) > 30)
        throw 'Start Date is beyond 30 days!';
    this._startDate = startDate;
  }
  get note(){return this._note}
  set note(note){
    this._note = note
  }
  toString(){
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    const empDate = !this.startDate ? "undefined": this.startDate.toLocaleDateString("en-US", options);
    return "id = " + this.id + "name = " + this.name + ", gender = " + this.gender + ", profilePic = " + this.profilePic + ", department = " + this.department + ", salary = " + this.salary + ", startDate = " + empDate + ", note = " + this.note;
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
//salary error
const input = document.querySelector('#salary');
const output = document.querySelector('.salary-output');
salary.addEventListener('input', function(){
  output.textContent = salary.value;
});

const date = document.querySelector("#date");
const dateError = document.querySelector('.date-error');
date.addEventListener('input', function() {
  const startDate = new Date(Date.parse(getInputValueById('#day') + " " + getInputValueById('#month')+" "+getInputValueById('#year')));
  try{
      (new EmployeePayrollData()).startDate = startDate;
      dateError.textContent = "";
  }catch(e){
      dateError.textContent = e;
  }
});
//save on submit
const save = () => {
  try{
    let employeePayrollData = createEmployeePayroll();
    console.log(employeePayrollData)
    createAndUpdateStorage(employeePayrollData);
  }
  catch(e){
    return;
  }
}
//create employee payroll object
const createEmployeePayroll = () => {
  let employeePayrollData = new EmployeePayrollData();
  let date;
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
  // date = getInputValueById('#day') + getInputValueById('#month') + getInputValueById('#year');
  // employeePayrollData.startDate = Date.parse(date);
  alert(employeePayrollData.toString());
  return employeePayrollData;
}
//get array for a name for different id's
const getSelectedValues = (propertyValue) => {
  let allItems = document.querySelectorAll(propertyValue);
  let selItems = [];
  allItems.forEach(item => {
    if(item.checked)
      selItems.push(item.value);
  })
  return selItems;
}
//get value for id
const getInputValueById = (id) => {
  let value = document.querySelector(id).value;
  return value;
}
//creating and updating storage 
function createAndUpdateStorage(employeePayrollData){
  localStorage.clear();
  let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
  if(employeePayrollList!=undefined){
    employeePayrollList.push(employeePayrollData);
  }
  else{
    employeePayrollList = [employeePayrollData];
  }
  alert(employeePayrollList.toString());
  localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList))  
}

const resetForm = () => {
  setValue('#name','');
  setTextValue('#name-error','');
  unsetSelectedValues('[name = profile]');
  unsetSelectedValues('[name = gender]');
  unsetSelectedValues('[name = department]');
  setValue('#salary','');
  setValue('#notes','');
  setValue('#day','1');
  setValue('#month','January');
  setValue('#year','2020');
  setTextValue('#date-error','');
}

const unsetSelectedValues = (propertyValue) => {
  let allItems = document.querySelectorAll(propertyValue);
  allItems.forEach(item => {
    item.checked = false;
  });
}

const setValue = (id,value) => {
  const element = document.querySelector(id);
  element.value = value;
}

const setTextValue = (id,value) => {
  const element = document.querySelector(id);
  element.textContent = value;
}

