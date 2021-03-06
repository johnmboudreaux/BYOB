$('.input-form').on('click', '.submit-button', (event) => inputValues(event));

const inputValues = (event) => {
  event.preventDefault();
  let email = $('.email-input').val();
  let appName = $('.app-name').val();

  getToken(email, appName);
};

const getToken = (email, appName) => {
  let postBody = {
    'email': email,
    'appName': appName
  };


  fetch('/api/v1/authenticate', {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postBody)
  })
    .then(response => response.json())
    .then(token => { appendToken(token); })
    .catch(error => console.log(error));
};

const appendToken = (token) => {
  $('.token-text').text(`Token: ${token.token}`);
};
