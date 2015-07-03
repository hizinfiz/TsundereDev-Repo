./remove.sh

dpkg-deb -b Saber
dpkg-deb -b Cataracs
dpkg-deb -b KingdomHearts
dpkg-deb -b GurrenLagann
dpkg-deb -b OMAM
dpkg-deb -b Binary
dpkg-deb -b Nagato
dpkg-deb -b Zuiver
dpkg-deb -b Mugi

dpkg-scanpackages . /dev/null > Packages
bzip2 Packages