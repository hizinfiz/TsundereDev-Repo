./remove.sh

dpkg-deb -b "Saber"

dpkg-scanpackages -m . /dev/null > Packages
bzip2 Packages
