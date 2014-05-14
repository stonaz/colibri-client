var CSRF_TOKEN = 'MqmHrDwd8SypWVVgqG6EWzwDGaHpWVrZ'
var oldSync = Backbone.sync;
Backbone.sync = function(method, model, options){
options.beforeSend = function(xhr){
xhr.setRequestHeader('X-CSRFToken', CSRF_TOKEN);
};
return oldSync(method, model, options);
};

var ColibriApp = new Marionette.Application();
ColibriApp.addRegions({
    mainRegion: "#main-region",
    dialogRegion: Marionette.Region.Dialog.extend({
                        el: "#dialog-region"
                        })
});

ColibriApp.navigate = function (route, options) {
    options || (options = {});
    Backbone.history.navigate(route, options);
};

ColibriApp.getCurrentRoute = function(){
       return Backbone.history.fragment 
};

ColibriApp.on("initialize:after", function () {
        console.log('app started')
    if (Backbone.history) {
        Backbone.history.start();
        if(this.getCurrentRoute() === ""){
      ColibriApp.trigger("books:list");
    }
        ColibriApp.BooksApp.List.Controller.listBooks();
    }
});