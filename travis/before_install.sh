#!/bin/sh

echo '######################################'
echo '#           BEFORE_INSTALL           #'
echo '#              - START -             #'
echo '######################################'

echo '---- Cleaning Temp Dir ----'
cd /tmp
rm -fr *

echo '---- Download and unzip install-tl ----'
wget http://mirror.ctan.org/systems/texlive/tlnet/install-tl-unx.tar.gz
tar xvfz install-tl-unx.tar.gz
cd `ls -d */`

echo '---- Get install-tl profile ----'
wget https://raw.github.com/swissmanu/hsr-apf-2013/master/travis/texlive-installation.profile

echo '---- Install texlive with install-tl ----'
sudo ./install-tl --profile=texlive-installation.profile

echo '---- Install tikz-uml ----'
cd /tmp
wget http://www.ensta-paristech.fr/~kielbasi/tikzuml/src/tikzuml-v1.0b-2013-02-01.tbz
tar xvfz tikzuml-v1.0b-2013-02-01.tbz
sudo mv tikzuml-v1.0b /usr/local/texlive/2012/texmf/tex/latex/tikzuml
sudo texhash /usr/local/texlive/2012/texmf

echo '######################################'
echo '#           BEFORE_INSTALL           #'
echo '#            - FINISHED -            #'
echo '######################################'