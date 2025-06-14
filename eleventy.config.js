import { minify } from "terser";
import { DateTime } from "luxon";
import { EleventyHtmlBasePlugin } from "@11ty/eleventy"
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import pluginBundle from "@11ty/eleventy-plugin-bundle";
import eleventyAutoCacheBuster from "eleventy-auto-cache-buster";
import { pluginDrafts } from "./_back-end/config/eleventy.config.drafts.js";
import { pluginReading } from "./_back-end/config/eleventy.config.reading.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
// const EleventyVitePlugin = require("@11ty/eleventy-plugin-vite");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginNavigation = require("@11ty/eleventy-navigation");
// const pluginBundle = require("@11ty/eleventy-plugin-bundle");
const safeLinks = require('@sardine/eleventy-plugin-external-links');
import { transform } from 'lightningcss';


export default async function (eleventyConfig) {

    eleventyConfig.addPassthroughCopy("website-source/**/*.(css|js|json|xsl|xml)");
    eleventyConfig.addPassthroughCopy("website-source/**/*.{svg,webp,avif,png,jpeg,jpg,ico,webmanifest,txt,ttf,yml}");


    // eleventyConfig.addPassthroughCopy({
    //     "node_modules/@11ty/eleventy-fetch/**": "js/eleventy-fetch/"
    // });
    // Watch content images for the image pipeline.
    eleventyConfig.addWatchTarget("website-source/**/*.{svg,webp,avif,png,jpeg,jpg,css,js}");

    // Official plugins
    eleventyConfig.addPlugin(pluginRss);
    // eleventyConfig.addPlugin(pluginRss, {
    //     type: "atom", // or "rss", "json"
    //     outputPath: "/feed/feed.xml",
    //     stylesheet: "pretty-atom-feed.xsl",
    //     collection: {
    //         name: "note",
    //         limit: 0,
    //     },
    //     metadata: {
    //         language: "en",
    //         title: "Patrick Grey",
    //         subtitle: "A web developer living, working and playing in Scotland.",
    //         base: "https://www.patrickgrey.co.uk/",
    //         author: {
    //             name: "Patrick Grey"
    //         }
    //     }
    // });

    eleventyConfig.addPlugin(pluginSyntaxHighlight, {
        alwaysWrapLineHighlights: true,
        preAttributes: {
            tabindex: 0,
            "data-language": function ({ language, content, options }) {
                return language;
            }
        }
    });
    eleventyConfig.addPlugin(pluginNavigation);
    eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
    eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
        widths: [600, 1000, "auto"],
        defaultAttributes: {
            sizes: "(max-width: 600px) 600px, ((min-width: 601px) and (max-width: 999px)) 1000px, ((min-width: 1000px) 2000px",
        },
    });
    eleventyConfig.addPlugin(pluginBundle);
    // Plugins
    eleventyConfig.addPlugin(pluginDrafts);
    eleventyConfig.addPlugin(pluginReading);
    // eleventyConfig.addPlugin(eleventyAutoCacheBuster);
    eleventyConfig.addPlugin(safeLinks);

    // Add bundles
    // eleventyConfig.addBundle("css");
    // eleventyConfig.addBundle("js");

    // Custom collections
    // eleventyConfig.addCollection("pagesSorted", function (collectionApi) {
    //     const pages = collectionApi.getFilteredByTag("page");
    //     const sorted = pages.sort(function (a, b) {
    //         return a.data.order - b.data.order;
    //     });
    //     return sorted;
    // });


    // Collections
    // eleventyConfig.addCollection("readingSorted", function (collectionsApi) {
    //     return collectionsApi.getAll().sort(function (a, b) {
    //         //return a.date - b.date; // sort by date - ascending
    //         return b.date - a.date; // sort by date - descending
    //         //return a.inputPath.localeCompare(b.inputPath); // sort by path - ascending
    //         //return b.inputPath.localeCompare(a.inputPath); // sort by path - descending
    //     });
    // });

    // Add filters
    eleventyConfig.addFilter("cssmin", async function (input) {
        let { code } = await transform({
            filename: 'test.css',
            code: new TextEncoder().encode(input.toString()),
            minify: true,
            sourceMap: false
        });
        return new TextDecoder().decode(code);
    });

    eleventyConfig.addNunjucksAsyncFilter("jsmin", async (code, callback) => {
        const minified = await minify(code);
        return callback(null, minified.code);
    });

    // Return all the tags used in a collection
    eleventyConfig.addFilter("getAllTags", collection => {
        let tagSet = new Set();
        for (let item of collection) {
            (item.data.tags || []).forEach(tag => tagSet.add(tag));
        }
        return Array.from(tagSet);
    });

    eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
        return (tags || []).filter(tag => ["all", "nav", "post", "posts"].indexOf(tag) === -1);
    });

    // Filters
    eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
        // Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
        return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(format || "dd LLLL yyyy");
    });

    eleventyConfig.addFilter('stringToDate', (dateString) => {
        return new Date(dateString)
    });

    eleventyConfig.addFilter('htmlDateString', (dateObj) => {
        // dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
        return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd');
    });

    // Only use vite in dev - esbuild for build
    // if (process.env.DEV_ENVIRONMENT === "dev") {
    //     eleventyConfig.addPlugin(EleventyVitePlugin, {
    //         tempFolderName: "website-build", // Default name of the temp folder
    //         // viteOptions: { base: "/" },
    //     });
    // }

    // Remove templates from build
    // if (process.env.DEV_ENVIRONMENT != "dev") {
    //     eleventyConfig.ignores.add('website-source/_web-page-template/**/*');
    //     eleventyConfig.ignores.add('website-source/_example/**/*');
    //     eleventyConfig.ignores.add('website-source/_example-hero/**/*');
    // }

    eleventyConfig.setServerOptions({
        showAllHosts: true,
        domDiff: false,
    })

    return {
        templateFormats: [
            "md",
            "njk",
            "html",
            "liquid",
        ],

        // Pre-process *.md files with: (default: `liquid`)
        markdownTemplateEngine: "liquid",

        // Pre-process *.html files with: (default: `liquid`)
        htmlTemplateEngine: "njk",

        dir: {
            input: "website-source",          // default: "."
            output: "website-build",
            layouts: "../_back-end/_layouts",
            includes: "../_back-end/_components",  // default: "_includes"
            data: "../_back-end/_data"          // default: "_data"
        },

        // If your site deploys to a subdirectory, change `pathPrefix`.
        // Read more: https://www.11ty.dev/docs/config/#deploy-to-a-subdirectory-with-a-path-prefix

        // When paired with the HTML <base> plugin https://www.11ty.dev/docs/plugins/html-base/
        // it will transform any absolute URLs in your HTML to include this
        // folder name and does **not** affect where things go in the output folder.
        pathPrefix: "/",
    }
}