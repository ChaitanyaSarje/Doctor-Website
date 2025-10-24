
function showSection(sectionId) {
  const sections = document.querySelectorAll('.page-section');
  sections.forEach(sec => sec.classList.remove('active'));
  const el = document.getElementById(sectionId);
  if (el) el.classList.add('active');

  if (sectionId === 'doctors') {
    searchDoctors(''); 
  }
}

async function searchDoctors(param) {
  const query = (typeof param !== 'undefined') ? param : (document.getElementById('search')?.value || '');
  const encoded = encodeURIComponent(query);

  try {
    const response = await fetch(`/api/doctors?search=${encoded}`);
    if (!response.ok) throw new Error('Network error');
    const doctors = await response.json();

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (!doctors || doctors.length === 0) {
      resultsDiv.innerHTML = '<p>No doctors found.</p>';
      return;
    }

    doctors.forEach(doc => {
      const div = document.createElement('div');
      div.classList.add('doctor-card');
      div.innerHTML = `
        <img src="${doc.image}" alt="${doc.name}">
        <h3>${doc.name}</h3>
        <p><b>Specialization:</b> ${doc.specialization}</p>
        <p><b>Location:</b> ${doc.location}</p>
        <p><b>Timing:</b> ${doc.timing}</p>
        <p><b>Contact:</b> ${doc.contact}</p>
      `;
        div.addEventListener('click', () => showAppointmentModal(doc.name));
      resultsDiv.appendChild(div);
    });
  } catch (err) {
    console.error('Error fetching doctors:', err);
    document.getElementById('results').innerHTML = '<p>Error loading doctors.</p>';
  }
}


const featuredDoctors = [
  { name: 'Dr. Ramesh Kumar', specialization: 'Cardiologist', image: 'images/doctor1.jpeg' },
  { name: 'Dr. Neha Kapoor', specialization: 'Pediatrician', image: 'images/doctor4.jpeg' }
];

function loadFeaturedDoctors() {
  const div = document.getElementById('featured-doctors');
  if (!div) return;
  div.innerHTML = '';
  featuredDoctors.forEach(doc => {
    const card = document.createElement('div');
    card.classList.add('doctor-card');
    card.style.width = '220px';
    card.innerHTML = `
      <img src="${doc.image}" alt="${doc.name}">
      <h3>${doc.name}</h3>
      <p>${doc.specialization}</p>
    `;
    div.appendChild(card);
  });
}


document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;

      document.getElementById('formMessage').innerText =
        `Thank you, ${name}! We'll contact you at ${email} soon.`;

      this.reset();
    });
  }

  loadFeaturedDoctors();
  showSection('home');
});



function showAppointmentModal(doctorName) {
  document.getElementById('doctorName').innerText = doctorName;
  document.getElementById('appointmentModal').style.display = 'flex';
  document.getElementById('confirmationMessage').innerText = '';
}

function closeModal() {
  document.getElementById('appointmentModal').style.display = 'none';
}


document.addEventListener('DOMContentLoaded', () => {
  
  const form = document.getElementById('appointmentForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const patientName = document.getElementById('patientName').value;
      const date = document.getElementById('appointmentDate').value;
      const time = document.getElementById('appointmentTime').value;

      document.getElementById('confirmationMessage').innerText =
        `✅ Appointment booked for ${patientName} on ${date} at ${time}.`;

      this.reset();
    });
  }


});
function showServiceInfo(service) {
  const titleEl = document.getElementById('serviceTitle');
  const descEl = document.getElementById('serviceDescription');

  let title = '';
  let description = '';

  switch (service) {
    case 'checkup':
      title = 'General Checkups';
      description = 'Book appointments for regular health checkups with trusted doctors near you.';
      break;
    case 'consultation':
      title = 'Specialist Consultation';
      description = 'Get expert opinions from specialists in various fields online or offline.';
      break;
    case 'surgery':
      title = 'Surgery Bookings';
      description = 'Easily schedule surgeries with top hospitals and surgeons.';
      break;
    case 'reminders':
      title = 'Appointment Reminders';
      description = 'Never miss an appointment again with our smart reminder system.';
      break;
  }

  titleEl.innerText = title;
  descEl.innerText = description;
  document.getElementById('serviceModal').style.display = 'flex';
}

function closeServiceModal() {
  document.getElementById('serviceModal').style.display = 'none';
}
