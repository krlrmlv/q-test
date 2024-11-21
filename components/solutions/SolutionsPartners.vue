<template>
  <section>
    <b-container>
      <h2 class="mb-32 mb-md-48">
        {{ title }}
      </h2>
      <div class="solutions-partners-grid">
        <div
          v-for="(partner, index) in partners"
          :key="`partner-${index}`"
          class="solutions-partner"
        >
          <img
            :src="partner.image"
            :alt="partner.title"
            class="solutions-partner-image"
          />
        </div>
      </div>
    </b-container>
  </section>
</template>

<script>
export default {
  data() {
    return {
      partners: [],
      title: null,
    }
  },

  async fetch() {
    const { partners, title } = await new Promise((resolve) => {
      const partners = [
        { image: '/images/solutions/partners/rjd.svg', title: 'РЖД' },
        { image: '/images/solutions/partners/rosneft.svg', title: 'Роснефть' },
        { image: '/images/solutions/partners/lukoil.svg', title: 'ЛукОйл' },
        { image: '/images/solutions/partners/gazprom.svg', title: 'Газпром' },
        { image: '/images/solutions/partners/pik.png', title: 'ПИК' },
        { image: '/images/solutions/partners/lsr.png', title: 'ЛСР' },
        { image: '/images/solutions/partners/kortros.png', title: 'Кортрос' },
        { image: '/images/solutions/partners/fsk.png', title: 'ФСК' },
        { image: '/images/solutions/partners/samolet.png', title: 'Самолет' },
        { image: '/images/solutions/partners/granel.png', title: 'Гранель' },
        { image: '/images/solutions/partners/yit.svg', title: 'YIT' },
        { image: '/images/solutions/partners/setl.png', title: 'Setl Group' },
      ]
      const title = 'Нам доверяют'
      resolve({ partners, title })
    })

    this.partners = partners
    this.title = title
  },
}
</script>

<style lang="scss" scoped>
.solutions-partners-grid {
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 1.5rem;
  align-items: center;
  justify-content: space-between;
}

.solutions-partner {
  text-align: center;
}

.solutions-partner-image {
  max-width: 100%;
  height: auto;
}

@include media-breakpoint-only(xs) {
  .solutions-partners-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: stretch;
    gap: 0;
    margin: -0.75rem;
  }

  .solutions-partner {
    flex: 0 0 50%;
    padding: 0.75rem;
    text-align: center;
  }
}

@include media-breakpoint-only(sm) {
  .solutions-partner {
    &:nth-child(3n + 1) {
      text-align: left;
    }

    &:nth-child(3n) {
      text-align: right;
    }
  }
}

@include media-breakpoint-only(md) {
  .solutions-partner {
    &:nth-child(5n + 1) {
      text-align: left;
    }

    &:nth-child(5n) {
      text-align: right;
    }
  }
}

@include media-breakpoint-up(sm) {
  .solutions-partners-grid {
    grid-template-columns: repeat(3, auto);
  }
}

@include media-breakpoint-up(md) {
  .solutions-partners-grid {
    grid-template-columns: repeat(5, auto);
    gap: 3.5rem 2rem;
  }
}

@include media-breakpoint-up(lg) {
  .solutions-partners-grid {
    grid-template-columns: repeat(6, auto);
    gap: 3.5rem 2rem;
  }

  .solutions-partner {
    &:nth-child(6n + 1) {
      text-align: left;
    }

    &:nth-child(6n) {
      text-align: right;
    }
  }
}
</style>
