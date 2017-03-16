@{nav}

self.$config = Object.assign({
  debug: true,
  nav: [],  
  plugins: [
    function myPlugin(context) {
      // context.store
      // context.router
      // context....
      context.event.on('content:updated', function () {
		    new LazyLoad();        
      })      
    }
  ]
}, config());
