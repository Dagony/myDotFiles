(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

/// <reference types="Cypress" />
context('Aliasing', function () {
  beforeEach(function () {
    cy.visit('https://example.cypress.io/commands/aliasing');
  });
  it('.as() - alias a DOM element for later use', function () {
    // https://on.cypress.io/as
    // Alias a DOM element for use later
    // We don't have to traverse to the element
    // later in our code, we reference it with @
    cy.get('.as-table').find('tbody>tr').first().find('td').first().find('button').as('firstBtn'); // when we reference the alias, we place an
    // @ in front of its name

    cy.get('@firstBtn').click();
    cy.get('@firstBtn').should('have.class', 'btn-success').and('contain', 'Changed');
  });
  it('.as() - alias a route for later use', function () {
    // Alias the route to wait for its response
    cy.server();
    cy.route('GET', 'comments/*').as('getComment'); // we have code that gets a comment when
    // the button is clicked in scripts.js

    cy.get('.network-btn').click(); // https://on.cypress.io/wait

    cy.wait('@getComment').its('status').should('eq', 200);
  });
});

},{}]},{},[1]);
