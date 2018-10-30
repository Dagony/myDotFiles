(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

/// <reference types="Cypress" />
context('Files', function () {
  beforeEach(function () {
    cy.visit('https://example.cypress.io/commands/files');
  });
  it('cy.fixture() - load a fixture', function () {
    // https://on.cypress.io/fixture
    // Instead of writing a response inline you can
    // use a fixture file's content.
    cy.server();
    cy.fixture('example.json').as('comment');
    cy.route('GET', 'comments/*', '@comment').as('getComment'); // we have code that gets a comment when
    // the button is clicked in scripts.js

    cy.get('.fixture-btn').click();
    cy.wait('@getComment').its('responseBody').should('have.property', 'name').and('include', 'Using fixtures to represent data'); // you can also just write the fixture in the route

    cy.route('GET', 'comments/*', 'fixture:example.json').as('getComment'); // we have code that gets a comment when
    // the button is clicked in scripts.js

    cy.get('.fixture-btn').click();
    cy.wait('@getComment').its('responseBody').should('have.property', 'name').and('include', 'Using fixtures to represent data'); // or write fx to represent fixture
    // by default it assumes it's .json

    cy.route('GET', 'comments/*', 'fx:example').as('getComment'); // we have code that gets a comment when
    // the button is clicked in scripts.js

    cy.get('.fixture-btn').click();
    cy.wait('@getComment').its('responseBody').should('have.property', 'name').and('include', 'Using fixtures to represent data');
  });
  it('cy.readFile() - read a files contents', function () {
    // https://on.cypress.io/readfile
    // You can read a file and yield its contents
    // The filePath is relative to your project's root.
    cy.readFile('cypress.json').then(function (json) {
      expect(json).to.be.an('object');
    });
  });
  it('cy.writeFile() - write to a file', function () {
    // https://on.cypress.io/writefile
    // You can write to a file
    // Use a response from a request to automatically
    // generate a fixture file for use later
    cy.request('https://jsonplaceholder.typicode.com/users').then(function (response) {
      cy.writeFile('cypress/fixtures/users.json', response.body);
    });
    cy.fixture('users').should(function (users) {
      expect(users[0].name).to.exist;
    }); // JavaScript arrays and objects are stringified
    // and formatted into text.

    cy.writeFile('cypress/fixtures/profile.json', {
      id: 8739,
      name: 'Jane',
      email: 'jane@example.com'
    });
    cy.fixture('profile').should(function (profile) {
      expect(profile.name).to.eq('Jane');
    });
  });
});

},{}]},{},[1]);
