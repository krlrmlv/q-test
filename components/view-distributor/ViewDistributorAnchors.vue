<template>
  <section class="view-project-anchors pt-40 py-xl-96">
    <b-container>
      <b-row>
        <b-col
          v-for="anchor in anchors"
          :key="anchor.key"
          cols="12"
          md="6"
          xl="3"
          class="mb-24"
        >
          <b-link
            @click="$emit('anchor-click', anchor.key)"
            target="_blank"
            class="text-reset"
          >
            <div class="card">
              <div class="card-body">
                <svg-icon
                  :name="anchor.icon"
                  width="40"
                  height="40"
                  aria-hidden="true"
                  class="mb-8 mb-xl-32"
                />
                <h6 class="mb-16">
                  {{ anchor.text }}
                </h6>
              </div>
              <div class="card-footer">
                <b-button
                  class="px-0 distributor-more-btn"
                  variant="link"
                  size="sm"
                >
                  Подробнее
                </b-button>
              </div>
            </div>
          </b-link>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
export default {
  props: {
    anchors: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~bootstrap/scss/card';

.view-project-anchors {
  padding-bottom: 3rem;
  overflow: hidden;

  .card {
    height: 100%;
    background-color: $gray-100;

    .card-img {
      height: auto;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }

    .card-body {
      padding: 2rem 2rem 0.5rem;
    }

    .card-footer {
      padding: 0 2rem 2rem;
      border: none;

      .distributor-more-btn {
        color: $gray-600;
      }
    }
  }
}

@include media-breakpoint-up(xl) {
  .view-project-anchors {
    padding-bottom: 0;
    .card {
      transition: 0.5s;

      &:hover {
        transform: translateY(-20px);
        background-color: #fff;
        // background-color: aqua;
        box-shadow: 0px 4px 24px 0px rgba(33, 37, 41, 0.08);

        .card-footer {
          background-color: transparent;

          .distributor-more-btn {
            visibility: visible;
          }
        }
      }

      .card-footer {
        background-color: transparent;

        .distributor-more-btn {
          visibility: hidden;
          color: $primary;
          &:hover {
            visibility: visible;
          }
        }
      }
    }
  }
}
</style>
