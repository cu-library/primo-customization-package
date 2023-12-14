import 'primo-explore-hathitrust-availability';
(function () {
    'use strict';
    var app = angular.module('viewCustom', ['angularLoad', 'hathiTrustAvailability']);
    // Include HathiTrust full text links.
    app.component('prmSearchResultAvailabilityLineAfter', {
        template: `<hathi-trust-availability msg="Full Text Available Online at HathiTrust" entity-id="http://cufed.carleton.ca/adfs/services/trust">
                   </hathi-trust-availability>`
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
        template: `<a ng-if="$ctrl.online()" target="_blank"
                       href="https://library.carleton.ca/about/policies/electronic-resources-acceptable-use-policy">
                       Electronic Resources Acceptable Use Policy
                       <prm-icon icon-type="svg" svg-icon-set="primo-ui" external-link="" icon-definition="open-in-new"></prm-icon>
                   </a>`
    });
    app.controller('carletonAcceptableUsePolicyLinkController', [function (){
        var vm = this;
        vm.online = online;
        function online(){
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
    app.controller('carletonHideRapidoForReservesItemsController', [function(){
        var vm = this;
        vm.hide = hide;
        function hide(){
            if (vm.parentCtrl.hasOwnProperty('item') &&
                vm.parentCtrl.item.hasOwnProperty('delivery') &&
                vm.parentCtrl.item.delivery.hasOwnProperty('holding') &&
                Array.isArray(vm.parentCtrl.item.delivery.holding)) {
                for (const itemHolding of vm.parentCtrl.item.delivery.holding) {
                    if (itemHolding.libraryCode === "MACODRUM" &&
                        itemHolding.subLocationCode === "rsv") {
                        vm.parentCtrl._almaRSServiceAvailable = "false";
                        break;
                    }
                }
            }
            return false;
        }
    }]);

    // Add components to the prmBriefResultAfter template.
    app.component('prmBriefResultAfter', {
        bindings: { parentCtrl: '<' },
        template: `<carleton-add-alternative-request-form-link parent-ctrl="$ctrl.parentCtrl">
                   </carleton-add-alternative-request-form-link>`,
    });
    // Add the alternative request form link. This was borrowed from McMaster.
    app.component('carletonAddAlternativeRequestFormLink', {
        bindings: { parentCtrl: '<' },
        controller: 'carletonAddAlternativeRequestFormLinkController',
        template: `<div ng-if="$ctrl.showAccessibleLink()" class="alternative-request-form-link">
                       <a tabindex="0" ng-click="$ctrl.showAccessibleCopyFormOnClick($event)"
                                       ng-keypress="$ctrl.showAccessibleCopyFormOnEnter($event)"
                                       class="arrow-link md-primoExplore-theme">
                            Request Alternate Format for Disabled Users
                            <span class="sr-only">Opens in a new window</span>
                            <prm-icon external-link="" icon-type="svg" svg-icon-set="primo-ui" icon-definition="open-in-new"></prm-icon>
                            <prm-icon link-arrow="" icon-type="svg" svg-icon-set="primo-ui" icon-definition="chevron-right"></prm-icon>
                       </a>
                   </div>`
    });
    app.controller('carletonAddAlternativeRequestFormLinkController', [function(){
        var vm = this;
        vm.$onInit = onInit;
        function onInit(){
            // Create URLSearchParams object to get query string values.
            var params = new URLSearchParams(document.location.search);

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

            var resource_link = encodeURIComponent('https://' + window.location.hostname + '/discovery/fulldisplay?docid=' + doc_id
                                                   + '&context=' + context
                                                   + '&vid=' + (params.has('vid') ? params.get('vid') : '')
                                                   + '&search_scope=' + (params.has('search_scope') ? params.get('search_scope') : '')
                                                   + '&tab=' + (params.has('tab') ? params.get('tab') : ''));

            var resource_title = vm.parentCtrl.item.pnx.display.title[0];

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

            var resource_mms = '';
            if (vm.parentCtrl.item.pnx.display.mms !== undefined) {
                resource_mms = vm.parentCtrl.item.pnx.display.mms[0];
            }

            var resource_date = '';
            if (vm.parentCtrl.item.pnx.addata.risdate !== undefined) {
                resource_date = vm.parentCtrl.item.pnx.addata.risdate[0];
            } else if (vm.parentCtrl.item.pnx.addata.date !== undefined) {
                resource_date = vm.parentCtrl.item.pnx.addata.date[0];
            }

            var resource_volume = '';
            if (vm.parentCtrl.item.pnx.addata.volume !== undefined) {
                resource_volume = vm.parentCtrl.item.pnx.addata.volume[0];
            }

            var name = '';
            const username_tag = document.querySelector("prm-user-area-expandable .user-name");
            if (username_tag !== null) {
                name = username_tag.innerText;
            }

            var resource_type = '';
            if (vm.parentCtrl.item.pnx.display.type !== undefined) {
                resource_type = vm.parentCtrl.item.pnx.display.type[0];
            }

            // only show the Request Acccessible Copy if record type is book or article
            vm.showAccessibleLink = function(){
                if (resource_type == 'book' &&
                    vm.parentCtrl.hasOwnProperty('item') &&
                    vm.parentCtrl.item.hasOwnProperty('delivery') &&
                    vm.parentCtrl.item.delivery.hasOwnProperty('holding') &&
                    Array.isArray(vm.parentCtrl.item.delivery.holding)) {
                    for (const itemHolding of vm.parentCtrl.item.delivery.holding) {
                        if (itemHolding.libraryCode === "MACODRUM"){
                            return true;
                            break;
                        }
                    }
                }
                return false;
            }
            vm.buildLink = function(){
                return 'https://library.carleton.ca/forms/alternate-format-request-form-page?title='+resource_title
                        +'&author='+resource_author.trim()
                        +'&link='+resource_link.trim()
                        +'&isbn='+resource_isbn.trim()
                        +'&date='+resource_date
                        +'&volume='+resource_volume
                        +'&mms='+resource_mms
                        +'&name='+name;
            }
            vm.showAccessibleCopyFormOnClick = function($event){
                window.open(vm.buildLink(), '_blank');
            }
            vm.showAccessibleCopyFormOnEnter = function($event){
                if ($event.key == "Enter") {
                    window.open(vm.buildLink(), '_blank');
                }
            }
        }
    }]);

    // Add components to the prmActionContainerAfter container.
    app.component('prmActionContainerAfter', {
        bindings: { parentCtrl: '<' },
        template: `<carleton-add-skip-to-header parent-ctrl="$ctrl.parentCtrl">
                   </carleton-add-skip-to-header>`
    });
    // Add a Skip To header. This is borrowed and adapted from UWindsor.
    app.component('carletonAddSkipToHeader', {
        bindings: {parentCtrl: '<'},
        controller: 'carletonAddSkipToHeaderController'
    });
    app.controller('carletonAddSkipToHeaderController', [function(){
        var vm = this;
        vm.$onInit = onInit;
        function onInit(){
            var heading_text = 'Skip To';
            // Create URLSearchParams object to get query string values.
            var params = new URLSearchParams(document.location.search);
            if (params.has('lang', 'fr')) {
                heading_text = "Passer à";
            }
            var heading_element = document.createElement('h3');
            heading_element.id = 'skip-to-header';
            heading_element.textContent = heading_text;
            try {
                document.getElementById('services-index').getElementsByTagName('button')[0].insertAdjacentElement('beforebegin', heading_element);
            } catch (error){
                console.log(error);
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
