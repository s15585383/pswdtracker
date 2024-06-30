const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#title').value.trim();
  const username = document.querySelector('#username').value.trim();
  const password = document.querySelector('#password').value.trim();
  console.log(title, password, username);
  if (title && username && password) {
    const response = await fetch(`/api/passwords`, {
      method: 'POST',
      body: JSON.stringify({ title, username, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      //   document.reload();
      document.location.replace('/profile');
    } else {
      alert('Failed to create password');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/passwords/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete password');
    }
  }
};

document
  .querySelector('.new-password-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.password-list')
  .addEventListener('click', delButtonHandler);
