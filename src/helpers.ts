import axios from "axios";
import type { TwitterApi } from "twitter-api-v2";

export const uploadImage = async (url: string, client: TwitterApi) => {
  const image_buffer = await getImageFromUrl(url);
  const uploadedImageId = await uploadImageToTwitter(image_buffer, client);
  return uploadedImageId;
};

export const getLatestReleaseText = async (releaseUrl: string) => {
  const { data } = await axios.get(releaseUrl);
  const { html_url, name } = data;
  return `🔴 New AddTodoist version! (${name}) 🎉\n\n⬇️ See what's new here:\n${html_url}`;
};

const getImageFromUrl = async (url: string) => {
  const response = await axios.get(url, { responseType: "arraybuffer" });
  return Buffer.from(response.data);
};

const uploadImageToTwitter = async (image: Buffer, client: TwitterApi) => {
  const imageId = await client.v1.uploadMedia(image, {
    mimeType: "image/png",
  });
  return imageId;
};
