const { expect } = require('chai');
const { clickElement, putText, getText, } = require('./lib/commands.js');
const { generateName } = require('./lib/util.js');

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultTimeout(10000);
});

afterEach(() => {
  page.close();
});

describe("Cinema ticket booking tests", () => {
  beforeEach(async () => {
    await page.goto("https://qamid.tmweb.ru/client/index.php");
  });
  test("First happy path test: booking available ticket", async () => {
    await clickElement(page, 'a:nth-child(2)'); // выбираем день недели
    await clickElement(page, ".movie-seances__time[href='#'][data-seance-id='217']"); // время и зал
    await clickElement(page, 'div:nth-child(3) span:nth-child(5)'); // место в зале
    await clickElement(page, '.acceptin-button'); // забронировать
    //проверка открытия страницы для получения кода бронирования
    const expected = 'Вы выбрали билеты:';
    const actual = await getText(page, '.ticket__check-title');
    expect(actual).contain(expected);
  });

  test("Second happy path test: booking some available tickets", async () => {
    await clickElement(page, 'a:nth-child(3)'); // выбираем день недели
    await clickElement(page, ".movie-seances__time[href='#'][data-seance-id='217']"); // время и зал
    await clickElement(page, 'div:nth-child(3) span:nth-child(5)'); // место в зале
    await clickElement(page, 'div:nth-child(4) span:nth-child(7)'); // место в зале
    await clickElement(page, 'div:nth-child(2) span:nth-child(1)'); // место в зале
    await clickElement(page, '.acceptin-button'); // забронировать
    //проверка открытия страницы для получения кода бронирования
    const expected = 'Вы выбрали билеты:';
    const actual = await getText(page, '.ticket__check-title');
    expect(actual).contain(expected);
  });

  test("Sad path test: booking unavailable ticket", async () => {
    await clickElement(page, 'a:nth-child(2)'); // выбираем день недели
    await clickElement(page, ".movie-seances__time[href='#'][data-seance-id='217']"); //зал и время
    await clickElement(page, '.buying-scheme__chair.buying-scheme__chair_standart.buying-scheme__chair_taken');
    const button = await page.$('button.acceptin-button');
    const actual = await page.evaluate((button) => button.disabled, button);
    expect(actual).to.equal(true);
  });
});

//код из лекции 
// const { clickElement, putText, getText } = require("./lib/commands.js");
// const { generateName } = require("./lib/util.js");

// let page;

// beforeEach(async () => {
//   page = await browser.newPage();
//   await page.setDefaultNavigationTimeout(0);
// });

// afterEach(() => {
//   page.close();
// });

// describe("Netology.ru tests", () => {
//   beforeEach(async () => {
//     page = await browser.newPage();
//     await page.goto("https://netology.ru");
//   });

//   test("The first test'", async () => {
//     const title = await page.title();
//     console.log("Page title: " + title);
//     await clickElement(page, "header a + a");
//     const title2 = await page.title();
//     console.log("Page title: " + title2);
//     const pageList = await browser.newPage();
//     await pageList.goto("https://netology.ru/navigation");
//     await pageList.waitForSelector("h1");
//   });

//   test("The first link text 'Медиа Нетологии'", async () => {
//     const actual = await getText(page, "header a + a");
//     expect(actual).toContain("Медиа Нетологии");
//   });

//   test("The first link leads on 'Медиа' page", async () => {
//     await clickElement(page, "header a + a");
//     const actual = await getText(page, ".logo__media");
//     await expect(actual).toContain("Медиа");
//   });
// });

// test("Should look for a course", async () => {
//   await page.goto("https://netology.ru/navigation");
//   await putText(page, "input", "тестировщик");
//   const actual = await page.$eval("a[data-name]", (link) => link.textContent);
//   const expected = "Тестировщик ПО";
//   expect(actual).toContain(expected);
// });

// test("Should show warning if login is not email", async () => {
//   await page.goto("https://netology.ru/?modal=sign_in");
//   await putText(page, 'input[type="email"]', generateName(5));
// });
