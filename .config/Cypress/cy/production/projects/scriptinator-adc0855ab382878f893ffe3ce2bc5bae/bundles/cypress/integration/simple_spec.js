(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

describe('whatever', function () {
  beforeEach(function () {
    Cypress.Cookies.debug(true, {
      verbose: true
    }); // Cypress.Cookies.defaults({
    //     whitelist: "session_id"
    // })

    Cypress.Cookies.preserveOnce("session_id", "remember_token");
    cy.fixture("markScriptinator").as("user");
  });
  describe('The Home Page', function () {
    Cypress.Commands.add('loginByCSRF', function (csrfToken) {
      cy.log(csrfToken);
      cy.request({
        method: 'POST',
        url: '/login',
        failOnStatusCode: false,
        form: true,
        body: {
          username: 'mark',
          password: 'Qe8du0vnpUKX',
          _csrf: csrfToken
        }
      });
    });
    it('strategy #1: parse token from HTML', function () {
      // cy.fixture("markScriptinator").as("mark");
      cy.visit("/login");
      cy.request('/login').its('body').then(function (body) {
        var $html = Cypress.$(body);
        var csrf = $html.find("input[name=_csrf]").val();
        cy.loginByCSRF(csrf).then(function (resp) {
          expect(resp.status).to.eq(200); // expect(resp.body).to.contain('<h1>Dashboard</h1>')
        });
      });
    });
    it('403 status without a valid CSRF token', function () {
      cy.loginByCSRF('invalid-token').its('status').should('eq', 403);
    });
    it('displays to /dashboard on success', function () {
      cy.visit('/');
      cy.get('input[name="username"]').type(this.user.username);
      cy.get('input[name="password"]').type(this.user.password);
      cy.get('button[class="ui fluid large primary submit button"]').click();
      cy.get('h1').contains('Dashboard');
      cy.get('i[class="sign out alternate icon"]').click();
    });
  });
  describe('After being logged in', function () {
    // beforeEach(() => {
    //     Cypress.Cookies.debug(true, {verbose: true});
    //     Cypress.Cookies.defaults({
    //         whitelist: "session_id"
    //     })
    // });
    // beforeEach(() => {
    //
    //     //     Cypress.Cookies.preserveOnce("session_id", "remember_token")
    //     // cy.fixture("markScriptinator").as("mark");
    //     cy.visit('/');
    //     cy.get('input[name="username"]').type(this.user.username)
    //     cy.get('input[name="password"]').type(this.user.password )
    //     cy.get('button[class="ui fluid large primary submit button"]').click()
    //     cy.get('h1').contains('Dashboard')
    // })
    it('check that there is one existing project', function () {
      cy.visit('/');
      cy.get('input[name="username"]').type(this.user.username);
      cy.get('input[name="password"]').type(this.user.password);
      cy.get('button[class="ui fluid large primary submit button"]').click();
      cy.get('h1').contains('Dashboard');
      cy.get('span').contains('mark-first-project');
    });
    it('when a project is clicked, the project view is opened', function () {
      cy.get('a span[contains(text(), "mark-first-project")]').click();
      cy.url().should('include', '/project/');
    });
  });
});

},{}]},{},[1]);
