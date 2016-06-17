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

      console.log("TESTING from LIB v2");
      $analyticsProvider.virtualPageviews(false);
      $analyticsProvider.firstPageview(false);

      $analyticsProvider.registerPageTrack(function(path) {
        // var dataLayer = window.dataLayer = window.dataLayer || [];
        // dataLayer.push({
        //   'event': 'content-view',
        //   'content-name': path,
        //   'userId': $analyticsProvider.settings.ga.userId
        // });
      });

      /**
       * Send interactions to the dataLayer, i.e. for event tracking in Google Analytics
       * @name eventTrack
       *
       * @param {string} action Required 'action' (string) associated with the event
       * @param {object} properties Comprised of the mandatory field 'category' (string) and optional  fields 'label' (string), 'value' (integer) and 'noninteraction' (boolean)
       */

      $analyticsProvider.registerEventTrack(function (data, callback) {
        var dataLayer = window.dataLayer = window.dataLayer || [];
        data = data || {};
        callback = callback || null;

        if(callback !== null)
        {
          data['eventCallback'] = callback;
        }

        data['userId'] = $analyticsProvider.settings.ga.userId;

        dataLayer.push(data);
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
