# Comments Widget for Vue.js

Thought as a general purpose comments widget based on Vue.js. Similar to Facebooks comments or Disqus.

**THIS IS WORK IN PROGRESS!**

## Usage

Load the VueComments plugin and VeeValidate, it will register everything that is required.

```js
import Vue from 'vue';
import Vuex from 'vuex';
import VeeValidate from 'vee-validate';
import VueComments from 'vue-comments';

Vue.use(VeeValidate);
Vue.use(VueComments);

const store = new Vuex.Store();

var vueApp = new Vue({
	el: '#vue-app',
	store,
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
