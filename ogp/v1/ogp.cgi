#!/usr/bin/perl

use Image::Magick;
use CGI;
$cgi = CGI::new();

@records = split(/,/, ($cgi->url_param('record') || ''));
$fontSize = 28;

$no = $cgi->url_param('no') || '1';

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

$card->Annotate(
    text=>$no,
    x=>108,
    y=>42,
    fill=>"#000000",
    strokewidth=>3,
    antialias=>true,
    font=>"../../font.ttf",
    pointsize=>$fontSize
);

$count = 0;
foreach my $record (@records) {
    my $xPos = (73  +    ($count % 10) * 110);
    my $yPos = (196 + int($count / 10) * 110);
    if( $record =~ /\Ac/ ) {
        $card->Composite(
            image=>$critical,
            compose=>'over',
            x=>$xPos,
            y=>$yPos
        );
    }
    if( $record =~ /\Af/ ) {
        $card->Composite(
            image=>$fumble,
            compose=>'over',
            x=>$xPos,
            y=>$yPos
        );
    }
    $card->Annotate(
        text=>substr($record, 1, 2) . "/" . substr($record, 3),
        x=>$xPos +  18,
        y=>$yPos + 100,
        fill=>"#000000",
        strokewidth=>3,
        antialias=>true,
        font=>"../../font.ttf",
        pointsize=>$fontSize
    );
    $count++;
}

print ("Content-type: image/png\n\n");
binmode STDOUT;
$card->Write("png:-");

print "\n\n";
 
undef $card;
exit;