# Comments Widget for Vue.js

[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/burzum/vue-comments/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/burzum/vue-comments/?branch=master) 
[![Code Coverage](https://scrutinizer-ci.com/g/burzum/vue-comments/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/burzum/vue-comments/?branch=master) 
[![Build Status](https://scrutinizer-ci.com/g/burzum/vue-comments/badges/build.png?b=master)](https://scrutinizer-ci.com/g/burzum/vue-comments/build-status/master)

Thought as a general purpose comments widget based on Vue.js. Similar to Facebooks comments or Disqus.

**THIS IS WORK IN PROGRESS!**

## Usage

Load the VueComments plugin and VeeValidate, it will register everything that is required.

```js
import Vue from 'vue';
import VeeValidate from 'vee-validate';
import VueComments from 'vue-comments';

Vue.use(VeeValidate);
Vue.use(VueComments);

var vueApp = new Vue({
	el: '#vue-app',
	data: {}
});

```

Use it inside your applications markup:


```html
<h3>Comments</h3>
<comments-widget
	model="SocialObject"
	model-id="1">
</comments-widget>
```

## Building

Build a dist

```sh
yarn build
```

Linting


```sh
yarn lint
```

## License

GPL 3.0
