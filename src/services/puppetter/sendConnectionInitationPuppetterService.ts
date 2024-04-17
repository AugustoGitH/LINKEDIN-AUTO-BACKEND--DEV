import { Browser, Page } from "puppeteer";
import waitForTimeoutRandom from "../../helpers/waitForTimeoutRandomPuppetter";
import captureProfileInformationPuppetterService from "./captureProfileInformationPuppetterService";
import captureTextViaSelector from "../../helpers/captureTextViaSelectorPuppetter";

interface Options {
  keywords: string;
  pageLimit?: number;
  inviteType?: "rh" | "dev";
}

const verifyModal = async (page: Page) => {
  const modalTitle = (
    await captureTextViaSelector(
      page,
      ".artdeco-modal-overlay .upsell-modal__header h2"
    )
  )?.toLowerCase();
  if (modalTitle === "no free personalized invitations left") {
    await page.click(
      ".artdeco-modal-overlay button[data-test-modal-close-btn]"
    );
    waitForTimeoutRandom(page);

    return true;
  }

  return false;
};
const sendConnectionInitationPuppetterService = async (
  browser: Browser,
  { keywords, inviteType = "rh", pageLimit = 5 }: Options = {}
) => {
  const page = await browser.newPage();

  let invitationsSent = 0;
  let pageIndex = 1;

  while (pageIndex <= pageLimit) {
    await waitForTimeoutRandom(page);

    await page.goto(
      `https://www.linkedin.com/search/results/people/?keywords=${keywords.replace(
        / /g,
        "%20"
      )}&origin=CLUSTER_EXPANSION&page=${pageIndex}&sid=%2Cg%40`
    );

    await waitForTimeoutRandom(page);

    const personElements = await page.$$(
      ".reusable-search__entity-result-list .reusable-search__result-container .linked-area"
    );

    for (const personElement of personElements) {
      const username = await (
        await personElement.$(".entity-result__title-text a.app-aware-link")
      )?.evaluate((el) => el.href.match(/\/in\/([^/?]+)/)?.[1]);

      const connectButton = await personElement.$("button");

      const buttonLabel = await connectButton?.evaluate((el) =>
        el.innerText.toLowerCase()
      );

      if (buttonLabel === "connect" && username && connectButton) {
        const { name, description, title } =
          await captureProfileInformationPuppetterService(browser, username);

        await connectButton.click();

        await waitForTimeoutRandom(page);

        await page.click(
          ".artdeco-modal-overlay .artdeco-modal__actionbar button:nth-child(1)"
        );

        await waitForTimeoutRandom(page);

        const modalExists = await verifyModal(page);

        if (!modalExists) {
          const inviteMessage = "";
          await page.type("textarea.ember-text-area", inviteMessage);
          await waitForTimeoutRandom(page);
          await page.click(".artdeco-modal__actionbar button:nth-child(2)");
          await waitForTimeoutRandom(page);
          invitationsSent++;
        }
      }
    }
    pageIndex++;
  }
};

export default sendConnectionInitationPuppetterService;
