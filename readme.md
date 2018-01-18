# Comments Widget for Vue.js

Thought as a general purpose comments widget based on Vue.js. Similar to Facebooks comments or Disqus.

**THIS IS WORK IN PROGRESS!**

## Usage

Load the VueComments plugin and VeeValidate, it will register everything that is required.

```js
Vue.use(VeeValidate);
Vue.use(VueComments);

const store = new Vuex.Store();

var vueApp = new Vue({
	el: '#vue-app',
	store,
	data: {}
});

```

Inside your templates:


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
