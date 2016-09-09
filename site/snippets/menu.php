<nav class="site-nav" role="navigation">
    <ol class="nav-items">
        <?php foreach($pages->visible() as $link): ?>
        <li class="nav-item">
            <a href="#<?php echo $link->slug(); ?>" class="nav-item__link">
                <?php if ($link->slug() === 'about'): ?>
                    <?php echo $site->title()->html(); ?>
                <?php else: ?>
                    <?php echo $link->title()->html(); ?>
                <?php endif; ?>
            </a>
        </li>
        <?php endforeach ?>
    </ol>
</nav>
