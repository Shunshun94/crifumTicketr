#!/usr/bin/perl

use Image::Magick;
use CGI;
$cgi = CGI::new();

$xLength = 1200;
$yLength = 846;
$fontSize = $cgi->url_param('fontSize') || 20;

# $imageType = $cgi->url_param('visual') || 'default';
$cardPath = "../../img/default/card.png";
$card = Image::Magick->new(magick => "png");
$card->Read($cardPath);

$criticalPath = "../../img/default/critical.png";
$critical = Image::Magick->new(magick => "png");
$critical->Read($criticalPath);

$fumblePath = "../../img/default/fumble.png";
$fumble = Image::Magick->new(magick => "png");
$fumble->Read($fumblePath);

$card->Composite( image=>$critical, compose=>'over', x=>189, y=>303 );

# x = 79  + 110 * n
# y = 194 + 109 * n


print ("Content-type: image/png\n\n");
binmode STDOUT;
$card>Write("png:-");

print "\n\n";
 
undef $card;
undef $critical;
undef $fumble;
exit();