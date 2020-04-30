# Vanilla JS Pet Game

This is a project built out by following along with a free live stream by Brian Holt (@holtbt on Twitter) from Frontend Masters (frontendmasters.com, @FrontendMasters on Twitter)

## Introduction and the Project

Always free, always available website at `bit.ly/fox-game` for future reference

The suggestion is follow along building the game using HTML, CSS and vanilla JS, and then try to implement it in your own technology stack like React, Node, etc.

**NOTE** can use the `cp -r directory_to_copy destination_directory` shell command to copy the contents of a directory to a destination

## Frontend Infra

- Hello World
- Build process
- Code style
- Code formatting
- Editor setup
- Linting
- Testing
- Type checking

## Build Process

Since we don't want everything in one js file, we will use a build process to bundle all of our files. We will use `parcel` instead of webpack as our bundler

Parcel will generate `dist/` and `.cache/` - the cache will save time on rebuilds, and `dist` is supposed to save all the compiled css and js, and both are added to our gitignore as they are auto-generated files

## Code Formatting

We will use `prettier` for code formatting and just create a `.prettierrc` file to use defaults

**Note:** Search for "prettier require config" in VS Code and enable it if you want to require a `.prettierrc` file for prettier to run. I do want prettier without a config file, so will not enable for now

## Editor Setup

**Note:** We make an `.editorconfig` file is a common format that all editors can understand for formatting

## Linting

Also adding an `.eslintrc.json` file to configure eslint

Adding these scripts to `package.json`...

```js
{
  […]
  "scripts": {
    […]
    "format": "prettier --ignore-path ./.gitignore --write \"./**/*.{html,json,js,ts,css}\"",
    "format:check": "prettier ./.gitignore --check \"./**/*.{html,json,js,ts,css}\""
  }
}
```

## Testing

We will set up Jest for testing, but will not actually be writing any tests. A recommendation is to write tests after the course is complete

## Type Checking

Not using Typescript in this course, but it is a recommendation to rewrite this using Typescript after completing the course. At this point we have covered all of the frontend infra for the project

## Organizing Your Code

Many ways to organize code, likely to fall apart at some point in Brian's opinion. In general, it is recommended to try to optimize for "delete-ability" of code when it is no longer needed to create a more readable codebase overall

For something to be "delete-able", it needs to be modular. Brian's preference is to use a lot of directories so that when code is no longer needed the whole directory should be able to be deleted - these guidelines are not hard and fast, depends on what matches the situation

---

## Init the Project

The idea behind `init.js` is to set up our game, kind of the entry point in the browser. We will have a clock that ticks the game every three seconds.

## State Machine

We will use the concept of a finite state machine to define the allowed states of the game. A recommendation after completing the course is to use `xState` when rewriting the app to end up with cleaner code for modeling state

## UI

**NOTE** emmett.io built into VS Code, used `.inner -> tab` in index.html

Kind of took the styling and html as is and not really putting a ton of thought into it

**NOTE** Brian usually tinkers with CSS in the browser then copies what he likes into the stylesheet

**Note** how is the animation working?

- using `animation` property in `sprites.css`. In example of the sleeping fox, there are four different sleeping sprites and the browser is going through each sprite at an interval to give the impression of animation

## Interacting with the UI

Adding functionality to toggle between highlighting one of the three buttons

## The States

After this is finished, we reach the Game Started Milestone

## Transitioning Between States

Transitioning between day and night

## Pooping

## Death

---

Github actions pretty cool, might be neat to use them in the repo
Using websockets with a server to allow multiple players to play the same game is another extension to the project
