import { Browser, Page } from "puppeteer";
import waitForTimeoutRandom from "../../helpers/waitForTimeoutRandomPuppetter";
import captureProfileInformationPuppetterService from "./captureProfileInformationPuppetterService";
import captureTextViaSelector from "../../helpers/captureTextViaSelectorPuppetter";
import createInviteMessageConnection from "../../helpers/createInviteMessageConnection";
import elementSelectorLinkedinConstants from "../../constants/elementSelectorLinkedinConstants";

interface Options {
  keywords: string;
  pageLimit?: number;
  inviteType?: "rh" | "dev";
}

const verifyLimitInviteMessagesSend = async (
  page: Page,
  onLimit?: () => Promise<void>
) => {
  const modalTitle = (
    await captureTextViaSelector(
      page,
      elementSelectorLinkedinConstants.TITLE_POPUP_ADD_NOTE_CONNECTION_INVITE
    )
  )?.toLowerCase();
  if (modalTitle === "no free personalized invitations left") {
    await page.click(
      elementSelectorLinkedinConstants.BUTTON_CLOSE_POPUP_ADD_NOTE_CONNECTION_INVITE
    );
    await waitForTimeoutRandom(page);
    if (onLimit) await onLimit();
    await page.click(
      elementSelectorLinkedinConstants.BUTTON_POPUP_SEND_WITHOUT_A_NOTE_CONNECTION_INVITE
    );
    await waitForTimeoutRandom(page);
    return true;
  }

  return false;
};

const sendConnectionInitationPuppetterService = async (
  browser: Browser,
  { keywords, inviteType = "rh", pageLimit = 5 }: Options
) => {
  const page = await browser.newPage();

  let connectionsMade = 0;
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
      elementSelectorLinkedinConstants.PERSON_LIST_CONNECTION_INVITE
    );

    for (const personElement of personElements) {
      const username = await (
        await personElement.$(
          elementSelectorLinkedinConstants.USERNAME_PERSON_LIST_CONNECTION_INVITE
        )
      )?.evaluate((el: any) => el.href.match(/\/in\/([^/?]+)/)?.[1]);

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
          elementSelectorLinkedinConstants.BUTTON_POPUP_ADD_NOTE_CONNECTION_INVITE
        );

        await waitForTimeoutRandom(page);

        const modalExists = await verifyLimitInviteMessagesSend(
          page,
          async () => {
            await connectButton.click();
            connectionsMade++;
          }
        );

        if (!modalExists) {
          const inviteMessage = await createInviteMessageConnection({
            name: name ?? "",
            description: description ?? "",
            title: title ?? "",
            type: inviteType,
          });
          await page.type(
            elementSelectorLinkedinConstants.TEXT_AREA_POPUP_CONNECTION_INVITE,
            inviteMessage
          );
          await waitForTimeoutRandom(page);
          await page.click(
            elementSelectorLinkedinConstants.BUTTON_POPUP_SUBMIT_CONNECTION_INVITE
          );
          await waitForTimeoutRandom(page);
          invitationsSent++;
          connectionsMade++;
        }
      }
    }
    pageIndex++;
  }

  await page.close();
  return {
    invitationsSent,
    connectionsMade,
  };
};

export default sendConnectionInitationPuppetterService;
