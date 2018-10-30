(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

/// <reference types="Cypress" />
context('Viewport', function () {
  beforeEach(function () {
    cy.visit('https://example.cypress.io/commands/viewport');
  });
  it('cy.viewport() - set the viewport size and dimension', function () {
    // https://on.cypress.io/viewport
    cy.get('#navbar').should('be.visible');
    cy.viewport(320, 480); // the navbar should have collapse since our screen is smaller

    cy.get('#navbar').should('not.be.visible');
    cy.get('.navbar-toggle').should('be.visible').click();
    cy.get('.nav').find('a').should('be.visible'); // lets see what our app looks like on a super large screen

    cy.viewport(2999, 2999); // cy.viewport() accepts a set of preset sizes
    // to easily set the screen to a device's width and height
    // We added a cy.wait() between each viewport change so you can see
    // the change otherwise it is a little too fast to see :)

    cy.viewport('macbook-15');
    cy.wait(200);
    cy.viewport('macbook-13');
    cy.wait(200);
    cy.viewport('macbook-11');
    cy.wait(200);
    cy.viewport('ipad-2');
    cy.wait(200);
    cy.viewport('ipad-mini');
    cy.wait(200);
    cy.viewport('iphone-6+');
    cy.wait(200);
    cy.viewport('iphone-6');
    cy.wait(200);
    cy.viewport('iphone-5');
    cy.wait(200);
    cy.viewport('iphone-4');
    cy.wait(200);
    cy.viewport('iphone-3');
    cy.wait(200); // cy.viewport() accepts an orientation for all presets
    // the default orientation is 'portrait'

    cy.viewport('ipad-2', 'portrait');
    cy.wait(200);
    cy.viewport('iphone-4', 'landscape');
    cy.wait(200); // The viewport will be reset back to the default dimensions
    // in between tests (the  default can be set in cypress.json)
  });
});

},{}]},{},[1]);
