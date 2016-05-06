/**
 * @license Angulartics v0.19.2
 * (c) 2013 Luis Farzati http://luisfarzati.github.io/angulartics
 * Google Analytics Enhanced Ecommerce Plugin Contributed by https://github.com/ionicthemes
 * License: MIT
 */

(function (angular) {
  'use strict';

  angular.module('angulartics.google.tagmanager.enhanced-ecommerce', ['angulartics'])
    .config(['$analyticsProvider', function ($analyticsProvider) {
      $analyticsProvider.settings.ga = {
        userId: null
      };

      $analyticsProvider.registerPageTrack(function(path) {
        var dataLayer = window.dataLayer = window.dataLayer || [];
        // dataLayer.push({
        //   'event': 'content-view',
        //   'content-name': path,
        //   'userId': $analyticsProvider.settings.ga.userId
        // });
        dataLayer.push({
          'ecommerce': {
            'detail': {
              'actionField': {'list': 'Apparel Gallery'},    // 'detail' actions have an optional list property.
              'products': [{
                'name': 'Theme1',         // Name or ID is required.
                'id': '12345',
                'price': '30',
                'category': 'starters',
                'variant': 'regular'
               }]
             }
           }
        });
      });

      /**
       * Send interactions to the dataLayer, i.e. for event tracking in Google Analytics
       * @name eventTrack
       *
       * @param {string} action Required 'action' (string) associated with the event
       * @param {object} properties Comprised of the mandatory field 'category' (string) and optional  fields 'label' (string), 'value' (integer) and 'noninteraction' (boolean)
       */

      $analyticsProvider.registerEventTrack(function (action, properties) {
        var dataLayer = window.dataLayer = window.dataLayer || [];
        properties = properties || {};
        dataLayer.push({
          'event': properties.event || 'interaction',
          'target': properties.category,
          'action': action,
          'target-properties': properties.label,
          'value': properties.value,
          'interaction-type': properties.noninteraction,
          'userId': $analyticsProvider.settings.ga.userId
        });

      });

      /**
       * Set userId for use with Universal Analytics User ID feature
       * @name setUsername
       *
       * @param {string} userId Required 'userId' value (string) used to identify user cross-device in Google Analytics
       */

      $analyticsProvider.registerSetUsername(function (userId) {
        $analyticsProvider.settings.ga.userId = userId;
      });

    }]);

})(angular);
