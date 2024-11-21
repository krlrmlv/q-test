<template>
  <b-container class="container">
    <div class="card news-article-featured">
      <picture>
        <source
          srcset="/images/view/project/news-featured-placeholder-sm.jpg"
          media="(max-width: 991.98px)"
        />
        <source
          srcset="/images/view/project/news-featured-placeholder.jpg"
          media="(max-width: 1920px)"
        />
        <source
          srcset="/images/view/project/news-featured-placeholder-xxl.jpg"
        />
        <img
          aria-hidden="true"
          class="card-img"
          height="400"
          src="/images/view/project/news-featured-placeholder.jpg"
        />
      </picture>

      <img
        aria-hidden="true"
        class="card-img-secondary"
        width="400"
        src="/images/view/project/logo-ekf-letters-white.svg"
      />

      <div class="card-body">
        <b-row>
          <b-col xl="6" xxl="4">
            <div class="card-content">
              <h2 class="card-title">
                {{ $t('lkp.banner.title') }}
              </h2>
              <p class="mb-32 mb-md-80">
                {{ $t('lkp.banner.subtitle') }}
              </p>

              <LinkMore
                href="https://lkp.ekfgroup.com/"
                target="_blank"
                class="py-8 text-white"
                @click="$ym('reachGoal', 'CLICKLKPBUTTONPROJECT')"
              >
                {{ $t('lkp.banner.button') }}
              </LinkMore>
            </div>
          </b-col>
        </b-row>
      </div>
    </div>
  </b-container>
</template>

<script></script>

<style lang="scss" scoped>
.news-article-featured {
  position: relative;
  min-height: 400px;
  padding: 3.5rem 1rem 0;
  overflow-wrap: normal;
}

.card-img,
.card-img-secondary {
  position: absolute;
  right: -1px;
}

.card-img {
  top: 0;
  left: 0;
  height: 400px;
  object-fit: cover;
}

.card-img-secondary {
  top: 0;
  transform: rotate(-90deg) translateY(-100%);
  transform-origin: top right;
}

.card-body {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  min-height: 400px;
  padding: 0;
}

.card-content {
  padding: 2.5rem 1.5rem;
  color: $white;
  background-color: rgba(#db0812, 0.9);
}

.card-title {
  margin-bottom: 1.5rem;
}

@include media-breakpoint-down(lg) {
  .card-img-secondary {
    display: none;
  }
  .card-body {
    top: 3rem;
  }
}

@include media-breakpoint-down(md) {
  .container {
    padding: 0;
  }
  .card-body {
    top: 6rem;
  }
}
@include media-breakpoint-up(lg) {
  .news-article-featured {
    padding: 4rem 3.5rem 0;
  }

  .card-content {
    padding: 2.5rem 3rem;
  }
}
</style>
