#!/bin/bash

resizeImages() {
    local imgs=("./raw-imgs/*")
    local i=1

    for img in $imgs
    do
        convert "$img" -resize 1000x1000 -quality 80 ./public/imgs/$i.jpg
        ((i++))
    done
}

resizeImages
