<?php

class Image {

    private static $THUMBNAIL_IMAGE_MAX_WIDTH = 150;
    private static $THUMBNAIL_IMAGE_MAX_HEIGHT = 150;


    public static function buildThumbnailHtml($imagePath, $thumbnailPath) {
        // if (! file_exists($this->thumbnailRootRelativePath)) {
            Image::generate_image_thumbnail($imagePath, $thumbnailPath, self::$THUMBNAIL_IMAGE_MAX_WIDTH, self::$THUMBNAIL_IMAGE_MAX_HEIGHT);    
        // }
    }

    // http://stackoverflow.com/a/23173626
    private static function generate_image_thumbnail($source_image_path, $thumbnail_image_path, $max_width, $max_height) {
        list($source_image_width, $source_image_height, $source_image_type) = getimagesize($source_image_path);
        switch ($source_image_type) {
            case IMAGETYPE_GIF:
                $source_gd_image = imagecreatefromgif($source_image_path);
                break;
            case IMAGETYPE_JPEG:
                $source_gd_image = imagecreatefromjpeg($source_image_path);
                break;
            case IMAGETYPE_PNG:
                $source_gd_image = imagecreatefrompng($source_image_path);
                break;
        }
        if ($source_gd_image === false) {
            return false;
        }
        $source_aspect_ratio = $source_image_width / $source_image_height;
        $thumbnail_aspect_ratio = $max_width / $max_height;
        if ($source_image_width <= $max_width && $source_image_height <= $max_height) {
            $thumbnail_image_width = $source_image_width;
            $thumbnail_image_height = $source_image_height;
        } elseif ($thumbnail_aspect_ratio > $source_aspect_ratio) {
            $thumbnail_image_width = (int) ($max_height * $source_aspect_ratio);
            $thumbnail_image_height = $max_height;
        } else {
            $thumbnail_image_width = $max_width;
            $thumbnail_image_height = (int) ($max_width / $source_aspect_ratio);
        }
        $thumbnail_gd_image = imagecreatetruecolor($thumbnail_image_width, $thumbnail_image_height);
        imagecopyresampled($thumbnail_gd_image, $source_gd_image, 0, 0, 0, 0, $thumbnail_image_width, $thumbnail_image_height, $source_image_width, $source_image_height);

        $img_disp = imagecreatetruecolor($max_width,$max_width);
        $backcolor = imagecolorallocate($img_disp,0,0,0);
        imagefill($img_disp,0,0,$backcolor);

        imagecopy($img_disp, $thumbnail_gd_image, (imagesx($img_disp)/2)-(imagesx($thumbnail_gd_image)/2), (imagesy($img_disp)/2)-(imagesy($thumbnail_gd_image)/2), 0, 0, imagesx($thumbnail_gd_image), imagesy($thumbnail_gd_image));

        imagejpeg($img_disp, $thumbnail_image_path, 90);
        imagedestroy($source_gd_image);
        imagedestroy($thumbnail_gd_image);
        imagedestroy($img_disp);
        return true;
    }
}

?>
