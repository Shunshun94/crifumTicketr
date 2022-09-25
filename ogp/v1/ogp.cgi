#!/usr/bin/perl

use Image::Magick;
use CGI;
$cgi = CGI::new();

@records = split(/,/, ($cgi->url_param('record') || ''));

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

$count = 0;
foreach my $record (@records) {
    my $xPos = $count % 10;
    my $yPos = int($count / 10);
    if( $record =~ /\Ac/ ) {
        $card->Composite(
            image=>$critical,
            compose=>'over',
            x=>(73  + $xPos * 110),
            y=>(196 + $yPos * 110)
        );
    }
    if( $record =~ /\Af/ ) {
        $card->Composite(
            image=>$fumble,
            compose=>'over',
            x=>(73  + $xPos * 110),
            y=>(196 + $yPos * 110)
        );
    }
    $count++;
}

print ("Content-type: image/png\n\n");
binmode STDOUT;
$card->Write("png:-");

print "\n\n";
 
undef $card;
exit;