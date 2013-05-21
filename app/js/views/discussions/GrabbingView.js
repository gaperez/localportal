define([
  'joshlib!utils/woodman',
  'joshlib!utils/dollar',
  'joshlib!vendor/underscore',
  'joshlib!vendor/backbone',

  'joshlib!ui/layout',

  'views/discussions/grabbing/ListTweetsGrabbing',

  'text!templates/discussions/grabbing/GrabbingLayout.html'
], function(
  woodman,
  $,
  _,
  Backbone,

  Layout,

  ListTweetsGrabbing,

  DisplayerTemplate
) {
  var logger = woodman.getLogger('views.DisplayerView');
  var DisplayerView = Layout.extend({

    tagName: 'div',

    initialize: function(options) {
      logger.info('initialize DisplayerView');
      var options = options || {};
      options.template = DisplayerTemplate;

      this.listTweetsGrabbing = new ListTweetsGrabbing({
        appController: options.appController,
        collection: options.collection,
        autoLoadMore: true
      });

      options.children = {
        listTweetsGrabbing: this.listTweetsGrabbing
      };

      Layout.prototype.initialize.call(this,options);
    },
  });

  return DisplayerView;
});