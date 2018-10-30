(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

describe('Tenant page', function () {
  beforeEach(function () {
    cy.fixture("markTest.json").as("user").then(function ($user) {
      cy.visit('?token=' + $user.githubToken);
    });
  });
  after(function () {
    // cy.get("a[role=listitem]").siblings().then(($item) => {
    //     expect($item[1].innerText).to.contain("whatever (whatever)");
    //     expect($item[2].innerText).to.contain("mark-test-tenant-creation");
    // });
    cy.get('a[role=listitem] div.header:contains("whatever (whatever)")').click();
    cy.get("h2 button.ui.red.icon.right.floated.button[role=button]").click();
    cy.get("a.ui.red.button").click();
    cy.get('a[role=listitem] div.header:contains("mark-test-tenant-creation")').click();
    cy.get("h2 button.ui.red.icon.right.floated.button[role=button]").click();
    cy.get("a.ui.red.button").click();
  });
  it('When the app is started, then the landing page is showing', function () {
    // Check that the top bar contains an image with alt text 'Xillio logo'
    cy.get("header a img").then(function ($element) {
      expect($element[0]).to.have.property("alt", "Xillio logo");
    }); // Check that the header equals 'Tenants'

    cy.get("div.four.wide.column h2").should('contain', "Tenants"); // Check that the header has an 'Add' button

    cy.get("div.four.wide.column h2 a").should('have.class', 'ui green icon right floated button'); // Check that no tenant are selected by default

    cy.get("div.twelve.wide.column").should('contain', 'No tenant has been selected. Select one in order to see its information, or create a new tenant.'); // Check that the menu has the expected structure

    cy.get("div[role=list].ui.divided.selection.list").then(function ($list) {
      // debugger
      // expect($list).to.be.empty;
      cy.get("div[role=list].ui.divided.selection.list a").should('have.class', 'item');
      cy.get("div[role=list].ui.divided.selection.list a div.header").should('exist');
      cy.get("div[role=list].ui.divided.selection.list a div.description").should('exist');
    });
  });
  it('When the "Add" button is clicked, then the "Add Tenant" form is shown', function () {
    cy.get("div.four.wide.column h2 a").then(function ($element) {
      $element[0].click(); // Check that the header equals 'Tenants'

      cy.get("div.four.wide.column h2").should('contain', "Tenants"); // Check that the header has an 'Add' button

      cy.get("div.four.wide.column h2 a").should('have.class', 'ui green icon right floated button'); // Check that no tenant are selected by default

      cy.get("div.twelve.wide.column h2").should('contain', 'Create Tenant');
      cy.get("div.twelve.wide.column form.ui.form div.field").siblings().then(function ($field) {
        expect($field[0]).to.have.descendants("label");
        expect($field[0]).to.have.descendants("input");
        expect($field[1]).to.have.descendants("label");
        expect($field[1]).to.have.descendants("input");
        expect($field[2]).to.have.descendants("label");
        expect($field[2]).to.have.descendants("textarea");
      });
      cy.get("div.twelve.wide.column form.ui.form button").should('exist');
    });
  });
  it('When the "Add Tenant" form is left empty and the button is clicked, the error messages show that the fields are left empty', function () {
    cy.get("div.four.wide.column h2 a").then(function ($element) {
      $element[0].click();
    }); // Click "Create" button, without the "System Name" field being filled in, throws an error

    cy.get("div.twelve.wide.column form.ui.form button").click().then(function () {
      cy.get("div.twelve.wide.column form.ui.form div.field").siblings().then(function ($field) {
        expect($field[0]).to.have.class("error field");
      }); // Provide a "System Name" in the form

      cy.get("input[name=systemName]").type("whatever"); // Click the "Create" button and no error will be thrown anymore

      cy.get("div.twelve.wide.column form.ui.form button").click().then(function () {
        cy.get("div.twelve.wide.column form.ui.form div.field").siblings().then(function ($field) {
          expect($field[0]).not.to.have.class("error field");
        });
      });
    });
  });
  it('When the "Add Tenant" form is properly filled in and the button is clicked, the tenant is added and shows in the left column', function () {
    cy.get("div.four.wide.column h2 a").then(function ($element) {
      $element[0].click();
    }); // Provide a "System Name" in the form

    cy.get("input[name=systemName]").type("Mark test Tenant creation!!");
    cy.get("input[name=displayName]").type("mark-test-tenant-creation");
    cy.get("textarea[name=description]").type("Mark test Tenant creation description field to see if the information is being shown in the front end!!"); // Click the "Create" button and no error will be thrown anymore

    cy.get("div.twelve.wide.column form.ui.form button").click().then(function () {
      // loop through the form fields and check that the first field (systemName) has no error
      cy.get("div.twelve.wide.column form.ui.form div.field").siblings().then(function ($field) {
        expect($field[0]).not.to.have.class("error field");
      });
    });
  });
  describe('Tenant detail', function () {
    it('When the default tenant is clicked in the tenant list, the detail page is opened', function () {
      // Loop through all tenants from the left menu under the search option
      cy.get("a[role=listitem] div.header:contains('Tenant (tenant)')").then(function ($element) {
        expect($element).to.be.visible;
        $element.click();
        cy.pageIsTenantDetailPageWithTitle('tenant (Tenant)');
      });
    });
    it('When the edit button is clicked in the tenant detail page, the edit tenant page is loaded with the current tenant\'s information', function () {
      cy.get("a[role=listitem] div.header:contains('whatever (whatever)')").click();
      cy.get("a.ui.icon.primary.right.floated.button").click();
      cy.get("textarea[name=description]").type("{selectall}{backspace}");
      cy.get("textarea[name=description]").type("Some totally new description");
      debugger;
      cy.get("button[type=submit][role=button]").click();
      cy.get("a[role=listitem] div.header:contains('whatever (whatever)')").then(function ($element) {
        expect($element).to.contain("Some totally new description");
      }); // Leave test with initial state

      cy.get("input[name=displayName]").type("{selectall}{backspace}");
      cy.get("input[name=displayName]").type("BlaBla");
      cy.get("textarea[name=description]").type("{selectall}{backspace}");
      cy.get("textarea[name=description]").type("Auto-generated by the application.");
      cy.get("button[type=submit]").click();
    });
  });
  describe('Search functionality', function () {
    it('The Search functionality is showing', function () {
      // cy.visit('?token=95bfc10a180208e9a2ee19fafa2302b7eab9ca01');
      cy.get('div.ui.fluid.icon.input input[name=filter]').then(function ($element) {
        expect($element).to.have.attr('placeholder', 'Search...');
      });
    });
    it('The tenant disappears from list when the search input field contains a regex that does not match with the tenant name', function () {
      cy.wait(100);
      cy.get('div[role=list]').then(function ($element) {
        expect($element).to.have.descendants("a");
      }); // Enter a combination of letters that will not appear in a tenant name

      cy.get('input[name=filter]').type("abcdefghijklmnop"); // No tenant will be shown

      cy.get('div[role=list]').then(function ($element) {
        expect($element).not.to.have.descendants("a");
      }); // Empty the search input field

      cy.get('input[name=filter]').type("{selectall}{backspace}"); // The tenant will reappear

      cy.get('div[role=list]').then(function ($element) {
        expect($element).to.have.descendants("a");
      });
    });
  });
});

},{}]},{},[1]);
