const moment = require("moment"),
  slugify = require("slugify"),
  UglifyJS = require("uglify-es"),
  cleanCSS = require("clean-css");

moment.locale("en");

module.exports = function (config) {
  // 11ty, Do not process folders
  config.addPassthroughCopy("images");
  config.addPassthroughCopy("scripts");
  config.addPassthroughCopy("styles");
  config.addPassthroughCopy("admin");
  config.addPassthroughCopy("webfonts");
  config.addPassthroughCopy(".well-known");
  config.addPassthroughCopy("favicon.ico");
  config.addPassthroughCopy("robots.txt");
  config.addPassthroughCopy("safari-pinned-tab.svg");
  config.addPassthroughCopy("browserconfig.xml");
  config.addPassthroughCopy("netlify.toml");
  config.addPassthroughCopy("functions");

  // Date formatting (machine readable)
  config.addFilter("dateIso", (date) => {
    return moment(date).toISOString();
  });

  //Date formatting (Human readable)
  config.addFilter("dateReadable", (date) => {
    return moment(date).format("LL");
  });

  // shorten a title of article
  config.addFilter("short", (article) => {
    let len = 100;
    return article.substring(0, len);
  });

  // filter for safe urls
  config.addFilter("slug", (input) => {
    const options = {
      replacement: "-",
      remove: /[&,+()$~%.^'":*?/!<>`~{}@#_;=|]/g,
      lower: true,
    };
    return slugify(input, options);
  });

  // Make a list of categories from posts
  config.addCollection("catList", function getCatList(collection) {
    let catSet = new Set();

    collection
      .getAllSorted()
      .reverse()
      .forEach(
        (item) =>
          typeof item.data.category === "string" &&
          catSet.add(item.data.category)
      );

    return [...catSet];
  });

  // make all categories as a collection
  config.addCollection("categories", function makeCat(collection) {
    let categories = {};
    collection
      .getAllSorted()
      .reverse()
      .forEach((item) => {
        let category = item.data.category;

        if (typeof category !== "string") return;

        if (Array.isArray(categories[category]))
          categories[category].push(item);
        else categories[category] = [item];
      });
    return categories;
  });

  // make authors as a collection
  config.addCollection("authors", function makeAuthor(collection) {
    let authors = {};
    collection
      .getAllSorted()
      .reverse()
      .forEach((item) => {
        let author = item.data.author;

        if (typeof author !== "string") return;

        if (Array.isArray(authors[author])) authors[author].push(item);
        else authors[author] = [item];
      });
    return authors;
  });

  // Minify CSS
  config.addFilter("cssmin", function (code) {
    return new cleanCSS({}).minify(code).styles;
  });

  // Minify JS
  config.addFilter("jsmin", function (code) {
    let minified = UglifyJS.minify(code);
    if (minified.error) {
      console.log("UglifyJS error:", minified.error);
      return code;
    }
    return minified.code;
  });
};
