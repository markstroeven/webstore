/// <reference types="Cypress" />
import {ProductPage} from '../support/product-page';
import {ProductCard} from '../support/product-card';

describe('Product listing page', () => {
  beforeEach(() => {
    cy.visit('/', {failOnStatusCode: false});
  });

  describe('All elementary components are present', () => {
    it('Should contain a header bar with logo, title and favorites', () => {
      cy.get(ProductPage.logo);
      cy.get(ProductPage.title);
      cy.get(ProductPage.favorites);
    });
    it('Should contain a search field', () => {
      cy.get(ProductPage.query);
    });
    it('Should contain cards with the product title, category, price, description', () => {
      const card = cy.get(ProductPage.cards).first();
      card.get(ProductCard.title);
      card.get(ProductCard.subtitle);
      card.get(ProductCard.description);
      card.get(ProductCard.image);
      card.get(ProductCard.action);
    });
  });

  // Normally I would provide a fixture here to sub the backend endpoints, I am however already mocking the backend, so no need :)
  describe('Searching for a product', () => {
    it('SHould filter out any card that do not match the query', () => {
      cy.get(ProductPage.query).clear().type('Razer');
      cy.get(ProductPage.cards).should('have.length', 3);
    });
  });

  describe('Adding a product to favorites', () => {
    it('Should display a product in the wishlist', () => {
      cy.get(ProductPage.cards).first().get(ProductCard.action).first().click();
      cy.get(ProductPage.favorites).click();
      cy.get('mat-drawer-container').should('include.text', 'Razer Naga v2');
    });
    it('Should display a badge indicating the amount of saved items', () => {
      cy.get(ProductPage.cards).eq(0).get(ProductCard.action).first().click();
      cy.get(ProductPage.badge).should('have.text', '1');
    });
  });

  describe('Removing a product from favorites', () => {
    it('Should not display a product in the wishlist', () => {
      cy.get(ProductPage.cards).first().get(ProductCard.action).first().click();
      cy.get(ProductPage.favorites).click();
      cy.get('mat-drawer-container').should('include.text', 'Razer Naga v2');
      cy.get('mat-drawer-container').get(ProductPage.cards).first().get(ProductCard.action).first().click();
      cy.get('mat-drawer-container').should('include.text', 'U heeft nog geen opgeslagen favorieten.');
      cy.get(ProductPage.badge).should('have.text', '0');
    });
  });

  describe('Saving favorites in the session', () => {
    it('Should restore the state after a refresh', () => {
      cy.get(ProductPage.cards).first().get(ProductCard.action).first().click();
      cy.get(ProductPage.favorites).click();
      cy.get('mat-drawer-container').should('include.text', 'Razer Naga v2');
      cy.visit('/', {failOnStatusCode: false});
      cy.get(ProductPage.favorites).click();
      cy.get('mat-drawer-container').should('include.text', 'Razer Naga v2');
    });
  });
});
