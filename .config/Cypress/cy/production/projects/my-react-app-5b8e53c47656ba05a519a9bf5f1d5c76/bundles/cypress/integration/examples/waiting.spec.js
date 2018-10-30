(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

/// <reference types="Cypress" />
context('Waiting', function () {
  beforeEach(function () {
    cy.visit('https://example.cypress.io/commands/waiting');
  }); // BE CAREFUL of adding unnecessary wait times.
  // https://on.cypress.io/best-practices#Unnecessary-Waiting
  // https://on.cypress.io/wait

  it('cy.wait() - wait for a specific amount of time', function () {
    cy.get('.wait-input1').type('Wait 1000ms after typing');
    cy.wait(1000);
    cy.get('.wait-input2').type('Wait 1000ms after typing');
    cy.wait(1000);
    cy.get('.wait-input3').type('Wait 1000ms after typing');
    cy.wait(1000);
  });
  it('cy.wait() - wait for a specific route', function () {
    cy.server(); // Listen to GET to comments/1

    cy.route('GET', 'comments/*').as('getComment'); // we have code that gets a comment when
    // the button is clicked in scripts.js

    cy.get('.network-btn').click(); // wait for GET comments/1

    cy.wait('@getComment').its('status').should('eq', 200);
  });
});

},{}]},{},[1]);
