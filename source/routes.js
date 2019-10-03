//Backup of glitch routes
const puppeteer = require("puppeteer");
const request = require("request-promise");
//
// This defines three routes that our API is going to use.
//
var routes = function(app) {
  //
  // This route processes GET requests, by using the `get()` method in express, and we're looking for them on
  // the root of the application (in this case that's https://rest-api.glitch.me/), since we've
  // specified `"/"`.  For any GET request received at "/", we're sending some HTML back and logging the
  // request to the console. The HTML you see in the browser is what `res.send()` is sending back.
  //
  app.get("/", function(req, res) {
    res.send("<h1>REST API to backup Ghost blog to github. See code.</h1>");
    console.log("Received GET at root");
    getExport(res);
  });

  //
  const delay = 60000;
  let isDelayed = false;

  async function getExport(response) {
    console.log("getExport");
    try {
      const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: {
          width: 1920,
          height: 1080
        },
        args: ["--no-sandbox", "--disable-setuid-sandbox"]
      });
      const page = await browser.newPage();
      await page.goto(
        "http://" + process.env.REFERRER_SOURCE_CHECK + "/ghost/#/signin"
      );
      await page.waitForSelector('input[name="identification"]', {
        visible: true
      });
      await page.type('input[name="identification"]', process.env.GHOST_USER);
      await page.type('input[name="password"]', process.env.GHOST_PWD);
      await page.click("button.login");
      await page.waitForNavigation();
      await page.waitForSelector('a[href="#/settings/labs/"]', {
        visible: true
      });
      await page.click('a[href="#/settings/labs/"]');
      await page.waitForNavigation();
      const pageTitle = await page.title();
      await page.waitForSelector('button[data-ember-action-47="47"]', {
        visible: true
      });
      const btnText = await page.evaluate(function() {
        return document.querySelector(
          'button[data-ember-action-47="47"]'
        ).textContent;
      });
      if (btnText === "Export") {
        console.log("Correct button" + btnText);
        await page.setRequestInterception(true);
        page.click('button[data-ember-action-47="47"]');
        const xRequest = await new Promise(resolve => {
          page.on("request", interceptedRequest => {
            interceptedRequest.abort(); //stop intercepting requests
            resolve(interceptedRequest);
          });
        });

        const options = {
          encoding: null,
          method: xRequest._method,
          uri: xRequest._url,
          body: xRequest._postData,
          headers: xRequest._headers
        };

        /* add the cookies */
        const cookies = await page.cookies();
        options.headers.Cookie = cookies
          .map(ck => ck.name + "=" + ck.value)
          .join(";");

        /* resend the request */
        const response = await request(options);
        const temp = JSON.parse(response.toString());
        //await response.buffer();
        //const jsonString = JSON.stringify(response.body);
        console.log(temp);
      }

      console.log("made it here!");
      // await page.waitForSelector('.gh-nav-menu-details-blog');
      // const textContent = await page.evaluate(() => document.querySelector('gh-nav-menu-details-blog').textContent);
      browser.close();
      // console.log('Title: ' + textContent);
    } catch (error) {
      console.log(error);
      response.status(503).end(error.message);
    }
  }

  app.post("/update", function(req, res) {
    const jsonString = JSON.stringify(req.body);
    if (jsonString.includes(process.env.REFERRER_SOURCE_CHECK)) {
      if (!isDelayed) {
        getExport(res);
        isDelayed = true;
        setTimeout(function() {
          isDelayed = false;
        }, delay);
      }
    } else {
      console.log("NOT from my server!");
    }
  });
};

module.exports = routes;
