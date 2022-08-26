import core from "@actions/core";
import { TwitterApi } from "twitter-api-v2";
import { uploadImage, getLatestReleaseText } from "./helpers.js";

console.log(process.argv);

const IMG_URL =
  "https://github.com/AddTodoist/AddTodoist/blob/main/assets/social-preview.png?raw=true";
const RELEASE_URL =
  "https://api.github.com/repos/AddTodoist/AddTodoist/releases/latest";

const args = process.argv.slice(2);
const [appKey, appSecret, accessToken, accessSecret] = args;

const userClient = new TwitterApi({
  appKey,
  appSecret,
  accessToken,
  accessSecret,
});

try {
  const [imageId, releaseText] = await Promise.all([
    uploadImage(IMG_URL, userClient),
    getLatestReleaseText(RELEASE_URL),
  ]);
  await userClient.v2.tweet(releaseText, { media: { media_ids: [imageId] } });
} catch (err: any) {
  core.setFailed(err.message);
}
