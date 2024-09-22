---
title: My Decap CMS setup with 11ty hosted on Cloudflare Pages
tags:
  - 11ty
  - decap
  - cloudflare
draft: false
publish: 2024-09-21T16:16:00.000Z
update: 2024-09-21T17:17:00.000Z
---
This setup can be viewed at <https://github.com/patrickgrey/website>. 

I love static sites. They make so much sense. However, whenever I wanted to use them with client sites, the CMS angle was always a stumbling block. When building my personal site, I took the chance to try Decap CMS and I've got it to the stage where I'm happy to offer it as an option to clients. I'm hosting this on free Cloudflare pages so a similar setup for a client would only incur the cost of a domain - unless the site gets wildly popular and incurs charges.

Decap provides a user interface to create, edit and delete content. These changes are sent to a git repository service (github in my case), which in turn triggers a site rebuild on Cloudflare, which pulls down the updated content from the repository.

My requirements:

* Host on Cloudflare pages with authentication.
* Have a CMS where the client can preview content in a similar style that it will appear once published.
* Keep the performance benefits of 11ty like Image transform.

## Cloudflare page hosting

This wasn’t the simplest to set up as I had a custom domain with another provider (Fasthosts) and I don’t think the Cloudflare docs are easy to locate things on. To get this working I had to:

1. Delete the Fasthost name servers and add the cloudflare name servers in their place.
2. Add a new website in the Workers & Pages section of the Cloudflare control panel and connect it to Github and configure the correct 11ty build instructions (currently under site > settings).
3. If you don’t want to add client side analytics to your site - DO NOT enable analytics on Cloudflare. I didn’t want client side analytics, mistook this for server side analytics, enabled it and after hours of reading, cannot find a way to turn the bloody thing off!
4. Remove any CNAME records you have on your domain provider
5. Add an apex custom domain to your site on Cloudflare (patrickgrey.co.uk in my case) and allow Cloudflare to control the DNS records of your domain (I’ve no idea how they do this).
6. Add another custom domain for the www subdomain of your site (www.patrickgrey.co.uk in my case)
7. After some time, your cloudflare site should be available via your domain.

## Decap Authentication on Cloudflare

This excellent article by Cassey Lottman <https://www.cassey.dev/11ty-on-cloudflare-pages/> gives a good breakdown of using this function  <https://github.com/i40west/netlify-cms-cloudflare-pages> to allow Decap authentication on Cloudflare. Cassey makes the good point that you should use the [Eleventy Auto Cache Buster](https://github.com/Denperidge/eleventy-auto-cache-buster) to counter Cloudflare’s aggressive caching. You may want to disable this plugin when the site is stable to benefit from the CDM caching. It will depend on how often and urgently your client needs to update content.

## Decap custom preview

Decap has access to the style sheets that are used on the rest of the site so I reused these to achieve a similar look for the rest of the site. I also added a style sheet just for the CMS page to help mimic the main site. I couldn’t easily get syntax highlighting so this sheet adds a simple dark background with single code colour to cheat!

Decap needs an index.html file to host the React app and a config.yml. I changed the index file to a Nunjucks template so I could load different config files for development and build - using local repo for local dev and the github one for remote. I need to remember to pull to the local one and I may abandon this approach once the setup is established.

index.njk:

```html
{% raw %}
---
permalink: "admin/index.html"
---

<!DOCTYPE html>
<html>
 
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex" />
    <title>Content Manager</title>
    <!--
    I wanted to allow the use of the local repo while developing the site. To do this I put
    local_backend: true
    at the top of the config.yml file.
    However, when publishing, we don't want that setting so below I check
    the current environment and deliver a different yml file for the
    build environment. Duplication is the down side but it works so ho-hum.
    -->
    {% set env = devEnvironment.environment %}
    {% if env != 'dev' %}
        <link href="./build-config/config.yml" type="text/yaml" rel="cms-config-url">
    {% endif %}
</head>

<body>
    <!-- Include the script that builds the page and powers Decap CMS -->
    <script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>
    <script>
        // The class to be used to preview notes
        const NotePreview = createClass({
            render: function() {
            const entry = this.props.entry;


            return h('article', {}, //wrap the content in an article and div to get the same layout as the main website.
                        h('div', {"className": "pg-column-main"},
                            h('h1', {}, entry.getIn(['data', 'title'])),
                            // I added in published and update date previews but this would add too much complexity to format like the site so I just removed them as clients can see the dates in the UI.
                            //h('datetime', {}, new Date(entry.getIn(['data', 'publish'])).toString()),
                            //h('datetime', {}, new Date(entry.getIn(['data', 'update'])).toString() || "No date"),
                            h('div', {}, this.props.widgetFor('body'))
                        )
                    );
            }
        });
        // Register the above class for use
        CMS.registerPreviewTemplate("notes", NotePreview);
        // Inlcude the websites style sheets and boom, it starts to look very similar.
        CMS.registerPreviewStyle("/_shared/css/reset.css");
        CMS.registerPreviewStyle("/_shared/css/brand.css");
        CMS.registerPreviewStyle("/_shared/css/shared.css");
        // This admin only CSS helps mimic the main site and adds simple syntax highlighting.
        CMS.registerPreviewStyle("admin.css");
    </script>

</body>
</html>
{% endraw %}
```

Config.yml (local)

```yaml
# when using the default proxy server port
local_backend: true
backend:
  name: git-gateway
  branch: main # Branch to update (optional; defaults to master)
  commit_messages:
  create: Create {{collection}} "{{slug}}"
  update: Update {{collection}} "{{slug}}"
  delete: Delete {{collection}} "{{slug}}"
  uploadMedia: Upload "{{path}}"
  deleteMedia: Delete "{{path}}"
media_folder: "_shared/uploads"
site_url: "https://patrickgrey.co.uk"
logo_url: "https://patrickgrey.co.uk/_shared/images/logo/pg-logo-01.svg"
search: false
collections:
  - name: "notes"
    label: "Notes"
    folder: "website-source/notes"
    create: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    editor:
      preview: true
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Draft?", name: "draft", widget: "boolean", default: false }
      - { label: "Publish Date", name: "publish", widget: "datetime" }
      - { label: "Update Date", name: "update", widget: "datetime", required: false }
      - { label: "Body", name: "body", widget: "markdown" }
```

## Keeping 11ty Image transform with Decap

The image transform feature of 11ty v3 is brilliant. All I need is to add an `img` tag with a high quality version of the image and 11ty will produce a `<picture>` element with multiple formats and sizes.

In order to create different size images for different screen sizes, 11ty needs a sizes attribute on the image tag. The Decap markdown widget doesn’t allow for that by default. I started looking into customising the widget but this felt wrong. Eventually, I stumbled on another great Cassey Lottman post <https://www.cassey.dev/adding-decap-cms-to-11ty/> which, in turn led me to this post by Martin Gunnarsson: <https://www.martingunnarsson.com/posts/eleventy-automatic-image-pre-processing-part-2/> . This is where I found out about the eleventyImageTransformPlugin defaultAttributes attribute where I added the “sizes” attribute with the values I needed.

I need to re-read these articles now I’m set up as I’m sure there is more I can learn.

I hope this helps someone :-)
