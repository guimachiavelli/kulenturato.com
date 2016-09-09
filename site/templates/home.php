<?php snippet('header'); ?>

<main class="site-content">
    <ol class="pages">
        <?php foreach($pages->visible() as $section): ?>
            <?php $slug = $section->slug(); ?>
            <?php snippet("page-${slug}", array(
                'content' => $section,
                'slug' => $slug));
            ?>
        <?php endforeach ?>
</main>

<?php snippet('footer'); ?>
