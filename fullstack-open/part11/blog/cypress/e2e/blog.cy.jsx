/* eslint-disable cypress/no-unnecessary-waiting */
import '../support/commands';

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/tests/reset');
    const user = {
      username: 'artohellas',
      name: 'Arto Hellas',
      password: 'artohellas',
    };
    cy.request('POST', 'http://localhost:3003/api/users', user);
    cy.visit('http://localhost:3003');
  });

  it('Login form is shown', function () {
    cy.contains('Login to the bloglist');
  });

  describe('Login', function () {
    it('fails with wrong credentials and shows a red notification', function () {
      cy.get('#username').type('artohellas');
      cy.get('#password').type('notartohellas');
      cy.get('#submitButton').click();
      cy.get('#notification')
        .should('be.visible')
        .should('contain', 'Wrong username or password.')
        .and('have.css', 'color', 'rgb(255, 0, 0)');
    });

    it('succeedes with correct credentials', function () {
      const user = {
        username: 'artohellas',
        password: 'artohellas',
      };
      cy.login(user.username, user.password);
      cy.get('#toggleButton').contains('Create new blog');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      const user = {
        username: 'artohellas',
        password: 'artohellas',
      };
      cy.login(user.username, user.password);
    });

    it('a blog can be created and is shown on the list of all blogs', function () {
      const blog = {
        title: 'New blog',
        author: 'New Blogger',
        url: 'http://www.newblog.com/',
      };
      cy.createBlog(blog.title, blog.author, blog.url);
      cy.contains(`${blog.title} - ${blog.author}`);
    });

    it('the user can like a blog', function () {
      const blog = {
        title: 'New blog',
        author: 'New Blogger',
        url: 'http://www.newblog.com/',
      };
      cy.createBlog(blog.title, blog.author, blog.url);
      cy.contains('View').click();
      cy.get('button').contains('Like').click();
      cy.contains('Likes: 1');
    });

    it('the user who created the blog can delete it, other users cannot', function () {
      const newUser = {
        username: 'evilartohellas',
        name: 'Arto Hellas Evil Counterpart',
        password: 'evilartohellas',
      };
      cy.request('POST', 'http://localhost:3003/api/users', newUser);

      const blogOne = {
        title: 'Goodbye blog',
        author: 'Evil Blog Destroyer',
        url: 'http://www.sadblog.com/',
      };
      const blogTwo = {
        title: 'Indestructible blog',
        author: 'Blog Protector',
        url: 'http://www.happyblog.com/',
      };

      cy.createBlog(blogOne.title, blogOne.author, blogOne.url);
      cy.createBlog(blogTwo.title, blogTwo.author, blogTwo.url);
      cy.contains('Delete').click();

      cy.contains('Logout').click();
      cy.login(newUser.username, newUser.password);

      cy.contains('Delete').should('not.exist');
    });

    it('the user can sort blog posts by likes', function () {
      const blogs = [
        {
          title: 'Blog with second most likes',
          author: 'Arto Hellas',
          url: 'http://www.newblog1.com/',
        },
        {
          title: 'Blog with least likes',
          author: 'Arto Hellas',
          url: 'http://www.newblog2.com/',
        },
        {
          title: 'Blog with most likes',
          author: 'Arto Hellas',
          url: 'http://www.newblog3.com/',
        },
      ];

      cy.createBlog(blogs[0].title, blogs[0].author, blogs[0].url);
      cy.createBlog(blogs[1].title, blogs[1].author, blogs[1].url);
      cy.createBlog(blogs[2].title, blogs[2].author, blogs[2].url);

      cy.get('.viewButton').click({ multiple: true });

      cy.get('.main')
        .eq(0)
        .contains('Like')
        .click()
        .wait(2000)
        .click()
        .wait(2000);
      cy.get('.main').eq(1).contains('Like').click().wait(2000);
      cy.get('.main')
        .eq(2)
        .contains('Like')
        .click()
        .wait(2000)
        .click()
        .wait(2000)
        .click()
        .wait(2000);

      cy.contains('Sort by number of likes').click();

      cy.get('.main').eq(0).contains('Blog with most likes');
      cy.get('.main').eq(1).contains('Blog with second most likes');
      cy.get('.main').eq(2).contains('Blog with least likes');
    });
  });
});
