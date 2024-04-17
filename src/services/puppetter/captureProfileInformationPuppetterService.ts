import { Browser } from "puppeteer";
import waitForTimeoutRandom from "../../helpers/waitForTimeoutRandomPuppetter";
import captureTextViaSelector from "../../helpers/captureTextViaSelectorPuppetter";
import elementSelectorLinkedinConstants from "../../constants/elementSelectorLinkedinConstants";

const captureProfileInformationPuppetterService = async (
  browser: Browser,
  username: string
) => {
  const page = await browser.newPage();

  await waitForTimeoutRandom(page);

  await page.goto(`https://www.linkedin.com/in/${username}`);

  await waitForTimeoutRandom(page);

  const profile = {
    name: await captureTextViaSelector(
      page,
      elementSelectorLinkedinConstants.NAME_PROFILE_ABOUT_PAGE
    ),
    title: await captureTextViaSelector(
      page,
      elementSelectorLinkedinConstants.TITLE_PROFILE_ABOUT_PAGE
    ),
    description:
      (await captureTextViaSelector(
        page,
        elementSelectorLinkedinConstants.DESCRIPTION_PROFILE_ABOUT_PAGE
      )) ??
      (await captureTextViaSelector(
        page,
        elementSelectorLinkedinConstants.DESCRIPTION_ME_PROFILE_ABOUT_PAGE
      )),
  };

  await waitForTimeoutRandom(page);

  await page.close();

  return profile;
};

export default captureProfileInformationPuppetterService;
