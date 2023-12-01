import 'primo-explore-hathitrust-availability';
(function () {
    'use strict';
    var app = angular.module('viewCustom', ['angularLoad', 'hathiTrustAvailability']);
    // Include HathiTrust full text links.
    app.component('prmSearchResultAvailabilityLineAfter', {
        template: `<hathi-trust-availability msg="Full Text Available Online at HathiTrust" entity-id="http://cufed.carleton.ca/adfs/services/trust"></hathi-trust-availability>`
    });

    // Add components to the prmExportRisAfter template.
    app.component('prmExportRisAfter', {
        bindings: { parentCtrl: '<' },
        template: `<carleton-change-ris-encoding parent-ctrl="$ctrl.parentCtrl">
                   </carleton-acceptable-use-policy-link>`
    });
    // Change the default RIS export character encoding to UTF-8.
    app.component('carletonChangeRisEncoding', {
        bindings: { parentCtrl: '<' },
        controller: function() { this.parentCtrl.encodingVal = 'UTF-8'; },
        template: ''
    });

    // Add components to the prmServiceHeaderAfter template.
    app.component('prmServiceHeaderAfter', {
        bindings: { parentCtrl: '<' },
        template: `<carleton-acceptable-use-policy-link parent-ctrl="$ctrl.parentCtrl">
                   </carleton-acceptable-use-policy-link>`
    });
    // Add Carleton's Acceptable Use Policy link.
    app.component('carletonAcceptableUsePolicyLink', {
        bindings: { parentCtrl: '<' },
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

    // Add components to the prmServiceNgrsAfter template. 
    app.component('prmServiceNgrsAfter', {
        bindings: { parentCtrl: '<' },
        template: `<carleton-hide-rapido-for-reserves-items parent-ctrl="$ctrl.parentCtrl">
                   </carleton-hide-rapido-for-reserves-items>`
    });
    // Hide Rapido block for reserves items.
    app.component('carletonHideRapidoForReservesItems', {
        bindings: { parentCtrl: '<' },
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

    // Add components to the prmAuthenticationAfter template.
    app.component('prmAuthenticationAfter', {
        bindings: { parentCtrl: '<' },
        template: `<carleton-add-name-to-root-scope parent-ctrl="$ctrl.parentCtrl">
                   </carleton-add-name-to-root-scope>`,
    });
    // Add the user's name to the root scope.
    app.component('carletonAddNameToRootScope', {
        bindings: { parentCtrl: '<' },
        controller: 'carletonAddNameToRootScopeController',
        template: ''
    });
    app.controller('carletonAddNameToRootScopeController', ['$scope', '$rootScope', function($scope, $rootScope) {
        var vm = this;
        vm.$onInit = onInit;
        function onInit(){
            // If the user is logged in, get their name
            // and assign it to a global variable ($rootScope)
            // so it can be shared with carletonAddAlternativeRequestFormLinkController.
            var isLoggedIn = vm.parentCtrl.isLoggedIn;
            $rootScope.isLoggedIn = isLoggedIn;
            if (isLoggedIn == true) {
                var selector = '.user-name';
                var user_name = '';
                get_element(selector, function(callback) {
                    user_name = callback;
                    $rootScope.user_name = user_name;
                });
            }
        }
    }]);

    // Add components to the prmBriefResultAfter.
    app.component('prmBriefResultAfter', {
        bindings: { parentCtrl: '<' },
        template: `<carleton-add-alternative-request-form-link parent-ctrl="$ctrl.parentCtrl">
                   </carleton-add-alternative-request-form-link>`,
    });
    // Add the alternative request form link. This was borrowed from McMaster.
    app.component('carletonAddAlternativeRequestFormLink', {
        bindings: { parentCtrl: '<' },
        controller: 'carletonAddAlternativeRequestFormLinkController',
        template: `<div ng-if="$ctrl.ShowAccessibleLink()" class="alternative-request-form-link">
                       <a tabindex="0" ng-click="$ctrl.showAccessibleCopyFormOnClick($event)" ng-keypress="showAccessibleCopyFormOnEnter($event)" class="arrow-link md-primoExplore-theme">
                         Request Alternate Format for Disabled Users
                         <span class="sr-only">Opens in a new window</span>
                         <prm-icon external-link="" icon-type="svg" svg-icon-set="primo-ui" icon-definition="open-in-new"></prm-icon>
                         <prm-icon link-arrow="" icon-type="svg" svg-icon-set="primo-ui" icon-definition="chevron-right"></prm-icon>
                       </a>
                   </div>`
    });
    app.controller('carletonAddAlternativeRequestFormLinkController', ['$scope', '$rootScope', function($scope, $rootScope) {
        var vm = this;
        vm.$onInit = onInit;
        function onInit(){
            var link = [];

            var resource_title = vm.parentCtrl.item.pnx.display.title[0];

            var doc_id = '';
            var item_id = vm.parentCtrl.item['@id'];
            if (item_id !== undefined) {
                if (item_id.indexOf('https') != -1) {
                    var doc_id_array = vm.parentCtrl.item['@id'].match(/pnxs.+/)[0].split('/');
                    doc_id = doc_id_array[2];
                    if (doc_id_array[3] !== undefined) {
                        doc_id += '/';
                        doc_id += doc_id_array[3];
                    }
                }
            }
            // Primo VE bug fix - We need to prepend "alma" to the doc_id if it's purely numeric
            if (!isNaN(doc_id)) {
                doc_id = 'alma' + doc_id;
            }
            // ... or from the URL
            if (doc_id === null || doc_id === undefined) {
                doc_id = '';
            }
            var context = vm.parentCtrl.item.context;
            var url_params_array = window.location.search.split('&');
            var url_param_array = '';
            var vid = '';
            var search_scope = '';
            var tab = '';

            for (var i = 0; i < url_params_array.length; i++) {
                url_param_array = url_params_array[i].split('=');
                for (var index in url_param_array) {
                    if (url_param_array[0].replace('?','') == 'vid') {
                        vid = url_param_array[1];
                    } else if (url_param_array[0].replace('?','') == 'search_scope') {
                        search_scope = url_param_array[1];
                    } else if (url_param_array[0].replace('?','') == 'tab') {
                        tab = url_param_array[1];
                    }
                } 
            }
            var resource_title_link = encodeURIComponent('https://' + window.location.hostname + '/discovery/fulldisplay?docid=' + doc_id + '&context=' + context + '&vid=' + vid + '&search_scope=' + search_scope + '&tab=' + tab);

            var resource_author = '';
            if (vm.parentCtrl.item.pnx.addata.addau !== undefined) {
                resource_author = vm.parentCtrl.item.pnx.addata.addau[0];
            } else if (vm.parentCtrl.item.pnx.addata.au !== undefined) {
                resource_author = this.parentCtrl.item.pnx.addata.au[0];
            }

            var resource_isbn = '';
            if (vm.parentCtrl.item.pnx.addata.isbn !== undefined) {
                resource_isbn = vm.parentCtrl.item.pnx.addata.isbn[0];
            } else if (vm.parentCtrl.item.pnx.addata.issn !== undefined) {
                resource_isbn = vm.parentCtrl.item.pnx.addata.issn[0];
            }

            var recordType = '';
            if (vm.parentCtrl.item.pnx.display.type !== undefined) {
                recordType = vm.parentCtrl.item.pnx.display.type[0];
            }

            var aTitle = '';
            if (recordType == 'article') {
                aTitle = resource_title;
                resource_title = '';
            }

            var resourceType = '';
            if (vm.parentCtrl.item.pnx.addata.format !== undefined) {
                resourceType = vm.parentCtrl.item.pnx.addata.format[0];
            }

            var recordYear = '';
            if (vm.parentCtrl.item.pnx.addata.risdate !== undefined) {
                recordYear = vm.parentCtrl.item.pnx.addata.risdate[0];
            }

            var recordVolume = '';
            if (vm.parentCtrl.item.pnx.addata.volume !== undefined) {
                recordVolume = vm.parentCtrl.item.pnx.addata.volume[0];
            }

            var recordIssue = '';
            if (vm.parentCtrl.item.pnx.addata.issue !== undefined) {
                recordIssue = vm.parentCtrl.item.pnx.addata.issue[0];
            }

            var startPage = '';
            if (vm.parentCtrl.item.pnx.addata.spage !== undefined) {
                startPage = vm.parentCtrl.item.pnx.addata.spage[0];
            }

            var endPage = '';
            if (vm.parentCtrl.item.pnx.addata.epage !== undefined) {
                endPage = vm.parentCtrl.item.pnx.addata.epage[0];
            }

            var jTitle = '';
            if (vm.parentCtrl.item.pnx.addata.jtitle !== undefined) {
                jTitle = vm.parentCtrl.item.pnx.addata.jtitle[0];
            }

            var jSource = '';
            if (vm.parentCtrl.item.pnx.display.source !== undefined) {
                vm.parentCtrl.item.pnx.display.source.forEach(addSource);
            }
            function addSource(sourceProvider){
                jSource += "&source[]=" + sourceProvider;
            }

            //find source format if electronic or print
            var sourceType = '';
            if (vm.parentCtrl.item.pnx.display.format !== undefined) {
                if (vm.parentCtrl.item.pnx.display.format[0].includes("online")) {
                    sourceType = "Electronic";
                } else {
                    sourceType = "Print";
                }
            } else if (vm.parentCtrl.item.pnx.facets.toplevel !== undefined) {
                vm.parentCtrl.item.pnx.facets.toplevel.forEach(checkFacets);
            }
  
            function checkFacets(checkFacet){
                if (checkFacet.includes("online")) {
                    sourceType = "Electronic";
                }
            }

            var searchrecordId = '';
            if (doc_id!=='') {
                searchrecordId = '#SEARCH_RESULT_RECORDID_'+doc_id+' .best-location-library-code';
            }

            var username = '';
            if ($rootScope.user_name !== undefined) {
                username = $rootScope.user_name;
            }

            // only show the Request Acccessible Copy if record type is book or article
            vm.ShowAccessibleLink = function(){
                if (recordType == 'book' || recordType == 'article'){
                    return true;
                } else {
                    return false;
                }
            }
            vm.showAccessibleCopyFormOnClick = function($event){
                window.open('https://library.carleton.ca/form/request-accessible-copy?title='+resource_title+'&atitle='+aTitle+'&author='+resource_author.trim()+ '&link=' + resource_title_link.trim()+'&isbn='+ resource_isbn.trim()+'&rtype='+resourceType+'&year='+recordYear+'&volume='+recordVolume+'&issue='+recordIssue+'&spage='+startPage+'&epage='+endPage+'&jtitle='+jTitle+jSource+'&sformat='+sourceType+'&username='+username,'_blank');
            }
            $scope.showAccessibleCopyFormOnEnter = function($event){
                if ($event.key == "Enter") {
                window.open('https://library.carleton.ca/form/request-accessible-copy?title='+resource_title+'&atitle='+aTitle+'&author='+resource_author.trim()+ '&link=' + resource_title_link.trim()+'&isbn='+ resource_isbn.trim()+'&rtype='+resourceType+'&year='+recordYear+'&volume='+recordVolume+'&issue='+recordIssue+'&spage='+startPage+'&epage='+endPage+'&jtitle='+jTitle+jSource+'&sformat='+sourceType+'&username='+username,'_blank');
                }
            }
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
