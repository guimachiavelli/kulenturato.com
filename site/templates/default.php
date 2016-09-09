<?php snippet('header'); ?>

<main class="site-content">
    <article id="<?php echo $page->title()->html(); ?>"
             class="page page--<?php echo $page->slug(); ?>">
            <div class="page__content">
                <?php echo $page->text()->kirbytext(); ?>
            </div>
        </article>
</main>

<?php snippet('footer'); ?>
