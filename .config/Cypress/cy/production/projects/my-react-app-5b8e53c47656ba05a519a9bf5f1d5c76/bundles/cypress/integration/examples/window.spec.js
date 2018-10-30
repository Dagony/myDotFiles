(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

/// <reference types="Cypress" />
context('Window', function () {
  beforeEach(function () {
    cy.visit('https://example.cypress.io/commands/window');
  });
  it('cy.window() - get the global window object', function () {
    // https://on.cypress.io/window
    cy.window().should('have.property', 'top');
  });
  it('cy.document() - get the document object', function () {
    // https://on.cypress.io/document
    cy.document().should('have.property', 'charset').and('eq', 'UTF-8');
  });
  it('cy.title() - get the title', function () {
    // https://on.cypress.io/title
    cy.title().should('include', 'Kitchen Sink');
  });
});

},{}]},{},[1]);
