<div align="center">
  <img alt="Pomotroid" src=".github/images/pomotroid-title.png" width="800px">
</div>
<div align="center">
  <img alt="Pomotroid in action" src=".github/images/pomotroid-screens.jpg" width="800px">
</div>

<p align="center">Simple and visually-pleasing Pomodoro timer.</p>

---

[![Build Status](https://travis-ci.org/karimdaghari/pomotroid.svg?branch=master)](https://travis-ci.org/karimdaghari/pomotroid)
[![Build status](https://ci.appveyor.com/api/projects/status/i228k21b3mxqdo7i/branch/master?svg=true)](https://ci.appveyor.com/project/karimdaghari/pomotroid/branch/master)

## Note

This a fork of [Splode/Pomotroid](https://github.com/Splode/pomotroid). The project has been inactive for over a year so I guess it's safe to assume it's dead. But that's the beauty of FOSS ! It's about passing the baton.

## Overview

Pomotroid is a simple and customizable Pomodoro timer. It aims to aid your focus.

## Features

- Customizable times and number of rounds with sensible defaults
- Persistent window
- Charming timer alert sounds
- Desktop notifications
- Minimize to tray
- Mini-mode

## Roadmap

Future plans for enhancements and development: Check [roadmap](https://github.com/karimdaghari/pomotroid/projects/1)

## Download

Pomotroid is available for Windows 32/64, MacOS and Debian/Ubuntu flavored Linux.

Download the latest version from the [releases](https://github.com/karimdaghari/pomotroid/releases) page.

## Technical

Pomotroid is built with [Vue.js](https://github.com/vuejs/vue), [Electron](https://github.com/electron/electron), and [electron-vue](https://github.com/SimulatedGREG/electron-vue).

_Note: depending on your OS settings, you may receive a security warning upon installation. This has to do with Pomotroid being an unsigned application. You can find out more by researching code-signing for Apple and Microsoft._

### Build Setup

```bash
# install dependencies
npm i

# serve with hot reload at localhost:9080
npm run dev

# build Pomotroid for production
npm run build

# Locally:
# Linux: builds for Linux and OS X
# Windows: builds only for Windows
# But you should be using a CI anyway
```

## Q & A

**Why isn't there any todo feature included?**

> Context: (original) For the pomodoro technique to be effective, there needs to be a todo list.

I personally am a todo list kinda guy so trust me I'm aware of its importance, however, I've found that having a separate todo app is way better for many reasons, to cite a few:

1. Checking a todo on a list makes your brain secrete dopamine,
2. You're likely to have more than one **list** which defeats the purpose: monotasking,
3. The app would become bloated as it'll actually become two apps in one: Pomodoro + Todo.

**Why isn't there any stats feature included?**

I believe that incorporating stats in such an app would be optimizing productivity for productivity's sake and that's missing the point. In my view, the point of being productive is to become as effective/efficient as possible.

_What effectiveness/efficiency means depends on the context. For example, in the context of a business, being effective means making money. If you're not making money you're not efficient, period._

**Why Vue? Why not React?**

TL;DR: Because out of the four options (Angular, React, Vue, Svelte) I like it the most.

Actually before forking this project, I started developing an app with Angular and while I personally loved the dev experience, Angular is pretty **HEAVY**, on top of that, the community isn't as big as Vue's or React's. Which left me to consider either Vue or React, and while React is the most popular of the three, it simply didn't _feel_ right.

**For such a small app, why does it use so much CPU?**

In order for it to be cross-platform, the app is developed on electron which trades performance for flexibility.

## License

MIT &copy; [Karim Daghari](https://github.com/karimdaghari)
