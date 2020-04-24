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

Parcel will generate `dist/` and `.cache/` - the cache will save time on rebuilds, and `dist` is supposed to save all the compiled css and js
