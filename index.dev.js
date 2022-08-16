import core from "@actions/core";
import { TwitterApi } from "twitter-api-v2";
import { uploadImage, getLatestReleaseText } from "./helpers";

const IMG_URL =
  "https://github.com/AddToDoist/AddToDoist/blob/main/assets/social-preview.png?raw=true";
const RELEASE_URL =
  "https://api.github.com/repos/AddToDoist/AddToDoist/releases/latest";

const userClient = new TwitterApi({
  appKey: core.getInput("consumer-key"),
  appSecret: core.getInput("consumer-secret"),
  accessToken: core.getInput("access-token"),
  accessSecret: core.getInput("access-token-secret"),
});

try {
  const [imageId, releaseText] = await Promise.all([
    uploadImage(IMG_URL),
    getLatestReleaseText(RELEASE_URL),
  ]);
  await userClient.v2.tweet(releaseText, { media: { media_ids: [imageId] } });
} catch (err) {
  core.setFailed(err.message);
}
