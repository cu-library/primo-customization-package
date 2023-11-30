import 'primo-explore-hathitrust-availability';
(function () {
    'use strict';
    var app = angular.module('viewCustom', ['angularLoad', 'hathiTrustAvailability']);
    // Include HathiTrust full text links.
    app.component('prmSearchResultAvailabilityLineAfter', {
        template: `<hathi-trust-availability msg="Full Text Available Online at HathiTrust" entity-id="http://cufed.carleton.ca/adfs/services/trust"></hathi-trust-availability>`
    });

    // Change the default RIS export character encoding to UTF-8.
    app.component('prmExportRisAfter', {
        bindings: { parentCtrl: '<' },
        controller: function() { this.parentCtrl.encodingVal = 'UTF-8'; },
        template: ''
    });

    // Add Carleton's Acceptable Use Policy link.
    app.component('prmServiceHeaderAfter', {
        bindings: {parentCtrl: '<'},
        template: `<carleton-acceptable-use-policy-link parent-ctrl="$ctrl.parentCtrl"></carleton-acceptable-use-policy-link>`
    });
    app.component('carletonAcceptableUsePolicyLink', {
        bindings: {parentCtrl: '<'},
        controller: 'carletonAcceptableUsePolicyLinkController',
        template: `<a ng-if="$ctrl.online()" href="https://library.carleton.ca/about/policies/electronic-resources-acceptable-use-policy">Electronic Resources Acceptable Use Policy <prm-icon icon-type="svg" svg-icon-set="primo-ui" external-link="" icon-definition="open-in-new"></prm-icon></a>`
    });
    app.controller('carletonAcceptableUsePolicyLinkController', [function () {
        var vm = this;
        vm.online = online;
        function online() {
            return vm.parentCtrl.title === 'nui.getit.service_viewit';
        }
    }]);

    // Hide Rapido block for reserves items.
    app.component('prmServiceNgrsAfter', {
        bindings: {parentCtrl: '<'},
        template: `<carleton-hide-rapido-for-reserves-items parent-ctrl="$ctrl.parentCtrl">
                   </carleton-hide-rapido-for-reserves-items>`
    });
    app.component('carletonHideRapidoForReservesItems', {
        bindings: {parentCtrl: '<'},
        controller: 'carletonHideRapidoForReservesItemsController',
        template: `<span ng-if="$ctrl.hide()"></span>`
    });
    app.controller('carletonHideRapidoForReservesItemsController', [function() {
        var vm = this;
        vm.hide = hide;
        function hide(){
            if (vm.parentCtrl.hasOwnProperty('item') &&
                vm.parentCtrl.item.hasOwnProperty('delivery') &&
                vm.parentCtrl.item.delivery.hasOwnProperty('holding') &&
                Array.isArray(vm.parentCtrl.item.delivery.holding)) {
               vm.parentCtrl.item.delivery.holding.forEach(function(itemHolding) {
                   if (itemHolding.libraryCode === "MACODRUM" &&
                       itemHolding.subLocationCode === "rsv") {
                       vm.parentCtrl._almaRSServiceAvailable = "false";
                   }
               });
            }
            return false;
        }
    }]);
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
