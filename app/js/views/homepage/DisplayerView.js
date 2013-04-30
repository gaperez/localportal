define([
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',

  'joshlib!ui/layout',

  'views/homepage/displayer/MenuDisplayView',
  'views/homepage/displayer/DisplayPanel',

  'text!templates/homepage/displayer/DisplayerLayout.html'
], function(
  woodman,
  $,
  _,
  Backbone,

  Layout,

  MenuDisplay,
  DisplayPanel,

  DisplayerTemplate
) {
  var logger = woodman.getLogger('views.DisplayerView');
  var DisplayerView = Layout.extend({

    initialize: function(options) {
      logger.info('initialize DisplayerView');
      var options = options || {};
      options.template = DisplayerTemplate;

      var live = this.isThereTedxLive();

      this.menuDisplay = new MenuDisplay({
        appController: options.appController,
        model: new Backbone.Model(),
        live: false
      });

      this.panelDisplay = new DisplayPanel({
        appController: options.appController
      });

      options.children = {
        menuDisplay: this.menuDisplay,
        panelDisplay: this.panelDisplay
      };

      Layout.prototype.initialize.call(this,options);
    },

    isThereTedxLive: function(){
      var datasources = Joshfire.factory.getDataSource('spreadsheetslive');

      datasources.find({
        limit: 1
      }, function(error, data) {

        _.each(data.entries, function(entry){

          if(parseInt(entry['gsx:now'])){ // There is TEDx Now
            return true;
          }
          else { // NO TEDx Now
            return false;
          }
        });
      });
    }

  });

  return DisplayerView;
});