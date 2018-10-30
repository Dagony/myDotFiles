(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

describe('Logging in', function () {
  beforeEach(function () {
    Cypress.Cookies.debug(true, {
      verbose: true
    });
    Cypress.Cookies.defaults({
      whitelist: "session_id"
    });
    Cypress.Cookies.preserveOnce("session_id", "remember_token");
    cy.fixture("localhost").as("user");
  });
  it('displays to /dashboard on success', function () {
    cy.visit("/login");
    cy.get('input[name="username"]').type(this.user.username);
    cy.get('input[name="password"]').type(this.user.password);
    cy.get('button[class="ui large fluid primary button"]').click();
    cy.get('h1').contains('Dashboard');
    cy.get('i[class="log out icon"]').click();
  });
  describe('After being logged in', function () {
    it('check that there is one existing project', function () {
      cy.visit('/login');
      cy.get('input[name="username"]').type(this.user.username);
      cy.get('input[name="password"]').type(this.user.password);
      cy.get('button[class="ui large fluid primary button"]').click();
      cy.get('h1').contains('Dashboard');
      cy.get('a.table-entry').contains('demo');
    });
  });
  describe('is not possible if', function () {
    it('the username field is not filled in', function () {
      cy.visit('/login');
      cy.get('input[name="password"]').type(this.user.password);
      cy.get('button[class="ui large fluid primary button"]').click(); // Test that the username input field has focus after pressing button

      cy.focused().should('have.attr', 'name', 'username');
      cy.get('input:invalid').should('have.attr', 'name', 'username');
    });
    it('the password field is not filled in', function () {
      cy.visit('/login');
      cy.get('input[name="username"]').type(this.user.username);
      cy.get('button[class="ui large fluid primary button"]').click(); // Test that the password input field has focus after pressing button

      cy.focused().should('have.attr', 'name', 'password');
      cy.get('input:invalid').should('have.attr', 'name', 'password');
    });
    it('no fields are filled in', function () {
      cy.visit('/login');
      cy.get('button[class="ui large fluid primary button"]').click();
      cy.focused().should('have.attr', 'name', 'username');
      cy.get('input:invalid').then(function ($elements) {
        expect($elements[0]).to.have.property('name', 'username');
        expect($elements[1]).to.have.property('name', 'password');
      });
    });
    it('invalid credentials are filled in', function () {
      cy.visit('/login');
      cy.get('input[name="username"]').type("Αυτό θα πρέπει να λειτουργήσει τόσο πολύ. Ποιος ξέρει");
      cy.get('input[name="password"]').type("Гэта таму хацелі б працаваць вельмі добра. як ведаць");
      cy.get('button[class="ui large fluid primary button"]').click();
    });
  });
});

},{}],2:[function(require,module,exports){
"use strict";

describe('Projects page', function () {
  before(function (done) {
    //     cy.fixture("localhost").as("user").then((user) => {
    //         Cypress.Cookies.debug(true, {verbose: true});
    //         Cypress.Cookies.defaults({
    //             whitelist: "session_id"
    //         });
    //         Cypress.Cookies.preserveOnce("session_id", "remember_token");
    //
    //         cy.log("Joehoe!");
    //
    //         cy.login();
    //         done();
    //     });
    //
    //
    // Make sure that every test starts at the test project
    cy.visit('/');
    cy.get('h1').contains('Dashboard');
    cy.get('a[href=/projects/new]').click();
    cy.get('input[name=name]').type("cypress-project");
    cy.get('input[name=description]').type("temporary project for ui testing with Cypress");
    cy.get('a:contains("Create")').click();
    cy.get('h1 div.active.section').contains("cypress-project");
  });
  after(function () {
    cy.visit('/');
    cy.contains("cypress-project").click();
    cy.contains("Project Settings").click();
    cy.get('button[class="ui button red"]').click();
    cy.get('button[class="ui red ok button"]').click(); // cy.get('td.clickable').not.contains("cypress-project");
  }); // beforeEach(() => {
  //     Cypress.Cookies.debug(true, {verbose: true});
  //     Cypress.Cookies.defaults({
  //         whitelist: "session_id"
  //     });
  //     Cypress.Cookies.preserveOnce("session_id", "remember_token");
  //
  //
  //     cy.visit('/login');
  //     cy.get('input[name="username"]').type(this.user.username);
  //     cy.get('input[name="password"]').type(this.user.password);
  //     cy.get('button[class="ui large fluid primary button"]').click();
  //
  //     // Make sure that every test starts at the test project
  //     // cy.visit('/');
  //
  //     cy.get('h1').contains('Dashboard');
  //
  // });

  it('when a project is clicked, the project view is opened', function () {
    cy.visit('/');
    cy.login();
    cy.get('td.selectable a.table-entry').then(function ($element) {
      expect($element.length).to.be.greaterThan(0);
    });
    cy.get('.menu a:contains("Projects")').click(); // Check that the order of the tabs in correct

    cy.get('table.ui.blue.table div.ui.label').should(function ($label) {
      expect($label[0].innerHTML).to.match(/Projects.*\d+.*/);
    });
  });
  it('checks that the number of projects in the label corresponds to the number of actual projects', function () {
    cy.get("div.ui.label div.detail").then(function ($element) {
      // First fetch number from label
      var numProjectInLabel = $element[0].innerHTML;
      cy.get("td.selectable a.table-entry").then(function ($projects) {
        // Compare number from label with count of projects in list
        expect($projects.length).to.eql(parseInt(numProjectInLabel));
      });
    });
  });
  it('when the "Create" button is clicked, the New Project page shows up', function () {
    // Check that the url is '{baseUrl}/project/[NUMBER]/script'
    cy.url().then(function ($url) {
      expect($url).to.match(/projects/);
    }); // Click the 'Add' button

    cy.get('a:contains("Create")').click(); // Check that the h3 header is 'New Script'

    cy.get('h1#title').then(function ($header) {
      // debugger
      expect($header).to.contain('New Project');
    }); // Check that the 'Cancel' and 'Create' buttons are visible

    cy.get('a[role=button].ui.button:contains("Cancel")').should('be.visible');
    cy.get('a[role=button].ui.primary.button:contains("Create")').should('be.visible');
  });
}); //
// describe('Scripts in Projects page', function () {
//
//     before(() => {
//         Cypress.Cookies.debug(true, {verbose: true});
//         Cypress.Cookies.defaults({
//             whitelist: "session_id"
//         });
//         Cypress.Cookies.preserveOnce("session_id", "remember_token");
//
//         // cy.login();
//     });
//
//     beforeEach(() => {
//
//         cy.login();
//         // Make sure that every test starts at the test project
//         cy.visit('/');
//
//         cy.get('h1').contains('Dashboard');
//         cy.get('span').contains('mark-test-first-project');
//         cy.get('a span:contains("mark-test-first-project")').click();
//     });
//
//     it('when a script is added, it shows in the scripts overview', function () {
//         cy.get('a:contains("Add")').click();
//
//         // check that the form contains the 'Name' and 'Description' input fields
//         cy.get('input#name').then(($input) => {
//             expect($input).to.be.visible;
//
//         }).type("my-test-script");
//         cy.get('input#description').then(($input) => {
//             expect($input).to.be.visible;
//         }).type("This script will be created, used for tests and deleted afterwards");
//
//         // cy.get('input#code_field').then(($input) => {
//         //     expect($input).to.be.hidden;
//         // }).type('info("This script has been created inside a test")');
//
//         cy.get('textarea.ace_text-input').type('info("This script has been created inside a test")', {force: true});
//
//         cy.get('button:contains("Create")').click();
//
//         cy.get('div.ui.top.attached.tabular.menu a.item:contains("Scripts")').click();
//
//         cy.get('table.ui.blue.table td.clickable a').then(($element) => {
//             // cy.log($element)
//             expect($element.last()).to.contain('my-test-script')
//         });
//
//         cy.get('table.ui.blue.table td.clickable a:contains("my-test-script")').click().then(() => {
//             cy.get('a[href*=\'ettings\'].ui.icon.button.right.floated').click().then(() => {
//                 cy.get('button.ui.button.red').first().click()
//
//             });
//             cy.get('div.modal button.ui.red.ok.button').click()
//         })
//
//     });
//
//     it('when a script is added, it can be run', function () {
//         cy.get('a:contains("Add")').click();
//
//         // check that the form contains the 'Name' and 'Description' input fields
//         cy.get('input#name').then(($input) => {
//             expect($input).to.be.visible;
//
//         }).type("my-test-script");
//         cy.get('input#description').then(($input) => {
//             expect($input).to.be.visible;
//         }).type("This script will be created, used for tests and deleted afterwards");
//
//         // cy.get('input#code_field').then(($input) => {
//         //     expect($input).to.be.hidden;
//         // }).type('info("This script has been created inside a test")');
//
//         cy.get('textarea.ace_text-input').type('info("This script has been created inside a test")', {force: true});
//
//         cy.get('button:contains("Create")').click();
//
//         cy.get('div.ui.top.attached.tabular.menu a.item:contains("Scripts")').click();
//
//         cy.get('table.ui.blue.table td.clickable a').then(($element) => {
//             // cy.log($element)
//             expect($element.last()).to.contain('my-test-script');
//         });
//
//         cy.get('table.ui.blue.table td.clickable a:contains("my-test-script")').click();
//         cy.get('div#jobs table.ui.compact.table td:contains("This script has not been executed yet.")').then(($element) => {
//             expect($element).to.be.visible;
//         });
//
//         cy.get('button.ui.positive.icon.button:contains("Run")').click().then(() => {
//             cy.get('div#jobs table.ui.compact.table td:contains("my-test-script")').then(($element) => {
//                 expect($element).to.be.visible;
//             });
//         });
//
//         cy.get('a[href*=\'ettings\'].ui.icon.button.right.floated').click().then(() => {
//             cy.get('button.ui.button.red').first().click()
//
//         });
//         cy.get('div.modal button.ui.red.ok.button').click()
//     })
// });
//
// describe('Schedules in projects page', function() {
//     before(() => {
//         Cypress.Cookies.debug(true, {verbose: true});
//         Cypress.Cookies.defaults({
//             whitelist: "session_id"
//         });
//         Cypress.Cookies.preserveOnce("session_id", "remember_token");
//
//         cy.login();
//
//     });
//
//     beforeEach(() => {
//         cy.login();
//         cy.visit('/');
//
//         cy.get('h1').contains('Dashboard');
//         cy.get('span').contains('mark-first-project');
//         cy.get('a span:contains("mark-first-project")').click();
//         cy.get('a.item:contains("Schedules")').click();
//
//     });
//
//     it('checks that the number of schedules in the label corresponds to the number of actual scripts', function() {
//         cy.get("table.ui.yellow.table div.ui.label div.detail").then(($element) => {
//             // First fetch number from label
//             let numSchedulesInLabel = $element[0].innerHTML;
//             cy.get("td.clickable a").then(($schedules) => {
//
//                 // Compare number from label with count of projects in list
//                 expect($schedules.length).to.eql(parseInt(numSchedulesInLabel));
//             })
//         });
//     });
//
//     it('checks that the schedules detail page opens', function() {
//         cy.get("td.clickable a").click();
//
//         cy.get("input#name").then(($element) => {
//             expect($element).to.have.value("autoharvest-scheduler");
//         });
//
//         cy.get("input#description").then(($element) => {
//             expect($element.val()).to.match(/Xillio Engine phase 2 testing task/);
//         });
//
//         cy.get("input.search").click().then(() => {
//             cy.get("div.menu.transition.visible").then(($element) => {
//                 expect($element).to.be.visible;
//
//                 cy.get("div.menu.transition.visible div.item.active.selected").click();
//             });
//         });
//
//         cy.get('input#cronString').then(($element) => {
//             expect($element).to.be.visible;
//
//             cy.get('div.ui.action.input button.ui.icon.button').click();
//
//             cy.get("div#cron-help").then(($element) => {
//                 expect($element).to.have.prop("style");
//
//             });
//         });
//
//     });
// });

},{}],3:[function(require,module,exports){
"use strict";

require('./Logging_in_spec');

require('./Projects_page_spec');

},{"./Logging_in_spec":1,"./Projects_page_spec":2}]},{},[3]);
