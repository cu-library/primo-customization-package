import 'primo-explore-hathitrust-availability';
(function () {
    'use strict';
    var app = angular.module('viewCustom', ['angularLoad', 'hathiTrustAvailability']);
    // Include HathiTrust full text links.
    app.component('prmSearchResultAvailabilityLineAfter', {
        template: '<hathi-trust-availability msg="Full Text Available Online at HathiTrust" entity-id="http://cufed.carleton.ca/adfs/services/trust"></hathi-trust-availability>'
    });
    // Change the default RIS export character encoding to UTF-8.
    app.component('prmExportRisAfter', {
        bindings: { parentCtrl: '<' },
        controller: function() { this.parentCtrl.encodingVal = 'UTF-8'; },
        template: ''
    });
    // Add a warning for kiosk users.
    app.component('kioskWarning', {
	    template: '<div layout="row" layout-align="center center" class="kiosk-warning-wrapper"><div flex-sm="80" flex-md="70" flex-lg="60" flex-xl="60" class="kiosk-warning-content" flex="80" layout="row"><md-icon md-svg-icon="primo-ui:error-outline"></md-icon><div class="kiosk-warning-text"><span class="kiosk-warning-label">Notice: </span>These Omni stations only search physical items located in the Carleton Library.<br>For full search functionality to find e-resources and more, please use the regular Omni site via the Library website.</div></div></div>'
    });
    app.component('prmSearchBarAfter', {
        bindings: {parentCtrl: '<'},
        template: '<kiosk-warning></kiosk-warning>'
    });
})();
