import 'primo-explore-hathitrust-availability';
(function () {
    'use strict';
    var app = angular.module('viewCustom', ['angularLoad', 'hathiTrustAvailability']);
    // Include HathiTrust full text links.
    app.component('prmSearchResultAvailabilityLineAfter', {
        template: '<hathi-trust-availability msg="Full Text Available Online at HathiTrust" ignore-copyright="true" entity-id="http://cufed.carleton.ca/adfs/services/trust"></hathi-trust-availability>'
    })
    // Change the default RIS export character encoding to UTF-8
    app.component('prmExportRisAfter', {
        bindings: { parentCtrl: '<' },
        controller: function() { this.parentCtrl.encodingVal = 'UTF-8'; },
        template: ''
    });
})();
