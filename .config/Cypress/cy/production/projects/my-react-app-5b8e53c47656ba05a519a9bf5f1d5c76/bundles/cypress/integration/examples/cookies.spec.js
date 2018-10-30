(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

/// <reference types="Cypress" />
context('Cookies', function () {
  beforeEach(function () {
    Cypress.Cookies.debug(true);
    cy.visit('https://example.cypress.io/commands/cookies'); // clear cookies again after visiting to remove
    // any 3rd party cookies picked up such as cloudflare

    cy.clearCookies();
  });
  it('cy.getCookie() - get a browser cookie', function () {
    // https://on.cypress.io/getcookie
    cy.get('#getCookie .set-a-cookie').click(); // cy.getCookie() yields a cookie object

    cy.getCookie('token').should('have.property', 'value', '123ABC');
  });
  it('cy.getCookies() - get browser cookies', function () {
    // https://on.cypress.io/getcookies
    cy.getCookies().should('be.empty');
    cy.get('#getCookies .set-a-cookie').click(); // cy.getCookies() yields an array of cookies

    cy.getCookies().should('have.length', 1).should(function (cookies) {
      // each cookie has these properties
      expect(cookies[0]).to.have.property('name', 'token');
      expect(cookies[0]).to.have.property('value', '123ABC');
      expect(cookies[0]).to.have.property('httpOnly', false);
      expect(cookies[0]).to.have.property('secure', false);
      expect(cookies[0]).to.have.property('domain');
      expect(cookies[0]).to.have.property('path');
    });
  });
  it('cy.setCookie() - set a browser cookie', function () {
    // https://on.cypress.io/setcookie
    cy.getCookies().should('be.empty');
    cy.setCookie('foo', 'bar'); // cy.getCookie() yields a cookie object

    cy.getCookie('foo').should('have.property', 'value', 'bar');
  });
  it('cy.clearCookie() - clear a browser cookie', function () {
    // https://on.cypress.io/clearcookie
    cy.getCookie('token').should('be.null');
    cy.get('#clearCookie .set-a-cookie').click();
    cy.getCookie('token').should('have.property', 'value', '123ABC'); // cy.clearCookies() yields null

    cy.clearCookie('token').should('be.null');
    cy.getCookie('token').should('be.null');
  });
  it('cy.clearCookies() - clear browser cookies', function () {
    // https://on.cypress.io/clearcookies
    cy.getCookies().should('be.empty');
    cy.get('#clearCookies .set-a-cookie').click();
    cy.getCookies().should('have.length', 1); // cy.clearCookies() yields null

    cy.clearCookies();
    cy.getCookies().should('be.empty');
  });
});

},{}]},{},[1]);
