#!/usr/bin/perl

use CGI;
$cgi = CGI::new();
$url = $cgi->url;
$url =~ s/index.cgi//;
$ogpUrl = $url . "ogp/v1/ogp.cgi?";

@list = $cgi->param;
foreach my $query (@list) {
    $ogpUrl = $ogpUrl . $query . "=" . $cgi->param($query) . "&";
}

print "Content-type: text/html\n\n";
print "<!DOCTYPE html>\n";
print "<html>\n";
print "<head>\n";
print "    <meta charset='UTF-8'>\n";
print "    <meta property='og:title' content='クリティカル・ファンブル スタンプカード' />\n";
print "    <meta property='og:type' content='website' />\n";
print "    <meta property='og:image' content='$ogpUrl' />\n";
print "    <meta property='og:site_name' content='https://github.com/Shunshun94/crifumTicketr' />\n";
print "    <meta property='og:description' content='クリティカル・ファンブルしたら記録していくカード' />\n";
print "    <meta name='twitter:card' content='summary_large_image' />\n";
print "    <meta name='twitter:site' content='@Shunshun94' />\n";
print "    <meta name='twitter:domain' content='shunshun94.github.io' />\n";
print "    <meta name='twitter:title' content='クリティカル・ファンブル スタンプカード' />\n";
print "    <meta name='twitter:description' content='クリティカル・ファンブルしたら記録していくカード' />\n";
print "    <meta name='twitter:image' content='$ogpUrl' />\n";
print "    <title>クリティカル・ファンブル スタンプカード</title>\n";
print "    <link rel='stylesheet' href='./crifum.css' type='text/css' />\n";
print "</head>\n";
print "<body>\n";
print "    <div id='base'></div>\n";
print "    <script src='https://shunshun94.github.io/shared/other/io/github/shunshun94/util/common.js'></script>\n";
print "    <script src='./crifum.js'></script>\n";
print "</body>\n";
print "</html>\n";

exit;