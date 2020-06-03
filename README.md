# Carleton University Library UI Customization Package

To make changes to this package:
- Set up a development environment from this repo, and follow the instructions: https://github.com/ExLibrisGroup/primo-explore-devenv 
- `cd primo-explore/custom && git clone https://github.com/cu-library/alma-customization-package`
- `mv alma-customization-package 01OCUL_CRL-CRL_DEFAULT`
- `cd ../.. && gulp run --view 01OCUL_CRL-CRL_DEFAULT --ve --browserify`
- Visit http://localhost:8003/discovery/search?query=any,contains,colonization&vid=01OCUL_CRL:CRL_DEFAULT in the browser to see changes.
