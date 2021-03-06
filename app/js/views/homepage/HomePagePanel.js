define([
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',
  'joshlib!ui/layout',

  'views/homepage/DisplayerView',
  'views/homepage/TalksView',
  'views/homepage/TweetsView'

], function(
  woodman,
  $,
  _,
  Backbone,
  Layout,

  DisplayerView,
  TalksView,
  TweetsView
) {
  var logger = woodman.getLogger('views.HomePagePanel');
  var HomePagePanel = Layout.extend({

    initialize: function(options) {
      logger.info('initialize HomePagePanel');
      options = options || {};

      this.displayer = new DisplayerView({
        appController: options.appController,
        collection: options.appController.data.liveevent
      });

      this.talks = new TalksView({
        appController: options.appController,
        collection: options.appController.data.youtube
      });

      this.tweets = new TweetsView({
        appController: options.appController
      });

      options.children = {
        displayer: this.displayer,
        talks: this.talks,
        tweets: this.tweets
      };

      Layout.prototype.initialize.call(this,options);
    }
  });

  return HomePagePanel;
});