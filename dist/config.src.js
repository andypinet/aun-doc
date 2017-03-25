@{nav}

var searchwords = [];

self.$config = Object.assign({
  debug: true,
  nav: [],  
  plugins: [
    function myPlugin(context) {
      // context.store
      // context.router
      // context....
      var ret = {
        template: `<div id="search" :class='{"focus": isFocus}'><input type="text" v-model="handlerValue" @focus="handlerFocus" @input="handlerInput" /><div id="searchwords" class="datalist">
  <div class="datalist__item" v-for="(item, index) in showwords" @click="handleClick" :data-index="index">
  <a class="datalist__link" :href="item.relativePath">{{item.title}}</a></div>
</div></div>`,
        data() {
          var self = this;
          fetch("./search.json").then(function(response) {
            return response.json()
          }).then(function(data) {
            searchwords = data.map(function(v) {
              v.relativePath = "#/" + v.relativePath;
              return v;
            });
          })
          return {
            isFocus: false,
            handlerValue: "",
            showwords: []
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
            handlerInput: function(e) {
              var list =  searchwords;                    
              var options = {
                shouldSort: true,
                threshold: 0.6,
                location: 0,
                distance: 100,
                maxPatternLength: 32,
                minMatchCharLength: 1,
                keys: [
                  "title"
                ]
              };
              var fuse = new Fuse(list, options); // "list" is the item array
              var result = fuse.search(e.target.value);
              this.showwords = result.filter(function(v) {
                  return window.location.href.indexOf(v.title) < 0;
              });
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
        document.querySelector("#search > input").value = "";
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
