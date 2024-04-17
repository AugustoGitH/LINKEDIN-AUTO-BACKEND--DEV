import { Browser } from "puppeteer";
import path from "path";
import fs from "fs";
import waitForTimeoutRandom from "../../helpers/waitForTimeoutRandomPuppetter";
import redirectLinkedinConstants from "../../constants/redirectLinkedinConstants";
import elementSelectorLinkedinConstants from "../../constants/elementSelectorLinkedinConstants";

const authSessionLinkedinPuppetterService = async (browser: Browser) => {
  const page = await browser.newPage();

  const cookiesFilePath = path.resolve(
    __dirname,
    "../../puppetter/cookies.json"
  );

  let cookies;

  try {
    cookies = JSON.parse(fs.readFileSync(cookiesFilePath, "utf8"));

    console.log("Cookies loaded successfully!");
  } catch (error) {
    console.log("Cookie file not found. Creating new file...");

    await waitForTimeoutRandom(page);

    await page.goto(redirectLinkedinConstants.LOGIN);

    await waitForTimeoutRandom(page);

    await page.type(
      elementSelectorLinkedinConstants.INPUT_LOGIN,
      process.env.LOGIN_EMAIL_SESSION_LINKEDIN ?? ""
    );

    await waitForTimeoutRandom(page);

    await page.type(
      elementSelectorLinkedinConstants.INPUT_PASSWORD,
      process.env.LOGIN_PASSWORD_SESSION_LINKEDIN ?? ""
    );

    await waitForTimeoutRandom(page);

    await page.click(elementSelectorLinkedinConstants.BUTTON_LOGIN_SUBMIT);

    await waitForTimeoutRandom(page);

    cookies = await page.cookies();

    fs.writeFileSync(cookiesFilePath, JSON.stringify(cookies, null, 2));

    console.log("New cookies saved in:", cookiesFilePath);
  }

  await page.setCookie(...cookies);

  await waitForTimeoutRandom(page);

  await page.close();
};

export default authSessionLinkedinPuppetterService;
