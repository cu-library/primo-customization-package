(function () {
    'use strict';

    var app = angular.module('viewCustom', ['angularLoad']);

    app.component('prmExportRisAfter', {
        bindings: { parentCtrl: '<' },
        controller: function() { this.parentCtrl.encodingVal = 'UTF-8'; },
        template: ''
    });

})();
