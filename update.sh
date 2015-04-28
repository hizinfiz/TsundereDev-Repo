./remove.sh

dpkg-deb -b -Zgzip Saber

dpkg-scanpackages -m . /dev/null >Packages
bzip2 Packages