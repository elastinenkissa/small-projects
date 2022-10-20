Cypress.Commands.add('login', (username, password) => {
  const user = {
    username,
    password,
  };
  cy.request('POST', 'http://localhost:3003/api/users/login', user).then(
    (res) => {
      localStorage.setItem('currentUser', JSON.stringify(res.body));
      cy.visit('http://localhost:3003');
    }
  );
});

Cypress.Commands.add('createBlog', (title, author, url) => {
  const blog = {
    title,
    author,
    url,
  };
  const user = JSON.parse(localStorage.getItem('currentUser'));
  cy.request({
    method: 'POST',
    url: 'http://localhost:3003/api/blogs',
    body: blog,
    headers: {
      Authorization: `bearer ${user.token}`,
    },
  });
  cy.visit('http://localhost:3003');
});
