const puppeteer = require('puppeteer');
const chai = require('chai');
const expect = chai.expect;
const { Given, When, Then, Before, After } = require('cucumber');
const { putText, getText, clickElement } = require('../../lib/commands.js');

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given('пользователь находится на странице {string}', async function (string) {
  return await this.page.goto(string);
});
When('пользователь выбирает дату', async function () {
  return await clickElement(this.page, 'a:nth-child(2)');
});
When('пользователь выбирает время фильма', async function () {
  return await clickElement(this.page, ".movie-seances__time[href='#'][data-seance-id='217']");
});
When('пользователь выбирает место и ряд', async function () {
  return await clickElement(this.page, 'div:nth-child(2) span:nth-child(4)');
});
When('пользователь нажимает кнопку забронировать', async function () {
  return await clickElement(this.page, '.acceptin-button');
});
Then('пользователь на странице с текстом {string}', async function (string) {
  const actual = await getText(this.page, '.ticket__check-title');
  const expected = string;
  expect(actual).contain(expected);
});
When('пользователь выбирает время и зал в вип зал', async function () {
  return await clickElement(this.page, ".movie-seances__time[href='#'][data-seance-id='198']");
});
When('пользователь выбирает место в вип зале', async function () {
  return await clickElement(this.page, 'div:nth-child(7) span:nth-child(10)');
});
Then('пользователь видит страницу с указанной суммой {string}', async function (string) {
  const actual = await getText(this.page, 'body main p:nth-child(6)');
  const expected = string;
  expect(actual).contain(expected);
});
When('пользователь выбирает уже забронированное место', async function () {
  return await clickElement(this.page, '.buying-scheme__chair.buying-scheme__chair_standart.buying-scheme__chair_taken');
});
Then('нажать на кнопку забронировать невозможно', async function () {
  const button = await this.page.$('button.acceptin-button');
  const isDisabled = await this.page.evaluate((button) => button.disabled, button);
  expect(isDisabled).to.equal(true);
});


// код из лекции
// const puppeteer = require("puppeteer");
// const chai = require("chai");
// const expect = chai.expect;
// const { Given, When, Then, Before, After } = require("cucumber");
// const { putText, getText } = require("../../lib/commands.js");

// Before(async function () {
//   const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
//   const page = await browser.newPage();
//   this.browser = browser;
//   this.page = page;
// });

// After(async function () {
//   if (this.browser) {
//     await this.browser.close();
//   }
// });

// Given("user is on {string} page", async function (string) {
//   return await this.page.goto(`https://netology.ru${string}`, {
//     setTimeout: 20000,
//   });
// });

// When("user search by {string}", async function (string) {
//   return await putText(this.page, "input", string);
// });

// Then("user sees the course suggested {string}", async function (string) {
//   const actual = await getText(this.page, "a[data-name]");
//   const expected = await string;
//   expect(actual).contains(expected);
// });
