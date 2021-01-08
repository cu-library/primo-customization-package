!function i(n,l,o){function a(e,t){if(!l[e]){if(!n[e]){var r="function"==typeof require&&require;if(!t&&r)return r(e,!0);if(u)return u(e,!0);throw(r=new Error("Cannot find module '"+e+"'")).code="MODULE_NOT_FOUND",r}r=l[e]={exports:{}},n[e][0].call(r.exports,function(t){return a(n[e][1][t]||t)},r,r.exports,i,n,l,o)}return l[e].exports}for(var u="function"==typeof require&&require,t=0;t<o.length;t++)a(o[t]);return a}({1:[function(t,e,r){"use strict";t("primo-explore-hathitrust-availability"),(t=angular.module("viewCustom",["angularLoad","hathiTrustAvailability"])).component("prmSearchResultAvailabilityLineAfter",{template:'<hathi-trust-availability msg="Full Text Available Online at HathiTrust" ignore-copyright="true" entity-id="http://cufed.carleton.ca/adfs/services/trust"></hathi-trust-availability>'}),t.component("prmExportRisAfter",{bindings:{parentCtrl:"<"},controller:function(){this.parentCtrl.encodingVal="UTF-8"},template:""})},{"primo-explore-hathitrust-availability":2}],2:[function(t,e,r){t("./js/hathi-trust-availability.module.js"),e.exports="hathiTrustAvailability"},{"./js/hathi-trust-availability.module.js":3}],3:[function(t,e,r){angular.module("hathiTrustAvailability",[]).constant("hathiTrustBaseUrl","https://catalog.hathitrust.org/api/volumes/brief/json/").config(["$sceDelegateProvider","hathiTrustBaseUrl",function(t,e){var r=t.resourceUrlWhitelist();r.push(e+"**"),t.resourceUrlWhitelist(r)}]).factory("hathiTrust",["$http","$q","hathiTrustBaseUrl",function(e,a,r){function t(t){if(t.length){t=r+t.join("|");return e.jsonp(t,{cache:!0,jsonpCallbackParam:"callback"}).then(function(t){return t.data})}return a.resolve(null)}var i={};return i.findRecord=function(r){return t(r).then(function(t){if(t&&0<t[r[0]].items.length){var e=Object.keys(t[r[0]].records)[0];return a.resolve(t[r[0]].records[e].recordURL)}return a.resolve(null)}).catch(function(t){console.error(t)})},i.findFullViewRecord=function(o){return t(o).then(function(t){for(var e=null,r=0;!e&&r<o.length;r++)for(var i=t[o[r]],n=0;n<i.items.length;n++){var l=i.items[n];if("full view"===l.usRightsString.toLowerCase()){e=i.records[l.fromRecord].recordURL;break}}return a.resolve(e)}).catch(function(t){console.error(t)})},i}]).controller("hathiTrustAvailabilityController",["hathiTrust",function(e){var r=this;r.$onInit=function(){r.msg||(r.msg="Full Text Available at HathiTrust"),r.hideOnline&&n()||r.hideIfJournal&&t()||l()};function i(t){return t.match(/^\(ocolc\).+/i)}var t=function(){return!(-1==r.prmSearchResultAvailabilityLine.result.pnx.addata.format[0].toLowerCase().indexOf("journal"))},n=function(){var t=r.prmSearchResultAvailabilityLine.result.delivery||[];return t.GetIt1?r.prmSearchResultAvailabilityLine.result.delivery.GetIt1.some(function(t){return t.links.some(function(t){return t.isLinktoOnline})}):-1!==t.deliveryCategory.indexOf("Alma-E")},l=function(){var t=(r.prmSearchResultAvailabilityLine.result.pnx.addata.oclcid||[]).filter(i).map(function(t){return"oclc:"+t.toLowerCase().replace("(ocolc)","")});e[r.ignoreCopyright?"findRecord":"findFullViewRecord"](t).then(function(t){t&&(r.fullTextLink=(t=t,r.entityId?t+"?signon=swle:"+r.entityId:t))})}}]).component("hathiTrustAvailability",{require:{prmSearchResultAvailabilityLine:"^prmSearchResultAvailabilityLine"},bindings:{entityId:"@",ignoreCopyright:"<",hideIfJournal:"<",hideOnline:"<",msg:"@?"},controller:"hathiTrustAvailabilityController",template:'<span ng-if="$ctrl.fullTextLink" class="umnHathiTrustLink">                <md-icon alt="HathiTrust Logo">                  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 16 16" enable-background="new 0 0 16 16" xml:space="preserve">  <image id="image0" width="16" height="16" x="0" y="0"                  xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJN                  AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACNFBMVEXuegXvegTsewTveArw                  eQjuegftegfweQXsegXweQbtegnsegvxeQbvegbuegbvegbveQbtegfuegbvegXveQbvegbsfAzt                  plfnsmfpq1/wplPuegXvqFrrq1znr2Ptok/sewvueQfuegbtegbrgRfxyJPlsXDmlTznnk/rn03q                  pVnomkjnlkDnsGnvwobsfhPveQXteQrutHDqpF3qnUnpjS/prmDweQXsewjvrWHsjy7pnkvqqGDv                  t3PregvqhB3uuXjusmzpp13qlz3pfxTskC3uegjsjyvogBfpmkHpqF/us2rttXLrgRjrgBjttXDo                  gx/vtGznjzPtfhHqjCfuewfrjCnwfxLpjC7wtnDogBvssmjpfhLtegjtnEjrtnTmjC/utGrsew7s                  o0zpghnohB/roUrrfRHtsmnlkTbrvH3tnEXtegXvegTveQfqhyHvuXjrrGTpewrsrmXqfRHogRjt                  q2Dqewvqql/wu3vqhyDueQnwegXuegfweQPtegntnUvnt3fvxI7tfhTrfA/vzJvmtXLunEbtegrw                  egTregzskjbsxI/ouoPsqFzniyrz2K3vyZnokDLpewvtnkv30J/w17XsvYXjgBbohR7nplnso1L0                  1Kf40Z/um0LvegXngBnsy5juyJXvsGftrGTnhB/opVHoew7qhB7rzJnnmErkkz3splbqlT3smT3t                  tXPqqV7pjzHvunjrfQ7vewPsfA7uoU3uqlruoEzsfQ/vegf///9WgM4fAAAAFHRSTlOLi4uLi4uL                  i4uLi4uLi4tRUVFRUYI6/KEAAAABYktHRLvUtndMAAAAB3RJTUUH4AkNDgYNB5/9vwAAAQpJREFU                  GNNjYGBkYmZhZWNn5ODk4ubh5WMQERUTl5CUEpWWkZWTV1BUYlBWUVVT19BUUtbS1tHV0zdgMDQy                  NjE1MzRXsrC0sraxtWOwd3B0cnZxlXZz9/D08vbxZfDzDwgMCg4JdQsLj4iMio5hiI2LT0hMSk5J                  TUvPyMzKzmHIzcsvKCwqLiktK6+orKquYZCuratvaGxqbmlta+8QNRBl6JQ26Oru6e3rnzBx0uQ8                  aVGGvJopU6dNn1E8c9bsOXPniYoySM+PXbBw0eIlS5fl1C+PFRFlEBUVXbFy1eo1a9fliQDZYIHY                  9fEbNm7avEUUJiC6ddv2HTt3mSuBBfhBQEBQSEgYzOIHAHtfTe/vX0uvAAAAJXRFWHRkYXRlOmNy                  ZWF0ZQAyMDE2LTA5LTEzVDE0OjA2OjEzLTA1OjAwNMgVqAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAx                  Ni0wOS0xM1QxNDowNjoxMy0wNTowMEWVrRQAAAAASUVORK5CYII=" />                  </svg>                 </md-icon>                <a target="_blank" ng-href="{{$ctrl.fullTextLink}}">                {{ ::$ctrl.msg }}                  <prm-icon external-link="" icon-type="svg" svg-icon-set="primo-ui" icon-definition="open-in-new"></prm-icon>                </a>              </span>'})},{}]},{},[1]);
//# sourceMappingURL=custom.js.map
