const axios = require("axios");
const uploadImage = async (url) => {
  const image_buffer = await getImageFromUrl(url);
  const uploadedImageId = await uploadImageToTwitter(image_buffer);
  return uploadedImageId;
};

const getLatestReleaseText = async (releaseUrl) => {
  const { data } = await axios.get(releaseUrl);
  const { html_url, name } = data;
  return `🔴 New AddToDoist version! (${name}) 🎉\n\n⬇️ See what's new here:\n${html_url}`;
};

const getImageFromUrl = async (url) => {
  const response = await axios.get(url, { responseType: "arraybuffer" });
  return Buffer.from(response.data);
};

const uploadImageToTwitter = async (image_buffer) => {
  const imageId = await userClient.v1.uploadMedia(image_buffer, {
    mimeType: "image/png",
  });
  return imageId;
};

module.exports = {
  uploadImage,
  getLatestReleaseText,
}
