<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">

        <title><?php echo str::upper($site->title()->html()); ?></title>

        <meta name="description" content="<?php echo $site->description()->html() ?>">
        <meta name="keywords" content="<?php echo $site->keywords()->html() ?>">


        <?php echo css('assets/css/styles.css'); ?>
    </head>

    <body>
        <div class="scroller">
            <header class="site-header">
                <h1 class="site-name">
                    <?php echo $site->title()->html(); ?>
                </h1>
            </header>

            <?php snippet('menu'); ?>
