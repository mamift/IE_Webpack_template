# IE 9,10,11 Web pack template
This is a barebones, very basic, IE 9 to 11 compatible Web pack template. It provides:
* A Typescript 2.4 compiler (and preset `tsconfig.json`) and compatible webpack loader.
* A SASS (SCSS) compiler and webpack css loader (by default outputs the compiled CSS into a separate CSS file).
* Javascript uglify, minification and debug sourcemap output.
* Optional global dependency resolution (via `yarn` installation script)
	- Execute this file to install all dev dependencies globally.
	Because the webpack.config file can resolve npm and yarn pacakges globally, you dont have to have multiple `node_modules` folders taking up valuable disk space.
	- Use this script when you need multiple repos to manage multiple projects that are based on this same template.

## Instructions

The instructions here are for configuring a machine with at least Windwos 7, and requires at least Node.js v8. All the `package.json` dependencies and versions should also work with this version of Node.js. It has been tested on Windows 7 and Windows 10 (1607).

1. Clone the repo,
2. Run `yarn install` to install modules locally or `globalInstall.bat` to install dependencies globally,
    * For global module resolution, you need to add a `%NODE_PATH%` **user** environment variable that points to the npm's or yarn's global node_modules cache (or both). For npm this is usually: `%appdata%\npm\node_modules` and for yarn this is `%userprofile%\AppData\Local\Yarn\Data\global\node_modules`.
    * NOTE: Enter either `%appdata%\npm\node_modules` or `%userprofile%\AppData\Local\Yarn\Data\global\node_modules` into the address bar of an Explorer window and it should resolve to the actual directory; it's the actual directory value that should be the value or values set for the `%NODE_PATH%` environment variable.
4. Change whatever else suits you, (you can use `npm` instead of `yarn` for instance in `package.config`)
5. Then execute `yarn run watch`.

There is no: 
* Separate development or production configuration (you can write that yourself by copying the `webpack.config.js` and adding respective build command in `package.json`)
* No separate build command: the default `yarn run watch` should produce production ready output. 
	- When deploying the output to production, obviously remove the sourcemaps that get generated to reduce the output size.

In order to be IE compatible:
* It uses webpack 3 (the latest version as of June 2019 was `4.3.*`)
* This template is geared towards web development on Windows 7+; it includes a `globalInstall.bat` file to install dev dependencies globally (it uses `yarn`, but you can edit the file to use `npm`).
* It does not launch a localhost server - this is because IE can be configured to use local file system paths when loading things; you can add that yourself, as the template is meant to be barebones.
