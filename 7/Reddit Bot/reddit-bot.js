const prompt = require('prompt-sync')();
const { Builder, By, until } = require("selenium-webdriver");

const username = prompt('Username: ');
const password = prompt('Password: ', {echo: ''});

async function login() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("https://www.reddit.com/login/");
    await driver.navigate().refresh();

    await driver.findElement(By.id("login-username")).sendKeys(username);
    await driver.findElement(By.id("login-password")).sendKeys(password);

    await driver.findElement(By.css("button.login")).click();

    await driver.wait(until.elementLocated(By.id("create-post")), 5000);

    console.log("Logged in successfully!");
  } finally {
    await driver.quit();
  }
}

login();