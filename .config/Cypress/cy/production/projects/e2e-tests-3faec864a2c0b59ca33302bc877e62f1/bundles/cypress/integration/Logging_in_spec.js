(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

describe('Logging in', function () {
  beforeEach(function () {
    Cypress.Cookies.debug(true, {
      verbose: true
    });
    Cypress.Cookies.defaults({
      whitelist: "session_id"
    });
    Cypress.Cookies.preserveOnce("session_id", "remember_token");
    cy.fixture("localhost").as("user");
  });
  it('displays to /dashboard on success', function () {
    cy.visit("/login");
    cy.get('input[name="username"]').type(this.user.username);
    cy.get('input[name="password"]').type(this.user.password);
    cy.get('button[class="ui large fluid primary button"]').click();
    cy.get('h1').contains('Dashboard');
    cy.get('i[class="log out icon"]').click();
  });
  describe('After being logged in', function () {
    it('check that there is one existing project', function () {
      cy.visit('/login');
      cy.get('input[name="username"]').type(this.user.username);
      cy.get('input[name="password"]').type(this.user.password);
      cy.get('button[class="ui large fluid primary button"]').click();
      cy.get('h1').contains('Dashboard');
      cy.get('a.table-entry').contains('demo');
    });
  });
  describe('is not possible if', function () {
    it('the username field is not filled in', function () {
      cy.visit('/login');
      cy.get('input[name="password"]').type(this.user.password);
      cy.get('button[class="ui large fluid primary button"]').click(); // Test that the username input field has focus after pressing button

      cy.focused().should('have.attr', 'name', 'username');
      cy.get('input:invalid').should('have.attr', 'name', 'username');
    });
    it('the password field is not filled in', function () {
      cy.visit('/login');
      cy.get('input[name="username"]').type(this.user.username);
      cy.get('button[class="ui large fluid primary button"]').click(); // Test that the password input field has focus after pressing button

      cy.focused().should('have.attr', 'name', 'password');
      cy.get('input:invalid').should('have.attr', 'name', 'password');
    });
    it('no fields are filled in', function () {
      cy.visit('/login');
      cy.get('button[class="ui large fluid primary button"]').click();
      cy.focused().should('have.attr', 'name', 'username');
      cy.get('input:invalid').then(function ($elements) {
        expect($elements[0]).to.have.property('name', 'username');
        expect($elements[1]).to.have.property('name', 'password');
      });
    });
    it('invalid credentials are filled in', function () {
      cy.visit('/login');
      cy.get('input[name="username"]').type("Αυτό θα πρέπει να λειτουργήσει τόσο πολύ. Ποιος ξέρει");
      cy.get('input[name="password"]').type("Гэта таму хацелі б працаваць вельмі добра. як ведаць");
      cy.get('button[class="ui large fluid primary button"]').click();
    });
  });
});

},{}]},{},[1]);
