// Get a reference to the Accept and Decline buttons
var acceptBtn = document.getElementById('acceptBtn');
var declineBtn = document.getElementById('declineBtn');

// Check if the privacyAccepted cookie is set
var cookies = document.cookie.split(';');
var privacyAccepted = false;
for (var i = 0; i < cookies.length; i++) {
var cookie = cookies[i].trim();
if (cookie.indexOf('privacyAccepted=') === 0) {
  privacyAccepted = true;
  break;
}
}

if (!privacyAccepted) {
// Listen for clicks on the Accept button
acceptBtn.addEventListener('click', function() {
  // Set a cookie to remember that the privacy policy has been accepted
  document.cookie = 'privacyAccepted=true; path=/';

  // Close the modal
  var privacyModal = document.getElementById('privacyModal');
  var modalInstance = bootstrap.Modal.getInstance(privacyModal);
  modalInstance.hide();
});

// Listen for clicks on the Decline button
declineBtn.addEventListener('click', function() {
  // Redirect to Google
  window.location.href = 'https://www.google.com/';
});

// Show the modal when the page is loaded
var privacyModal = document.getElementById('privacyModal');
var modalInstance = new bootstrap.Modal(privacyModal);
modalInstance.show();
}