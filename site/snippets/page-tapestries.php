<?php foreach($content->children()->visible() as $tapestry) : ?>
<?php $slug = $tapestry->slug(); ?>
    <li id="<?php echo $slug; ?>"
        class="page page--tapestry">
        <div class="page__content">
            <div class="tapestry-container">
                <div class="tapestry">
                    <h3 class="tapestry__title">
                        <?php echo $tapestry->title()->html(); ?>
                    </h3>

                    <ul class="slider">
                    <?php foreach($tapestry->files() as $file): ?>
                        <li class="tapestry-image">
                            <figure class="tapestry-image__figure">
                                <div class="tapestry-image__image-container">
                                    <b class="tapestry-image__centred">
                                        <img class="tapestry-image__image"
                                             src="<?php echo $file->url(); ?>" alt="">
                                    </b>
                                </div>
                                <figcaption class="tapestry-image__caption">
                                    <?php echo $file->caption()->kirbytext(); ?>
                                </figcaption>
                            </figure>
                        </li>
                    <?php endforeach; ?>
                    </ul>
                </div>
            </div>
        </div>
    </li>
<?php endforeach; ?>
