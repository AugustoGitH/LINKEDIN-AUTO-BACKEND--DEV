import { Page } from "puppeteer";

const captureTextViaSelector = async (page: Page, selector: string) => {
  try {
    return await (
      await page.$(selector)
    )?.evaluate((el) => el.textContent?.trim());
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default captureTextViaSelector;
