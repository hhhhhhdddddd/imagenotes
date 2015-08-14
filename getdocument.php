<?php

require_once "utils.php";
require_once "database.php";
require_once "image.php";

$docName = $_REQUEST["docname"];

$database = new Database(Utils::rootDirectory());
$docData = $database->findDocument($docName);

Image::buildThumbnailHtml($docData["imageLocation"], $docData["thumbnailLocation"]);

$documentJSON = __json_encode($docData);
echo $documentJSON;
?>
