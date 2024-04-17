import { Page } from "puppeteer";
interface Options {
  min: number;
  max: number;
}
const waitForTimeoutRandom = async (
  page: Page,
  { min, max }: Options = { min: 1000, max: 3000 }
) => {
  const randomTime = Math.floor(Math.random() * (max - min + 1)) + min;
  await new Promise((resolve) => setTimeout(resolve, randomTime));
};

export default waitForTimeoutRandom;
