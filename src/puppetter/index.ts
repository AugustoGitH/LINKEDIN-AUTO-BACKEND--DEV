import puppeteer from "puppeteer";
import authSessionLinkedinPuppetterService from "../services/puppetter/authSessionLinkedinPuppetterService";
import sendConnectionInitationPuppetterService from "../services/puppetter/sendConnectionInitationPuppetterService";

(async () => {
  const browser = await puppeteer.launch({ headless: false });

  await authSessionLinkedinPuppetterService(browser);

  // const profile = await captureProfileInformationPuppetterService(
  //   browser,
  //   "augusto-westphal"
  // );
  // console.log(profile);

  // const hashtag = await captureMetricsHashtagPuppetterService(
  //   browser,
  //   "linguiça",
  //   {
  //     postLimit: 40,
  //   }
  // );

  // console.log(hashtag);

  const dev = await sendConnectionInitationPuppetterService(browser, {
    keywords: "desenvolvimento web",
    inviteType: "dev",
    pageLimit: 3,
  });

  const rh = await sendConnectionInitationPuppetterService(browser, {
    keywords: "tech recruiter",
    inviteType: "rh",
    pageLimit: 3,
  });

  console.log(dev, rh);
})();
