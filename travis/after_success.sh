#!/bin/sh


cd /tmp
git clone https://${GH_OAUTH_TOKEN}@github.com/${GH_USER_NAME}/${GH_PROJECT_NAME} site 2>&1
git checkout gh-pages
ls


    # Any command that using GH_OAUTH_TOKEN must pipe the output to /dev/null to not expose your oauth token
    #- git submodule add -b gh-pages https://${GH_OAUTH_TOKEN}@github.com/${GH_USER_NAME}/${GH_PROJECT_NAME} site 2>&1
    #- cd site
    #- git checkout gh-pages
    #- git rm -r .
    #- cp -R ../dist/* .
    #- cp ../dist/.* .
    #- git add -f .
    #- git config user.email "patrick@bittorrent.com"
    #- git config user.name "Patrick Williams"
    #- git commit -am "adding the yeoman build files to gh-pages"
    # Any command that using GH_OAUTH_TOKEN must pipe the output to /dev/null to not expose your oauth token
    #- git push https://${GH_OAUTH_TOKEN}@github.com/${GH_USER_NAME}/${GH_PROJECT_NAME} gh-pages > /dev/null 2>&1