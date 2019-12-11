# secret-server

[![Donate on patreon](https://img.shields.io/badge/donate-patreon-F96854.svg)](https://patreon.com/jwebcoder)
[![Build Status][actions-badge]][actions]
[![codecov][codecov-badge]][codecov]
![node][node]
[![npm version][npm-badge]][npm]
[![dependencies Status][dependencies-badge]][dependencies]
[![devDependencies Status][dev-dependencies-badge]][dev-dependencies]
[![PRs Welcome][prs-badge]][prs]
[![GitHub][license-badge]][license]

Secret-server hides your application behind a password

This module will make the application unaccessible until the user enters the correct password

## Why?

This module was done with the intent to be used during development stages of an application, in order to be able to demo it to the client but keeping hidden from outsiders.

## Installation

`npm i secret-server`

## Usage

```javascript
expressApp.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
})) // or any other session (express-session for example)
expressApp.use(secretServer(/* configuration object */{
  password: 'test',
  redirect: '/',
  successRedirect: '/success',
})) // this should be done before setting the routes
```

Please check the tests folder for a more complete working example

## Configuration object

All properties are not required

| Property | description | default |
| -------- | ----------  | ------- |
| password        | password to be used                                                     | test
| successRedirect | path to redirect the user after a successful authorization | undefined
| redirect        | path to redirect the user when not authorized                           | undefined
| file            | path to the html file with the user input for authorization | undefined

## License

MIT

[actions-badge]: https://github.com/jwebcoder/secret-server/workflows/Build/badge.svg
[actions]: https://github.com/JWebCoder/secret-server/actions

[codecov-badge]: https://codecov.io/gh/JWebCoder/secret-server/branch/master/graph/badge.svg
[codecov]: https://codecov.io/gh/JWebCoder/secret-server

[node]: https://img.shields.io/node/v/secret-server.svg

[npm-badge]: https://badge.fury.io/js/secret-server.svg
[npm]: https://badge.fury.io/js/secret-server

[dependencies-badge]: https://david-dm.org/JWebCoder/secret-server/status.svg
[dependencies]: https://david-dm.org/JWebCoder/secret-server

[dev-dependencies-badge]: https://david-dm.org/JWebCoder/secret-server/dev-status.svg
[dev-dependencies]: https://david-dm.org/JWebCoder/secret-server?type=dev

[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg
[prs]: http://makeapullrequest.com

[license-badge]: https://img.shields.io/github/license/JWebCoder/secret-server.svg
[license]: https://github.com/JWebCoder/secret-server/blob/master/LICENSE