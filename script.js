// Function to handle form submission
function bookAppointment(event) {
  event.preventDefault(); // Prevent form submission

  // Get form values
  var name = document.getElementById('name').value;
  var phone = document.getElementById('phone').value;
  var email = document.getElementById('email').value;
  var date = document.getElementById('date').value;
  var time = document.getElementById('time').value;

  // Create appointment object
  var appointment = {
    name: name,
    phone: phone,
    email: email,
    date: date,
    time: time
  };

  // Retrieve existing appointments from local storage
  var existingAppointments = JSON.parse(localStorage.getItem('appointments')) || [];

  // Add new appointment to existing appointments
  existingAppointments.push(appointment);

  // Save updated appointments to local storage
  localStorage.setItem('appointments', JSON.stringify(existingAppointments));

  // Save appointment data to CRUD server
  axios.post("https://crudcrud.com/api/72cd65b641424c1bb0b1097843c8bbf0/appointmentData", appointment)
    .then(function(response) {
      console.log('Appointment data saved to server:', response.data);

      // Reset form
      document.getElementById('bookingForm').reset();

      // Display the appointments on the webpage
      displayAppointments();
    })
    .catch(function(error) {
      console.error('Error saving appointment data:', error);
    });
}

// Function to delete an appointment
function deleteAppointment(id, listItem) {
  // Delete appointment data from CRUD server
  axios.delete(`https://crudcrud.com/api/72cd65b641424c1bb0b1097843c8bbf0/appointmentData/${id}`)
    .then(function(response) {
      console.log('Appointment data deleted from server:', response.data);

      // Remove the appointment from the webpage
      listItem.remove();
    })
    .catch(err=>console.log(err));
}

// Function to edit an appointment
function editAppointment(index) {
  // Retrieve existing appointments from local storage
  var existingAppointments = JSON.parse(localStorage.getItem('appointments')) || [];

  // Get the appointment at the specified index
  var appointment = existingAppointments[index];

  // Set the appointment details as default values in the form
  document.getElementById('name').value = appointment.name;
  document.getElementById('phone').value = appointment.phone;
  document.getElementById('email').value = appointment.email;
  document.getElementById('date').value = appointment.date;
  document.getElementById('time').value = appointment.time;

  // Remove the appointment from the list
  existingAppointments.splice(index, 1);

  // Save updated appointments to local storage
  localStorage.setItem('appointments', JSON.stringify(existingAppointments));

  // Display the appointments on the webpage
  displayAppointments();
}

// Function to display appointments on the webpage
function displayAppointments() {
  var appointmentList = document.getElementById('appointmentList');
  appointmentList.innerHTML = '';

  // Retrieve appointments from local storage
  var existingAppointments = JSON.parse(localStorage.getItem('appointments')) || [];

  // Iterate through appointments and create list items
  existingAppointments.forEach(function(appointment, index) {
    var listItem = document.createElement('li');
    listItem.innerHTML = `
      <strong>Name:</strong> ${appointment.name}<br>
      <strong>Phone:</strong> ${appointment.phone}<br>
      <strong>Email:</strong> ${appointment.email}<br>
      <strong>Date:</strong> ${appointment.date}<br>
      <strong>Time:</strong> ${appointment.time}<br>
      <button onclick="editAppointment(${index})">Edit</button>
      <button onclick="deleteAppointment('${appointment._id}', this.parentNode)">Delete</button>
      <hr>
    `;
    appointmentList.appendChild(listItem);
  });
}

// Fetch appointment data from the CRUD server
function fetchAppointments() {
  axios.get("https://crudcrud.com/api/72cd65b641424c1bb0b1097843c8bbf0/appointmentData")
    .then(function(response) {
      var appointments = response.data;

      // Save fetched appointments to local storage
      localStorage.setItem('appointments', JSON.stringify(appointments));

      // Display the appointments on the webpage
      displayAppointments();
    })
    .catch(err=>console.log(err));
}

// Event listener for form submission
document.getElementById('bookingForm').addEventListener('submit', bookAppointment);

// Display the appointments on page load
fetchAppointments();
