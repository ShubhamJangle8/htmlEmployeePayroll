window.addEventListener('DOMContentLoaded', (event) => {
  createInnerHtml();
});

const createInnerHtml = () => {
  const headerHtml = "<tr><th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>StartDate</th><th>Actions</th></tr>";
  
  let empPayrollData = createEmployeePayrollJSON()[1];
  const innerHtml = `${headerHtml}
    <tr> 
      <td><img class = "profile" src = "${empPayrollData._profilePic}" alt = ""></td>
      <td>${empPayrollData._name}</td>
      <td>${empPayrollData._gender}</td>
      <td>${getDeptHtml(empPayrollData._department)}</td>
      <td>
      <td>${empPayrollData._salary}</td>
      <td>${empPayrollData._startDate}</td>
      <td>
        <img name = "${empPayrollData._id}" src = "../assets/assets/icons/delete-black-18dp.svg" onclick = "remove(this)" alt = "delete">
        <img name = "${empPayrollData._id}" src = "../assets/assets/icons/create-black-18dp.svg" onclick = "update(this)" alt = "edit">
      </td>
    </tr>
    `;
  document.querySelector('#table-display').innerHTML = innerHtml;
}
const getDeptHtml = (deptList) => {
  let deptHtml = '';
  for (const dept of deptList) {
      deptHtml = `${deptHtml}<div class = "dept-label">${dept}</div>`;
  }
  return deptHtml;
}

createEmployeePayrollJSON = () => {
  let empPayrollData = [
      {
          _name: 'Maria',
          _gender: 'Female',
          _department: [
              'HR',
              'Finance'
          ],
          _salary: '400000',
          _startDate: '1 October 2020',
          _note: '',
          _id: new Date().getTime(),
          _profilePic: '../assets/assets/profile-images/Ellipse 1.png'
      },
      {
          _name: 'Rafel',
          _gender: 'Male',
          _department: [
              'Engineering',
          ],
          _salary: '400000',
          _startDate: '1 November 2020',
          _note: '',
          _id: new Date().getTime(),
          _profilePic: '../assets/assets/profile-images/Ellipse -5.png'
      }
  ];
  return empPayrollData;
}