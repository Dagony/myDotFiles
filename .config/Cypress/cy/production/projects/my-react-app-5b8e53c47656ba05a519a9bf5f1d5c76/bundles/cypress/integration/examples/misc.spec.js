(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

/// <reference types="Cypress" />
context('Misc', function () {
  beforeEach(function () {
    cy.visit('https://example.cypress.io/commands/misc');
  });
  it('.end() - end the command chain', function () {
    // https://on.cypress.io/end
    // cy.end is useful when you want to end a chain of commands
    // and force Cypress to re-query from the root element
    cy.get('.misc-table').within(function () {
      // ends the current chain and yields null
      cy.contains('Cheryl').click().end(); // queries the entire table again

      cy.contains('Charles').click();
    });
  });
  it('cy.exec() - execute a system command', function () {
    // https://on.cypress.io/exec
    // execute a system command.
    // so you can take actions necessary for
    // your test outside the scope of Cypress.
    cy.exec('echo Jane Lane').its('stdout').should('contain', 'Jane Lane'); // we can use Cypress.platform string to
    // select appropriate command
    // https://on.cypress/io/platform

    cy.log("Platform ".concat(Cypress.platform, " architecture ").concat(Cypress.arch));

    if (Cypress.platform === 'win32') {
      cy.exec('print cypress.json').its('stderr').should('be.empty');
    } else {
      cy.exec('cat cypress.json').its('stderr').should('be.empty');
      cy.exec('pwd').its('code').should('eq', 0);
    }
  });
  it('cy.focused() - get the DOM element that has focus', function () {
    // https://on.cypress.io/focused
    cy.get('.misc-form').find('#name').click();
    cy.focused().should('have.id', 'name');
    cy.get('.misc-form').find('#description').click();
    cy.focused().should('have.id', 'description');
  });
  context('Cypress.Screenshot', function () {
    it('cy.screenshot() - take a screenshot', function () {
      // https://on.cypress.io/screenshot
      cy.screenshot('my-image');
    });
    it('Cypress.Screenshot.defaults() - change default config of screenshots', function () {
      Cypress.Screenshot.defaults({
        blackout: ['.foo'],
        capture: 'viewport',
        clip: {
          x: 0,
          y: 0,
          width: 200,
          height: 200
        },
        scale: false,
        disableTimersAndAnimations: true,
        screenshotOnRunFailure: true,
        beforeScreenshot: function beforeScreenshot() {},
        afterScreenshot: function afterScreenshot() {}
      });
    });
  });
  it('cy.wrap() - wrap an object', function () {
    // https://on.cypress.io/wrap
    cy.wrap({
      foo: 'bar'
    }).should('have.property', 'foo').and('include', 'bar');
  });
});

},{}]},{},[1]);
