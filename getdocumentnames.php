<?php

require_once "utils.php";
require_once "database.php";

$database = new Database(Utils::rootDirectory());
$docNames = $database->findDocumentsRootRelativePaths();
$result = "";
$size = count($docNames);
foreach ($docNames as $key => $name) {
    $result .= $name;
    if ($key < $size - 1) {
        $result .= ",";
    }
}
echo $result;
?>