---
title: Using YQ to split one YAML file into multiple files
tags:
  - YAML
  - YQ
draft: true
publish: 2024-10-01T13:19:00.000Z
---
I had a single JSON file with my reading history in it. I wanted to use that with Decap CSM which is running this website at the moment. Unfortunately, it doesn't seem possible use a single file in Decap that contains a collection of data that 11ty can get data from.

I needed to get my content into the right format for Decap to manage the content. Process:

* Convert JSON to a single YAML using <https://jsonformatter.org/json-to-yaml>
* I installed a tool called YQ to split the big YAML file into multiple YAML files with the correct title. I used "WINGET" to do this - already a part of Powershell it seems. From here <https://github.com/mikefarah/yq/?tab=readme-ov-file> I got this install instruction: `winget install --id MikeFarah.yq`
* I used this command `yq '.[]' reading.yml -s 'dateRead. + "-" + (.title | downcase |= sub(" ", "-"))'`

The YAML file had an array of posts like this:

```yaml
- url: 'https://www.tbray.org/ongoing/When/202x/2024/01/15/Google-2024'
  title: Mourning Google
  dateRead: '2024-01-19'
  authors:
    - Tim Bray
  notes: A behind the scenes look at how business wankers are killing Google.
  topics:
    - business
    - tech
  purposes:
    - work
- url: >-
    https://www.theguardian.com/food/2024/jan/23/nicholas-saunders-forgotten-genius-changed-british-food
  title: >-
    Hippy, capitalist, guru, grocer: the forgotten genius who changed
    British food
  dateRead: '2024-01-23'
  authors:
    - Jonathan Nunn
  notes: >-
    Blah.
  topics:
    - information sharing
    - alternative
    - hippy
  purposes:
    - personal
```

The shell code replaces spaces in the title with hyphens after it's all made lower case. Let's see if it works...
