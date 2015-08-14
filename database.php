<?php

/*
La base sait comment elle est organisée.
Le fait que les fichiers (en particulier les descriptions) sont sur le serveur est accidentel.
*/
class Database {

    private $directoryIterator;

    function __construct($rootDirectory) {
        $this->dataPath = $rootDirectory;
        $path = realpath($this->dataPath);
        $this->directoryIterator = new DirectoryIterator($path);
    }

    public static function normalizeFileContent($filename) {
        if (! file_exists($filename)) {
            return "";
        }
        $content = file_get_contents($filename);
        $content = str_replace("\r\n", "\n", $content);

        return $content;
    }

    private static function removeExtension($fileName) {
        $res = explode(".", $fileName);
        return $res[0];
    }

    public function findDocumentsRootRelativePaths() {
        $imagesPaths = array();
        foreach ($this->directoryIterator as $fileInfo) {
            if ($fileInfo->isDot() || $fileInfo->isDir()) continue;
            $fileName = $fileInfo->getFilename();
            $withoutExtension = self::removeExtension($fileName);
            $imagesPaths[$withoutExtension] =  $withoutExtension;
        }
        return array_keys($imagesPaths);
    }

    public function findDocument($docName) {
        // echo "findDocument - docName: " . $docName;
        foreach ($this->directoryIterator as $fileInfo) {
            if ($fileInfo->isDot() || $fileInfo->isDir()) continue;
            $fileName = $fileInfo->getFilename();
            $withoutExtension = self::removeExtension($fileName);
            if ($withoutExtension === $docName) {
                $data = array(
                    "name" => $docName,
                    "imageLocation" => Utils::buildPath(array($this->dataPath, $docName . ".JPG")),
                    "thumbnailLocation" => Utils::buildPath(array(Utils::thumbnailDirectory(), $docName . ".JPG")),
                    "description" => self::normalizeFileContent(Utils::buildPath(array($this->dataPath, $docName . ".txt")))
                );
                return $data;
            }
        }
        $data = array("name" => "TOTO.TITI");
        return $data;
    }
}

?>
