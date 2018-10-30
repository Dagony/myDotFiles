(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add('login', function () {
  // cy.log("Login step 1");
  //
  // cy.visit("/login");
  // cy.log("Entered in login command");
  // cy.get('input[name="username"]').type(Cypress.env('username'));
  // cy.get('input[name="password"]').type(Cypress.env('password'));
  // cy.get('button[class="ui large fluid primary button"]').click();
  // // cy.location('pathname', {timeout: 60000}).should('equal', '/dashboard');
  //
  //
  cy.visit('/');
  var username = "";
  var password = "";
  cy.fixture('localhost.json').as("user").then(function ($user) {
    username = $user.username;
    password = $user.password; // Cypress.Cookies.debug(true, {verbose: true});
    // Cypress.Cookies.defaults({
    //     whitelist: ["session_id", "remember_token"]
    // });
    //
    // Cypress.Cookies.preserveOnce("session_id", "remember_token");
  }).then(function () {
    cy.visit('/login');
    cy.get('input[name="username"]').type(username);
    cy.get('input[name="password"]').type(password);
    cy.get('button[class="ui large fluid primary button"]').click();
  });
});
Cypress.Commands.add('logout', function () {
  cy.visit("/projects");
  cy.url().then(function ($url) {
    expect($url).to.match(/projects/);
  });
  cy.get('a.item > i.log.out.icon').click();
});

},{}],2:[function(require,module,exports){
"use strict";

require("./commands");

},{"./commands":1}]},{},[2]);
