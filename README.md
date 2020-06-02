# Carleton University Library UI Customization Package

To make changes to this package:
- Set up a development environment from this repo, and follow the instructions: https://github.com/ExLibrisGroup/primo-explore-devenv 
- `cd primo-explore/custom && git clone https://github.com/cu-library/alma-customization-package`
- `mv alma-customization-package 01OCUL_CRL-CRL_DEFAULT`
- `cd ../.. && gulp run --view 01OCUL_CRL-CRL_DEFAULT --ve --browserify`
- Visit http://localhost:8003/discovery/search?query=any,contains,colonization&vid=01OCUL_CRL:CRL_DEFAULT in the browser to see changes.

To release the package:
- `cd primo-explore/custom/01OCUL_CRL-CRL_DEFAULT`
- Git tag the release.
- `cd ..`
- `zip 01OCUL_CRL-CRL_DEFAULT.zip 01OCUL_CRL-CRL_DEFAULT/css/custom1.css 01OCUL_CRL-CRL_DEFAULT/js/custom.js 01OCUL_CRL-CRL_DEFAULT/js/custom.js.map 01OCUL_CRL-CRL_DEFAULT/img/favicon.ico 01OCUL_CRL-CRL_DEFAULT/html/homepage/homepage_en.html`
- Create the release on github.
