(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

/// <reference types="Cypress" />
context('Connectors', function () {
  beforeEach(function () {
    cy.visit('https://example.cypress.io/commands/connectors');
  });
  it('.each() - iterate over an array of elements', function () {
    // https://on.cypress.io/each
    cy.get('.connectors-each-ul>li').each(function ($el, index, $list) {
      console.log($el, index, $list);
    });
  });
  it('.its() - get properties on the current subject', function () {
    // https://on.cypress.io/its
    cy.get('.connectors-its-ul>li') // calls the 'length' property yielding that value
    .its('length').should('be.gt', 2);
  });
  it('.invoke() - invoke a function on the current subject', function () {
    // our div is hidden in our script.js
    // $('.connectors-div').hide()
    // https://on.cypress.io/invoke
    cy.get('.connectors-div').should('be.hidden') // call the jquery method 'show' on the 'div.container'
    .invoke('show').should('be.visible');
  });
  it('.spread() - spread an array as individual args to callback function', function () {
    // https://on.cypress.io/spread
    var arr = ['foo', 'bar', 'baz'];
    cy.wrap(arr).spread(function (foo, bar, baz) {
      expect(foo).to.eq('foo');
      expect(bar).to.eq('bar');
      expect(baz).to.eq('baz');
    });
  });
  it('.then() - invoke a callback function with the current subject', function () {
    // https://on.cypress.io/then
    cy.get('.connectors-list>li').then(function ($lis) {
      expect($lis).to.have.length(3);
      expect($lis.eq(0)).to.contain('Walk the dog');
      expect($lis.eq(1)).to.contain('Feed the cat');
      expect($lis.eq(2)).to.contain('Write JavaScript');
    });
  });
});

},{}]},{},[1]);
