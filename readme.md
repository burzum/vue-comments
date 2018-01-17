# Comments Widget for Vue.js

Thought as a general purpose comments widget based on Vue.js. Similar to Facebooks comments or Disqus.

## Usage

Register the comments store module within your global vuex store:

```js
import commentsModule from './store/store';
import Vuex from 'vuex';

const store = new Vuex.Store({
	modules: {
		comments: commentsModule,
	}
});

```

Inside templates:


```html
<comments-widget
	model="Posts"
	model-id="1"
>
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
