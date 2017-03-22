@{nav}

self.$config = Object.assign({
  debug: true,
  nav: [],  
  plugins: [
    function myPlugin(context) {
      // context.store
      // context.router
      // context....
      var ret = {
        template: `<div id="search" :class='{"focus": isFocus}'><input type="text" v-model="handlerValue" @focus="handlerFocus" /><div id="searchwords" class="datalist">
  <div class="datalist__item" v-for="(item, index) in searchwords" @click="handleClick" :data-index="index">
  <a class="datalist__link" :href="item.relativePath">{{item.title}}</a></div>
</div></div>`,
        data() {
          var self = this;
          fetch("./search.json").then(function(response) {
            return response.json()
          }).then(function(data) {
            self.searchwords = data.map(function(v) {
              v.relativePath = "#/" + v.relativePath;
              return v;
            });
          })
          return {
            isFocus: false,
            handlerValue: "",
            searchwords: [
            ]
          };
        },
        methods: {
            handlerFocus: function() {
              this.isFocus = true;
              document.querySelector("#searchwords").removeAttribute("style");
            },
            handleClick: function(e) {
              var self = this;
              setTimeout(function() {
                self.isFocus = false;
              }, 0);
            },
            fetchWords: function(searchwords) {
              console.dir(ret);
              //this.searchwords.push(searchwords);
              //console.dir(this.searchwords);
            }
        }
      };
      context.registerComponent('sidebar:start', ret)
      context.event.on('content:updated', function () {
        document.addEventListener("click", function(e) {
          if (!document.querySelector("#search").contains(e.target)) {
            ret.isFocus = false;
            document.querySelector("#searchwords").style.display = "none";
          }
        });
		    new LazyLoad();        
      })      
    }
  ]
}, config());
