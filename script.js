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

  // Save appointment data to CRUD server
  axios.post("https://crudcrud.com/api/12e37ee8b5b94e0aac31527a1cade758/appointmentData", appointment)
    .then(function(response) {
      console.log(response.data);

      // Reset form
      document.getElementById('bookingForm').reset();

      // Fetch and display the updated appointments
      fetchAppointments();
    })
    .catch(err=>console.log(err));
}

// Function to delete an appointment
function deleteAppointment(id, listItem) {
  // Delete appointment data from CRUD server
  axios.delete(`https://crudcrud.com/api/12e37ee8b5b94e0aac31527a1cade758/appointmentData/${id}`)
    .then(function(response) {
      console.log(response.data);

      // Remove the appointment from the webpage
      listItem.remove();
    })
    .catch(err=>console.log(err));
}

// Function to edit an appointment
function editAppointment(id) {
  // Fetch appointment data from CRUD server for the specific id
  axios.get(`https://crudcrud.com/api/12e37ee8b5b94e0aac31527a1cade758/appointmentData/${id}`)
    .then(function(response) {
      var appointment = response.data;

      // Set the appointment details as default values in the form
      document.getElementById('name').value = appointment.name;
      document.getElementById('phone').value = appointment.phone;
      document.getElementById('email').value = appointment.email;
      document.getElementById('date').value = appointment.date;
      document.getElementById('time').value = appointment.time;

      // Remove the appointment from the server
      axios.delete(`https://crudcrud.com/api/12e37ee8b5b94e0aac31527a1cade758/appointmentData/${id}`)
        .then(function(response) {
          console.log(response.data);

          // Fetch and display the updated appointments
          fetchAppointments();
        })
        .catch(function(error) {
          console.error('Error deleting appointment data:', error);
        });
    })
    .catch(function(error) {
      console.error('Error fetching appointment data:', error);
    });
}

// Function to display appointments on the webpage
function displayAppointments(appointments) {
  var appointmentList = document.getElementById('appointmentList');
  appointmentList.innerHTML = '';

  // Iterate through appointments and create list items
  appointments.forEach(function(appointment) {
    var listItem = document.createElement('li');
    listItem.innerHTML = `
      <strong>Name:</strong> ${appointment.name}<br>
      <strong>Phone:</strong> ${appointment.phone}<br>
      <strong>Email:</strong> ${appointment.email}<br>
      <strong>Date:</strong> ${appointment.date}<br>
      <strong>Time:</strong> ${appointment.time}<br>
      <button onclick="editAppointment('${appointment._id}')">Edit</button>
      <button onclick="deleteAppointment('${appointment._id}', this.parentNode)">Delete</button>
      <hr>
    `;
    appointmentList.appendChild(listItem);
  });
}

// Function to fetch appointments from the CRUD server
function fetchAppointments() {
  // Fetch appointments from CRUD server
  axios.get("https://crudcrud.com/api/12e37ee8b5b94e0aac31527a1cade758/appointmentData")
    .then(function(response) {
      var appointments = response.data;

      // Display the appointments on the webpage
      displayAppointments(appointments);
    })
    .catch(err=>console.log(err));
}

// Event listener for form submission
document.getElementById('bookingForm').addEventListener('submit', bookAppointment);

// Fetch and display the appointments on page load
fetchAppointments();
