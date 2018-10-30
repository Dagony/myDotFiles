(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

/// <reference types="Cypress" />
context('Local Storage', function () {
  beforeEach(function () {
    cy.visit('https://example.cypress.io/commands/local-storage');
  }); // Although local storage is automatically cleared
  // in between tests to maintain a clean state
  // sometimes we need to clear the local storage manually

  it('cy.clearLocalStorage() - clear all data in local storage', function () {
    // https://on.cypress.io/clearlocalstorage
    cy.get('.ls-btn').click().should(function () {
      expect(localStorage.getItem('prop1')).to.eq('red');
      expect(localStorage.getItem('prop2')).to.eq('blue');
      expect(localStorage.getItem('prop3')).to.eq('magenta');
    }); // clearLocalStorage() yields the localStorage object

    cy.clearLocalStorage().should(function (ls) {
      expect(ls.getItem('prop1')).to.be.null;
      expect(ls.getItem('prop2')).to.be.null;
      expect(ls.getItem('prop3')).to.be.null;
    }); // Clear key matching string in Local Storage

    cy.get('.ls-btn').click().should(function () {
      expect(localStorage.getItem('prop1')).to.eq('red');
      expect(localStorage.getItem('prop2')).to.eq('blue');
      expect(localStorage.getItem('prop3')).to.eq('magenta');
    });
    cy.clearLocalStorage('prop1').should(function (ls) {
      expect(ls.getItem('prop1')).to.be.null;
      expect(ls.getItem('prop2')).to.eq('blue');
      expect(ls.getItem('prop3')).to.eq('magenta');
    }); // Clear keys matching regex in Local Storage

    cy.get('.ls-btn').click().should(function () {
      expect(localStorage.getItem('prop1')).to.eq('red');
      expect(localStorage.getItem('prop2')).to.eq('blue');
      expect(localStorage.getItem('prop3')).to.eq('magenta');
    });
    cy.clearLocalStorage(/prop1|2/).should(function (ls) {
      expect(ls.getItem('prop1')).to.be.null;
      expect(ls.getItem('prop2')).to.be.null;
      expect(ls.getItem('prop3')).to.eq('magenta');
    });
  });
});

},{}]},{},[1]);
