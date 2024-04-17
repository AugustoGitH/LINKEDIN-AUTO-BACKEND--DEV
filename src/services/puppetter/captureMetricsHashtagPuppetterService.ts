import { Browser, Page } from "puppeteer";
import waitForTimeoutRandom from "../../helpers/waitForTimeoutRandomPuppetter";
import elementSelectorLinkedinConstants from "../../constants/elementSelectorLinkedinConstants";

interface Options {
  postLimit: number;
}

const captureCurrentPostsCount = async (page: Page) => {
  return (
    await page.$$(elementSelectorLinkedinConstants.POSTS_RESULT_HASHTAG_PAGE)
  ).length;
};

const capturePostsCount = async (page: Page, postLimit: number) => {
  let previousPostsCount = 0;
  let currentPostsCount = await captureCurrentPostsCount(page);

  while (true) {
    await page.click(
      elementSelectorLinkedinConstants.BUTTON_SEE_MORE_POSTS_HASHTAG_PAGE
    );
    await waitForTimeoutRandom(page);

    currentPostsCount = await captureCurrentPostsCount(page);

    if (
      currentPostsCount === previousPostsCount ||
      currentPostsCount > postLimit
    ) {
      break;
    }
    previousPostsCount = currentPostsCount;
  }

  return currentPostsCount;
};

const captureMetricsHashtagPuppetterService = async (
  browser: Browser,
  hashtag: string,
  { postLimit }: Options = { postLimit: 100 }
) => {
  const page = await browser.newPage();

  await waitForTimeoutRandom(page);

  await page.goto(`https://www.linkedin.com/feed/hashtag/?keywords=${hashtag}`);

  const followersLabel = (
    await (
      await page.waitForSelector(
        elementSelectorLinkedinConstants.FOLLOWERS_HASHTAG_PAGE
      )
    )?.evaluate((el) => el.textContent)
  )?.trim();

  const followersCount = followersLabel
    ? Number(followersLabel.split(" ")[0].replace(",", ""))
    : null;

  await waitForTimeoutRandom(page);

  await page.click(elementSelectorLinkedinConstants.BUTTON_CLOSE_MENU_MESSAGES);

  await waitForTimeoutRandom(page);

  const postsCount = await capturePostsCount(page, postLimit);

  await page.close();

  return {
    posts: postsCount,
    followers: followersCount,
  };
};

export default captureMetricsHashtagPuppetterService;
