#!/usr/bin/perl

use Image::Magick;
use CGI;
$cgi = CGI::new();

$cardPath = "../../img/default/card.png";
$card = Image::Magick->new(magick => "png");
$card->Read($cardPath);

$criticalPath = "../../img/default/critical.png";
$critical = Image::Magick->new(magick => "png");
$critical->Read($criticalPath);
$critical->Scale( width=>108, height=>108 );

$fumblePath = "../../img/default/fumble.png";
$fumble = Image::Magick->new(magick => "png");
$fumble->Read($fumblePath);
$fumble->Scale( width=>108, height=>108 );

$card->Composite( image=>$fumble,   compose=>'over', x=>73,  y=>196 );
$card->Composite( image=>$critical, compose=>'over', x=>181, y=>305 );

print ("Content-type: image/png\n\n");
binmode STDOUT;
$card->Write("png:-");

print "\n\n";
 
undef $card;
exit;