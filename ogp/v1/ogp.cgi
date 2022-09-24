#!/usr/bin/perl

use Image::Magick;
use CGI;
$cgi = CGI::new();

$xLength = 1200;
$yLength = 846;
$fontSize = $cgi->url_param('fontSize') || 20;
$image = Image::Magick->new(magick => "png");

$imageType = $cgi->url_param('visual') || 'default';


$image->Read("../../img/$imageType/card.png");
print ("Content-type: image/png\n\n");
binmode STDOUT;
$image->Write("png:-");

print "\n\n";
 
undef $image;
exit;