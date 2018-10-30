(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

/// <reference types="Cypress" />
context('Assertions', function () {
  beforeEach(function () {
    cy.visit('https://example.cypress.io/commands/assertions');
  });
  describe('Implicit Assertions', function () {
    it('.should() - make an assertion about the current subject', function () {
      // https://on.cypress.io/should
      cy.get('.assertion-table').find('tbody tr:last').should('have.class', 'success');
    });
    it('.and() - chain multiple assertions together', function () {
      // https://on.cypress.io/and
      cy.get('.assertions-link').should('have.class', 'active').and('have.attr', 'href').and('include', 'cypress.io');
    });
  });
  describe('Explicit Assertions', function () {
    // https://on.cypress.io/assertions
    it('expect - make an assertion about a specified subject', function () {
      // We can use Chai's BDD style assertions
      expect(true).to.be.true; // Pass a function to should that can have any number
      // of explicit assertions within it.

      cy.get('.assertions-p').find('p').should(function ($p) {
        // return an array of texts from all of the p's
        // @ts-ignore TS6133 unused variable
        var texts = $p.map(function (i, el) {
          return (// https://on.cypress.io/$
            Cypress.$(el).text()
          );
        }); // jquery map returns jquery object
        // and .get() convert this to simple array

        var paragraphs = texts.get(); // array should have length of 3

        expect(paragraphs).to.have.length(3); // set this specific subject

        expect(paragraphs).to.deep.eq(['Some text from first p', 'More text from second p', 'And even more text from third p']);
      });
    });
    it('assert - assert shape of an object', function () {
      var person = {
        name: 'Joe',
        age: 20
      };
      assert.isObject(person, 'value is object');
    });
  });
});

},{}]},{},[1]);
