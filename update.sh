./remove.sh

dpkg-deb -b -Zgzip "Saber"

apt -m . /dev/null > Packages
bzip2 Packages
