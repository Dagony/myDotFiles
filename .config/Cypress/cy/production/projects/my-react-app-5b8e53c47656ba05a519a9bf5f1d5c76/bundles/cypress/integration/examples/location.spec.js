(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

/// <reference types="Cypress" />
context('Location', function () {
  beforeEach(function () {
    cy.visit('https://example.cypress.io/commands/location');
  });
  it('cy.hash() - get the current URL hash', function () {
    // https://on.cypress.io/hash
    cy.hash().should('be.empty');
  });
  it('cy.location() - get window.location', function () {
    // https://on.cypress.io/location
    cy.location().should(function (location) {
      expect(location.hash).to.be.empty;
      expect(location.href).to.eq('https://example.cypress.io/commands/location');
      expect(location.host).to.eq('example.cypress.io');
      expect(location.hostname).to.eq('example.cypress.io');
      expect(location.origin).to.eq('https://example.cypress.io');
      expect(location.pathname).to.eq('/commands/location');
      expect(location.port).to.eq('');
      expect(location.protocol).to.eq('https:');
      expect(location.search).to.be.empty;
    });
  });
  it('cy.url() - get the current URL', function () {
    // https://on.cypress.io/url
    cy.url().should('eq', 'https://example.cypress.io/commands/location');
  });
});

},{}]},{},[1]);
