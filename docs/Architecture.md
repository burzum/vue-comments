# Architecture

The plugin is using a Vuex store that is attached to the vue application object when the plugin is loaded. See [the official documentation on loading plugins](https://vuejs.org/v2/guide/plugins.html).

```js
Vue.use(VueComments);
```

The comments store will be made available as `vueAppInstance.$commentsStore` inside the app object.

All comments, no matter which entity they belong to get stored in a single list of comments in the store object. filter() is used in the stores methods to fetch stores depending on which ones are needed.

## Extending the plugin

Due to the many different ways comments can work and different requirements it is recommended that you fork the repository and work in your own branch of the plugin.
