(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

/*
 * Copyright © 2018 Scriptinator (support@scriptinator.io)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
describe('Projects page', function () {
  beforeEach(function () {
    Cypress.Cookies.debug(true, {
      verbose: true
    });
    Cypress.Cookies.defaults({
      whitelist: "session_id"
    });
    Cypress.Cookies.preserveOnce("session_id", "remember_token");
    cy.login(); // Make sure that every test starts at the test project

    cy.visit('/');
    cy.get('h1').contains('Dashboard');
    cy.get('span').contains('mark-first-project');
    cy.get('a span:contains("mark-first-project")').click();
  });
  it('when a project is clicked, the project view is opened', function () {
    // Check that the url matches the mentioned regular expressions
    cy.url().then(function ($url) {
      expect($url).to.not.match(/project\/\d\/scriptszz/); // prove that the match with regular expression works as expected

      expect($url).to.match(/project\/\d\/scripts/);
    }); // Make sure that the active tab is 'Scripts'

    cy.get('div.ui.top.attached.tabular.menu a.item.active').contains('Scripts'); // Check that the order of the tabs in correct

    cy.get('div.ui.top.attached.tabular.menu a.item').should(function ($a) {
      expect($a.eq(0)).to.contain('Scripts');
      expect($a.eq(1)).to.contain('Schedules');
      expect($a.eq(2)).to.contain('Webhooks');
      expect($a.eq(3)).to.contain('Secrets');
      expect($a.eq(4)).to.contain('Project Settings');
    });
  });
  it('checks that the number of scripts in the label corresponds to the number of actual scripts', function () {
    cy.get("table.ui.blue.table div.ui.label div.detail").then(function ($element) {
      // First fetch number from label
      var numProjectInLabel = $element[0].innerHTML;
      cy.get("td.clickable a").then(function ($projects) {
        // Compare number from label with count of projects in list
        expect($projects.length).to.eql(parseInt(numProjectInLabel));
      });
    });
  });
  it('when the "Add" button is clicked, the New Script page is shows up', function () {
    // Check that the url is '{baseUrl}/project/[NUMBER]/script'
    cy.url().then(function ($url) {
      expect($url).to.match(/project\/\d\/script/);
    }); // Click the 'Add' button

    cy.get('a:contains("Add")').click(); // Check that the h3 header is 'New Script'

    cy.get('h3.ui.header').then(function ($header) {
      // debugger
      expect($header).to.contain('New Script');
    }); // Check that the 'Cancel' and 'Create' buttons are visible

    cy.get('a.ui.button:contains("Cancel")').should('be.visible');
    cy.get('button:contains("Create")').should('be.visible');
  });
});
describe('Scripts in Projects page', function () {
  before(function () {
    Cypress.Cookies.debug(true, {
      verbose: true
    });
    Cypress.Cookies.defaults({
      whitelist: "session_id"
    });
    Cypress.Cookies.preserveOnce("session_id", "remember_token"); // cy.login();
  });
  beforeEach(function () {
    cy.login(); // Make sure that every test starts at the test project

    cy.visit('/');
    cy.get('h1').contains('Dashboard');
    cy.get('span').contains('mark-first-project');
    cy.get('a span:contains("mark-first-project")').click();
  });
  it('when a script is added, it shows in the scripts overview', function () {
    cy.get('a:contains("Add")').click(); // check that the form contains the 'Name' and 'Description' input fields

    cy.get('input#name').then(function ($input) {
      expect($input).to.be.visible;
    }).type("my-test-script");
    cy.get('input#description').then(function ($input) {
      expect($input).to.be.visible;
    }).type("This script will be created, used for tests and deleted afterwards"); // cy.get('input#code_field').then(($input) => {
    //     expect($input).to.be.hidden;
    // }).type('info("This script has been created inside a test")');

    cy.get('textarea.ace_text-input').type('info("This script has been created inside a test")', {
      force: true
    });
    cy.get('button:contains("Create")').click();
    cy.get('div.ui.top.attached.tabular.menu a.item:contains("Scripts")').click();
    cy.get('table.ui.blue.table td.clickable a').then(function ($element) {
      // cy.log($element)
      expect($element.last()).to.contain('my-test-script');
    });
    cy.get('table.ui.blue.table td.clickable a:contains("my-test-script")').click().then(function () {
      cy.get('a[href*=\'ettings\'].ui.icon.button.right.floated').click().then(function () {
        cy.get('button.ui.button.red').first().click();
      });
      cy.get('div.modal button.ui.red.ok.button').click();
    });
  });
  it('when a script is added, it can be run', function () {
    cy.get('a:contains("Add")').click(); // check that the form contains the 'Name' and 'Description' input fields

    cy.get('input#name').then(function ($input) {
      expect($input).to.be.visible;
    }).type("my-test-script");
    cy.get('input#description').then(function ($input) {
      expect($input).to.be.visible;
    }).type("This script will be created, used for tests and deleted afterwards"); // cy.get('input#code_field').then(($input) => {
    //     expect($input).to.be.hidden;
    // }).type('info("This script has been created inside a test")');

    cy.get('textarea.ace_text-input').type('info("This script has been created inside a test")', {
      force: true
    });
    cy.get('button:contains("Create")').click();
    cy.get('div.ui.top.attached.tabular.menu a.item:contains("Scripts")').click();
    cy.get('table.ui.blue.table td.clickable a').then(function ($element) {
      // cy.log($element)
      expect($element.last()).to.contain('my-test-script');
    });
    cy.get('table.ui.blue.table td.clickable a:contains("my-test-script")').click();
    cy.get('div#jobs table.ui.compact.table td:contains("This script has not been executed yet.")').then(function ($element) {
      expect($element).to.be.visible;
    });
    cy.get('button.ui.positive.icon.button:contains("Run")').click().then(function () {
      cy.get('div#jobs table.ui.compact.table td:contains("my-test-script")').then(function ($element) {
        expect($element).to.be.visible;
      });
    });
    cy.get('a[href*=\'ettings\'].ui.icon.button.right.floated').click().then(function () {
      cy.get('button.ui.button.red').first().click();
    });
    cy.get('div.modal button.ui.red.ok.button').click();
  });
});
describe('Schedules in projects page', function () {
  before(function () {
    Cypress.Cookies.debug(true, {
      verbose: true
    });
    Cypress.Cookies.defaults({
      whitelist: "session_id"
    });
    Cypress.Cookies.preserveOnce("session_id", "remember_token");
    cy.login();
  });
  beforeEach(function () {
    cy.login();
    cy.visit('/');
    cy.get('h1').contains('Dashboard');
    cy.get('span').contains('mark-first-project');
    cy.get('a span:contains("mark-first-project")').click();
    cy.get('a.item:contains("Schedules")').click();
  });
  it('checks that the number of schedules in the label corresponds to the number of actual scripts', function () {
    cy.get("table.ui.yellow.table div.ui.label div.detail").then(function ($element) {
      // First fetch number from label
      var numSchedulesInLabel = $element[0].innerHTML;
      cy.get("td.clickable a").then(function ($schedules) {
        // Compare number from label with count of projects in list
        expect($schedules.length).to.eql(parseInt(numSchedulesInLabel));
      });
    });
  });
  it('checks that the schedules detail page opens', function () {
    cy.get("td.clickable a").click();
    cy.get("input#name").then(function ($element) {
      expect($element).to.have.value("autoharvest-scheduler");
    });
    cy.get("input#description").then(function ($element) {
      expect($element.val()).to.match(/Xillio Engine phase 2 testing task/);
    });
    cy.get("input.search").click().then(function () {
      cy.get("div.menu.transition.visible").then(function ($element) {
        expect($element).to.be.visible;
        cy.get("div.menu.transition.visible div.item.active.selected").click();
      });
    });
    cy.get('input#cronString').then(function ($element) {
      expect($element).to.be.visible;
      cy.get('div.ui.action.input button.ui.icon.button').click();
      cy.get("div#cron-help").then(function ($element) {
        expect($element).to.have.prop("style");
      });
    });
  });
});

},{}]},{},[1]);
