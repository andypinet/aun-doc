self.$config = {
  debug: true,
  nav: [
    {title: '2017', type: 'dropdown', items: [
      {title: '3月', path: '/2017.3/README'}
    ]}
  ],  
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
}
