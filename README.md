# SSNEXT
I am currently rewriting [SignStealing](https://github.com/n-grubb/signstealing), my suite of fantasy sports tools, in React with TypeScript. This repo contains the new version of the application. 

I am switching this project to a React based architecture mostly for fun as I rewrite the code. But also for the stability of the React ecosystem. I ran into some deploy issue in the Vue3 version that I expect to be resolved as I use more battle-tested technologies like Next.

A major part of this rewrite is using IndexedDB instead of a hosted db solution. This application is a great candidate for local storage and I'm using it to apply learnings from my independent study of alternative browser storage solutions. I hope to continue this project by adding React Native and/or Electron versions in the future as well. 

I plan to merge the two repos for this project once the rewrite is complete.


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

