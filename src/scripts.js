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

  console.log('post body', postBody);

  fetch('/api/v1/authenticate', {
    method: 'POST',
    headers:{
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postBody)
  })
    .then(response => {
      console.log('response', response);
      return response.json();
    })
    .then(token => {
      console.log('token', token);
      appendToken(token);
    })
    .catch(error => console.log('catch error', error));
};

const appendToken = (token) => {
  $('.token-text').text(`Token: ${token.token}`);
};
