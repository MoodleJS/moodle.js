[![NPM Version](https://img.shields.io/npm/v/akora-moodle?color=00DEC8&style=for-the-badge)](https://www.npmjs.com/package/akora-moodle)
[![NPM Downloads](https://img.shields.io/npm/dt/akora-moodle?color=00DEC8&style=for-the-badge)](https://www.npmjs.com/package/akora-moodle)
[![NPM License](https://img.shields.io/npm/l/akora-moodle?color=00DEC8&style=for-the-badge)](https://www.npmjs.com/package/akora-moodle)
[![Github Size](https://img.shields.io/github/repo-size/discord-card/levelcard?color=00DEC8&label=SIZE&style=for-the-badge)](https://www.npmjs.com/package/akora-moodle)

# AKORA Moodle Client
This is a simple Client for moodle, that is inspired by the [moodle-client](https://www.npmjs.com/package/moodle-client) by [mudrd8mz](https://www.npmjs.com/~mudrd8mz), it has built in typings and typings for many endpoints of the Moodle API(which are documented [here](https://learn.cineca.it/pluginfile.php/1/theme_adaptable/adaptablemarketingimages/0/api.htm)), the typings will be extended in the future till hopefully one day al endpoints are built in this package.

<br>

## Why should i use this package?
If you ever read the documentation of the Moodle API, then you know that there are hundrets of methods and if you dont have the right documentation the [docs](https://docs.moodle.org) can be hard to read and understand, you still need the documentation to use this package but it provides you most methods with built in types so that you know what you get back and what you need to supply to the request. 

<br>

# Getting started
## Installation
```bash
npm install akora-moodle
```

## Creating an instance
To create an instance of the Client, you use the static `init` method of the Client with an object which contains all needed options to initialize the client. The method will return a Promise wich returns a instance of the `Client` class.

<details open><summary>Here an example of an basic Login with your username, and password.</summary><p>

> ```js
> const { Client } = require('akora-moodle');
> 
> Client.init({
>     wwwroot: 'https://moodle.your-school.de/',
>     username: 'Bob',
>     password: 'SuPeRsecRet'
> })
> ```
</p></details>

<details open><summary>You can also log in with a token. (If credentials and token are provided token will be used).</summary><p>

> ```js
> Client.init({
>     wwwroot: 'https://moodle.your-school.de/',
>     token: 'yourtokengoesbrrrrrr'
> })
> ```
</p></details>

<br><br>

----------

## Built-in Methods
At the moment all implemented methods can be found in the `client.core` property, your IDE will tell you what methods are already implemented and usable, as well as your IDE will tell you what arguments you need to provide and what the response looks like.

<br>

<details><summary>Here is a short example which gives you informations about the current logged in user.</summary><p>

> ```js
> const { Client } = require('akora-moodle');
> 
> Client.init({
>     wwwroot: 'https://moodle.your-school.de/',
>     token: 'yourtokengoesbrrrrrr'
> }).then(async (client) => {
>     var info = await client.core.getInfo();
> 
>     console.log('You are Logged in as %s %s', info.firstname, info.lastname)
> }).catch((err) => {
>     console.log('Something went wrong ._.', err);
> });
> ```
</p></details>

<br>

<details><summary>Here is a short example which returns you an array of course contents.</summary><p>

> ```js
> const { Client } = require('akora-moodle');
> 
> client.init({
>     wwwroot: 'https://moodle.your-school.de/',
>     token: 'yourtokengoesbrrrrrr'
> }).then(async (client) => {
>     var contents = await client.core.course.getContents({
>         courseid: 3272
>     });
>
>     console.log('There are %s Sections in this Course', contents.length)
> }).catch((err) => {
>     console.log('Something went wrong ._.', err);
> });
> ```
</p></details>

<br>

----------

## Custom API Calls
At the moment not even nearly all methods are implemented, so you might often want to use the `client.call` method to make a custom API Requests.

<details><summary>An example</summary><p>

> ```js
> const { Client } = require('akora-moodle');
> 
> Client.init({
>     wwwroot: 'https://moodle.your-school.de/',
>     token: 'yourtokengoesbrrrrrr',
> }).then(async (client) => {
>     var response = await client.call({
>         wsfunction: 'core_not_implemented_yet',
>         method: 'POST',
>         args: {
>             someid: 123
>         }
>         //You can also provide settings > for advanced usage
>     })
> }).catch((err) => {
>     console.log('Something went wrong ._.', err);
> });
> ```
</p></details>


<br>

----------

## Advanced Client settings
<details><summary>All custom Settings</summary><p>

> ```js
> const { Client } = require('akora-moodle');
> 
> Client.init({
>     wwwroot: 'https://moodle.your-school.de/',
>     token: 'yourtokengoesbrrrrrr',
>     // The web service to use, default is moodle_mobile_app
>     service: 'moodle_mobile_app',
>     // If set to false, SSL certificates do not need to be valid.
>     strictSSL: true,
>     // Will enable the built-in Logger
>     logger: true
> })
> ```
</p></details>