import puppeteer from "puppeteer";
import authSessionLinkedinPuppetterService from "../services/puppetter/authSessionLinkedinPuppetterService";

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
})();
