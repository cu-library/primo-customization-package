import 'primo-explore-hathitrust-availability';
(function () {
    'use strict';
    var app = angular.module('viewCustom', ['angularLoad', 'hathiTrustAvailability']);
    // Include HathiTrust full text links.
    app.component('prmSearchResultAvailabilityLineAfter', {
        template: '<hathi-trust-availability msg="Full Text Available Online at HathiTrust" entity-id="http://cufed.carleton.ca/adfs/services/trust"></hathi-trust-availability>'
    })
    // Change the default RIS export character encoding to UTF-8.
    app.component('prmExportRisAfter', {
        bindings: { parentCtrl: '<' },
        controller: function() { this.parentCtrl.encodingVal = 'UTF-8'; },
        template: ''
    });
})();
(function() {
    'use strict';
    // Add the LibraryH3lp container to the page.
    var chatContainer = document.createElement('div');
    chatContainer.id = 'libraryh3lp-container';
    chatContainer.classList.add('needs-js');
    document.body.appendChild(chatContainer);
    // Add the LibraryH3lp script, which adds the chat button.
    var x = document.createElement("script");
    x.type = "text/javascript";
    x.async = true;
    x.src = (document.location.protocol === "https:" ? "https://" : "http://") + "ca.libraryh3lp.com/js/libraryh3lp.js?1213";
    var y = document.getElementsByTagName("script")[0];
    y.parentNode.insertBefore(x, y);
})();
