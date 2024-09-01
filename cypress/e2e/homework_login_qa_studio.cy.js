import * as main_page from "../locators/main_page.json";
import * as recovery_password_page from "../locators/recovery_password_page.json"
import * as result_page from "../locators/result_page.json"
import * as data from "../helpers/default_data.json"

describe('Проверка авторизации', function () {

  beforeEach('Начало теста', function () {
    cy.visit('/');
    cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)');
  });

  afterEach('Конец теста', function () {
    cy.get(result_page.title).should('be.visible');
    cy.get(result_page.close).should('be.visible');
  });

  it('Верный пароль и верный логин', function () {
    cy.get(main_page.email).type(data.login);
    cy.get(main_page.password).type(data.password);
    cy.get(main_page.login_button).click();
    cy.get(result_page.title).contains('Авторизация прошла успешно');
  })

  it('Восстановление пароля', function () {
    cy.get(main_page.fogot_pass_btn).click();
    cy.get(recovery_password_page.email).type(data.login);
    cy.get(recovery_password_page.send_button).click();
    cy.get(result_page.title).contains('Успешно отправили пароль на e-mail');
  })

  it('Неверный логин и верный пароль', function () {
    cy.get(main_page.email).type('german@dolnikov.com');
    cy.get(main_page.password).type(data.password);
    cy.get(main_page.login_button).click();
    cy.get(result_page.title).contains('Такого логина или пароля нет');
  })

  it('Верный логин и неверный пароль', function () {
    cy.get(main_page.email).type(data.login);
    cy.get(main_page.password).type('iLoveqastudio2');
    cy.get(main_page.login_button).click();
    cy.get(result_page.title).contains('Такого логина или пароля нет');
  })

  it('Валидация на наличие @', function () {
    cy.get(main_page.email).type('germandolnikov.ru');
    cy.get(main_page.password).type(data.password);
    cy.get(main_page.login_button).click();
    cy.get(result_page.title).contains('Нужно исправить проблему валидации');
  })

  it('Приведение логина к строчным буквам, пароль верный', function () {
    cy.get(main_page.email).type('GerMan@Dolnikov.ru');
    cy.get(main_page.password).type(data.password);
    cy.get(main_page.login_button).click();
    cy.get(result_page.title).contains('Авторизация прошла успешно');
  })
})


// npx cypress run --spec cypress/e2e/homework_login_qa_studio.cy.js --browser chrome
