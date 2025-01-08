---
title: Problems I faced when using Javascript importmap with ASP.NET Core
tags:
  - javascript
  - asp.net
publish: 2025-01-08T16:22:00.000Z
---
I needed to use [CKEditor 5](https://github.com/ckeditor/ckeditor5/) in a web page we were building. CKEditor is a library that transforms textareas (and other elements) into a rich text editor.  CKEditor has a [build tool](https://ckeditor.com/ckeditor-5/builder/) that allows you to include only the features you need. To load the javascript file that produces, thier site recommends using an importmap.

[Importmaps](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap) basically let you use javascript modules natively without a build tool. Very cool.

I've often struggled to get importmap working, largely to my own stupidity, but the error messages you get back are not very helpful. I've also encountered multiple errors at the same time, which complicates debudding.

I develop front-end prototypes in [eleventy](<>) (the front end DX is much nicer) before switching to Visual Studio for ASP.NET Core MVC development.

For the front-end prototype code I use:

```html
<script type="importmap">
    {
        "imports": {
            "ckeditor5": "/2-guide-v5/js/action-apps/recording-upload/ckeditor5.js",
            "ckeditor5/": "/2-guide-v5/js/action-apps/recording-upload/"
        }
    }
</script>
```

In my C# code I use:

```dotnet
<script type="importmap">
    {
        "imports": {
          "ckeditor5": "@Url.Content("~/ActionApps/js/recording-upload/ckeditor5.js")",
          "ckeditor5/": "@Url.Content("~/ActionApps/js/recording-upload/")"
        }
    }
</script>
```

The first path is to the main file while the second path is for the package so the first file can load the multiple modules the package.

The problems I faced were the following.

## Incorrect path

I dread seeing the error:

```jsstacktrace
Uncaught TypeError: Failed to resolve module specifier "ckeditor5". Relative references must start with either "/", "./", or "../".
```

This gives no information on which path was atttempted. My usual way of trying to fix this is to try all sorts of relative paths, failing then tipping my desk over (╯° · °)╯︵ ┻━┻ ;

I've tried relative paths from the html page (`./js/action-apps/recording-upload/ckeditor5.js`), no dice. I've tried a relative path from the calling javascript file. Nope.

The only consistent thing I've found to work is a full path from the root: `/2-guide-v5/js/action-apps/recording-upload/ckeditor5.js`

Note that with the reload client in eleventy v3.0.0, you may get this error:

```jsstacktrace
reload-client.js:94 An import map is added after module script load was triggered.
```

Manually reload the page if this happens.

## Syntax error

I only just noticed that at some point the error message changed to a JSON syntax error message. I had stupidly ommitted the comma between the two link values.

## Vite

I use the elevnty Vite plugin to allow javascript modules to work. The importmap totally trips the Vite import analyser up so I get a big error message overlay on the page. However, the import still works so I can ignore it. I want to get rid of this plugin eventually and switch to the native importmap for all my projects.

## Minification

On build all javascript files are minified. When I uploaded these to the server, I started getting

```jsstacktrace
Uncaught SyntaxError: The requested module 'ckeditor5' does not provide an export named 'Xxxxxxx'
```

It turns out the minification process going over the already minified CKEditor files caused this so I manually copied the files over and this issue was fixed.

## MVC Tilde

Finallly, in the ASP.NET View page, we use the tilde (` ~ `) to get the server path. This works for images and other files like javascript and CSS links but not for the import map links :-(

I went down the rabbit hole of printing out the server path but this is now more complex than it used to be in old ASP.NET (4sih). Instead I just hard coded the root path URL when not in debug. A very fragile solution I wasn't happy with. That was until I found this great article by Khalid Abuhakmeh on importmap use with ASP.NET: <https://khalidabuhakmeh.com/javascript-import-maps-for-aspnet-core-developers> 

They note the use of `"hello-world": "@Url.Content("~/js/hello-world.js")"` to allow the tilde to be supported. A much better solution!

Now import maps is working I'm going to see if I can stop using Vite altogether. Less complexity, more win.
