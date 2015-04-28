./remove.sh

dpkg-deb -b "Saber"

dpkg-scanpackages . /dev/null >Packages
bzip2 Packages
