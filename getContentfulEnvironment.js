const contentfulManagement = require("contentful-management");
require("dotenv").config();

module.exports = function () {
  const contentfulClient = contentfulManagement.createClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_KEY,
  });

  return contentfulClient
    .getSpace(process.env.CONTENTFUL_SPACE)
    .then((space) => space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT));
};
