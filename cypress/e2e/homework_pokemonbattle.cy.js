import * as data from '../helpers/default_data_pokemonbattle.json';

describe('Покупка аватара', function () {

  it('Успешная покупка нового аватара', function () {
    cy.visit('https://pokemonbattle.ru/login');
    cy.get(':nth-child(1) > .auth__input').type(data.user_login);
    cy.get('#password').type(data.user_password);
    cy.get('.auth__button').click();
    cy.wait(2000);
    cy.get('.header__container > .header__id').click({ force: true });
    cy.get('[href="/shop"]').click();
    cy.get('.available > button').first().click({ force: true });
    cy.get('.pay__payform-v2 > :nth-child(2) > .pay_base-input-v2').type('4620869113632996');
    cy.get(':nth-child(1) > .pay_base-input-v2').type('1225');
    cy.get('.pay-inputs-box > :nth-child(2) > .pay_base-input-v2').type('125');
    cy.get('.pay__input-box-last-of > .pay_base-input-v2').type('NAME');
    cy.get('.pay-btn').click();
    cy.get('#cardnumber').type('56456');
    cy.get('.payment__submit-button').click();
    cy.get('.payment__success1 > .payment__font-for-success').contains('Покупка прошла успешно');
    cy.get('.payment__font-for-success').should('be.visible');
  });
});

