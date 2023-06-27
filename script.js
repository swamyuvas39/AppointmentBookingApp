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

   // Create appointment object
      var appointment = {
        name: name,
        phone: phone,
        email: email,
        date: date,
        time: time
      };
    // saving data into the crucruc backend service
      axios.post("https://crudcrud.com/api/72cd65b641424c1bb0b1097843c8bbf0/appointmentData", appointment)
            .then((res)=>console.log(res))
            .catch(err=>console.log(err));
  
    // Save updated appointments to local storage
    //localStorage.setItem('appointments', JSON.stringify(existingAppointments));
  
    // Display success message
    var messageDiv = document.getElementById('message');
    messageDiv.innerHTML = 'Appointment booked successfully!';
    messageDiv.style.color = 'green';
  
    // Reset form
    document.getElementById('bookingForm').reset();
  
    // Display the appointments on the webpage
    displayAppointments();
  }
  
  // Function to delete an appointment
  function deleteAppointment(index) {
    // Retrieve existing appointments from local storage
    var existingAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
  
    // Remove the appointment at the specified index
    existingAppointments.splice(index, 1);
  
    // Save updated appointments to local storage
    localStorage.setItem('appointments', JSON.stringify(existingAppointments));
  
    // Display the appointments on the webpage
    displayAppointments();
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
        <button onclick="deleteAppointment(${index})">Delete</button>
        <hr>
      `;
      appointmentList.appendChild(listItem);
    });
  }
  
  // Event listener for form submission
  document.getElementById('bookingForm').addEventListener('submit', bookAppointment);
  
  // Display the appointments on page load
  displayAppointments();
  