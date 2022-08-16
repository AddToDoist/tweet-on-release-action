const core = require( "@actions/core")
const { TwitterApi } = require( "twitter-api-v2")
const { uploadImage, getLatestReleaseText } = require( "./helpers")

console.log(core)

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

async function main() {
  try {
    const [imageId, releaseText] = await Promise.all([
      uploadImage(IMG_URL),
      getLatestReleaseText(RELEASE_URL),
    ]);
    await userClient.v2.tweet(releaseText, { media: { media_ids: [imageId] } });
  } catch (err) {
    core.setFailed(err.message);
  }
}

main()

