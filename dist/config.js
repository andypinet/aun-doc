self.$config = {
  debug: true,
  plugins: [
    function myPlugin(context) {
      // context.store
      // context.router
      // context....
      console.dir(context);
      window.test = context;
    }
  ]
}
