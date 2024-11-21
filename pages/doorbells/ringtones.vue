<template>
  <main class="page-landing-doorbell-ringtones pb-32 pb-lg-64">
    <section class="section section-banner overflow-hidden">
      <b-container>
        <b-row align-v="center">
          <b-col md="7" lg="6">
            <h1 class="text-uppercase mb-32">{{ $t('title') }}</h1>
            <p>{{ $t('description.1') }}</p>
            <p>{{ $t('description.2') }}</p>
          </b-col>
          <b-col md="5" lg="6" class="d-none d-md-block">
            <picture>
              <source
                srcset="/images/doorbells/banner-sm.png"
                media="(max-width: 991px)"
              />
              <source srcset="/images/doorbells/banner-md.png" />
              <img
                :alt="$t('title')"
                src="/images/doorbells/banner-md.png"
                class="img-fluid"
              />
            </picture>
          </b-col>
        </b-row>
      </b-container>
    </section>
    <section class="section">
      <b-container v-for="(item, index) in doorbells" :key="index">
        <b-row>
          <b-col sm="6" md="4" xl="3">
            <b-img-lazy
              :src="item.image"
              :alt="$t(item.title)"
              class="img-fluid mb-24"
            />
            <p class="h6">{{ $t(item.title) }}</p>
          </b-col>
          <b-col sm="6" md="8" xl="9">
            <b-row>
              <b-col
                v-for="(audio, audioIndex) in item.audios"
                :key="`audio-${index}-${audioIndex}`"
                md="6"
                xl="4"
                class="mb-32"
              >
                <b-button-group class="d-flex">
                  <b-button
                    :variant="playing === audio ? 'primary' : 'gray-200'"
                    :class="playing === audio ? null : 'border-gray-300'"
                    size="sm"
                    class="text-left"
                    @click="togglePlay(audio)"
                  >
                    <span class="flex-grow-0 border-right border-gray-300 pr-2">
                      {{ (audioIndex + 1).toString().padStart(2, '0') }}
                    </span>
                    <transition name="fade" mode="out-in">
                      <span
                        :key="playing === audio"
                        class="d-flex align-items-center flex-grow-1 pl-2"
                      >
                        <svg-icon
                          :name="playing === audio ? 'pause-24' : 'play-24'"
                          width="16"
                          height="16"
                          class="mr-8"
                          aria-hidden="true"
                        />
                        <span
                          class="mr-auto"
                          v-text="playing === audio ? $t('stop') : $t('play')"
                        ></span>
                      </span>
                    </transition>
                  </b-button>
                  <b-button
                    :href="audio"
                    :variant="playing === audio ? 'primary' : 'gray-200'"
                    :class="playing === audio ? null : 'border-gray-300'"
                    target="_blank"
                    size="sm"
                    class="flex-grow-0"
                    download
                  >
                    <svg-icon
                      name="save-24"
                      width="16"
                      height="16"
                      aria-hidden="true"
                    />
                    <span class="sr-only">{{ $t('download') }}</span>
                  </b-button>
                </b-button-group>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <hr v-if="index < doorbells.length - 1" class="mb-6" />
      </b-container>
    </section>
    <audio ref="player" src="">{{ $t('oldBrowser') }}</audio>
  </main>
</template>

<script>
import { BImgLazy, BButtonGroup } from 'bootstrap-vue'

export default {
  components: {
    BImgLazy,
    BButtonGroup,
  },
  data() {
    return {
      playing: null,
      doorbells: [
        {
          image: '/images/doorbells/dbw001.jpg',
          title: 'dbw001',
          audios: [
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-01.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-02.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-03.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-04.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-05.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-06.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-07.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-08.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-09.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-10.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-11.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-12.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-13.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-14.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-15.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-16.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-17.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-18.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-19.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-20.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-21.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-22.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-23.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-24.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-25.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-26.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-27.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-28.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-29.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-30.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-31.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-32.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-33.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-34.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-35.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-36.mp3',
          ],
        },
        {
          image: '/images/doorbells/dbba001.jpg',
          title: 'dbba001',
          audios: [
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-01.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-02.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-03.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-04.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-05.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-06.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-07.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-08.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-09.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-10.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-11.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-12.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-13.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-14.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-15.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-16.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-17.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-18.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-19.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-20.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-21.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-22.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-23.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-24.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-25.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-26.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-27.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-28.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-29.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-30.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-31.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-32.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-33.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-34.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-35.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbw001-36.mp3',
          ],
        },
        {
          image: '/images/doorbells/dbba002.jpg',
          title: 'dbba002',
          audios: [
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba002-01.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba002-02.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba002-03.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba002-04.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba002-05.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba002-06.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba002-07.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba002-08.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba002-09.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba002-10.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba002-11.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba002-12.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba002-13.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba002-14.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba002-15.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba002-16.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba002-17.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba002-18.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba002-19.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba002-20.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba002-21.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba002-22.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba002-23.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba002-24.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba002-25.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba002-26.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba002-27.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba002-28.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba002-29.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba002-30.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba002-31.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba002-32.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba002-33.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba002-34.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba002-35.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba002-36.mp3',
          ],
        },
        {
          image: '/images/doorbells/dbba003.jpg',
          title: 'dbba003',
          audios: [
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-01.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-02.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-03.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-04.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-05.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-06.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-07.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-08.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-09.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-10.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-11.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-12.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-13.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-14.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-15.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-16.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-17.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-18.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-19.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-20.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-21.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-22.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-23.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-24.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-25.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-26.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-27.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-28.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-29.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-30.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-31.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-32.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-33.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-34.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-35.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-36.mp3',
          ],
        },
        {
          image: '/images/doorbells/dbba004.jpg',
          title: 'dbba004',
          audios: [
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-01.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-02.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-03.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-04.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-05.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-06.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-07.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-08.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-09.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-10.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-11.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-12.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-13.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-14.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-15.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-16.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-17.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-18.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-19.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-20.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-21.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-22.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-23.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-24.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-25.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-26.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-27.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-28.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-29.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-30.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-31.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-32.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-33.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-34.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-35.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbba004-36.mp3',
          ],
        },
        {
          image: '/images/doorbells/dbbd001.jpg',
          title: 'dbbd001',
          audios: [
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbbd001-01.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbbd001-02.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbbd001-03.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbbd001-04.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbbd001-05.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbbd001-06.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbbd001-07.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbbd001-08.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbbd001-09.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbbd001-10.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbbd001-11.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbbd001-12.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbbd001-13.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbbd001-14.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbbd001-15.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbbd001-16.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbbd001-17.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbbd001-18.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbbd001-19.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbbd001-20.mp3',
          ],
        },
        {
          image: '/images/doorbells/dbbd002.jpg',
          title: 'dbbd002',
          audios: [
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbbd001-01.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbbd001-02.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbbd001-03.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbbd001-04.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbbd001-05.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbbd001-06.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbbd001-07.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbbd001-08.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbbd001-09.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbbd001-10.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbbd001-11.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbbd001-12.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbbd001-13.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbbd001-14.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbbd001-15.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbbd001-16.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbbd001-17.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbbd001-18.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbbd001-19.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbbd001-20.mp3',
          ],
        },
        {
          image: '/images/doorbells/dbsd003.jpg',
          title: 'dbsd003',
          audios: [
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbsd003-01.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbsd003-02.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbsd003-03.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbsd003-04.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbsd003-05.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbsd003-06.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbsd003-07.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbsd003-08.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbsd003-09.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbsd003-10.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbsd003-11.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbsd003-12.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbsd003-13.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbsd003-14.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbsd003-15.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbsd003-16.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbsd003-17.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbsd003-18.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbsd003-19.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbsd003-20.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbsd003-21.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbsd003-22.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbsd003-23.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbsd003-24.mp3',
            'https://ekfgroup.com/uploads/audio/melodii-zvonkov/dbsd003-25.mp3',
          ],
        },
      ],
    }
  },
  head() {
    return {
      title: this.$t('pageTitle'),
    }
  },
  methods: {
    togglePlay(audio) {
      if (this.playing === audio) {
        this.playing = null
        this.$refs.player.src = this.playing
        this.$refs.player.pause()
      } else {
        this.playing = audio
        this.$refs.player.src = this.playing
        this.$refs.player.play()
      }
    },
  },
}
</script>

<style lang="scss">
.page-landing-doorbell-ringtones {
  .section {
    padding-top: 2rem;
    padding-bottom: 2rem;

    &.section-banner {
      color: $white;
      border-bottom: 1px solid #e66b3b;
      background-color: #e66b3b;
      background-image: linear-gradient(180deg, #e66b3b, #f19759 800px);
    }
  }
}
</style>

<i18n>
{
  "en": {
    "dbba001": "Wireless door bell with batteries EKF Basic DBB-A-001",
    "dbba002": "Wireless door bell with batteries EKF Basic DBB-A-002",
    "dbba003": "Wireless door bell with batteries EKF Basic DBB-A-003",
    "dbba004": "Wireless door bell with batteries EKF Basic DBB-A-004",
    "dbbd001": "Wireless door bell with batteries EKF PROxima DBB-D-001",
    "dbbd002": "Wireless door bell with batteries EKF PROxima DBB-D-002",
    "dbsd003": "Wireless door bell EKF PROxima DBS-D-003",
    "dbw001": "Wired door bell with batteries EKF Basic DBW-001",
    "description": {
      "1": "Dear customers, we are pleased to announce that you can now familiarize yourself with EKF ringtones before purchasing door bells.",
      "2": "Below are the models of door bells, and next to them is the set of melodies that is available as a ringtone. You can listen to the melodies directly on our website or download them and listen to them on your computer."
    },
    "download": "Download",
    "oldBrowser": "Your browser does not support audio playback, use the Download button.",
    "pageTitle": "EKF Proxima doorbells. Wireless and wired doorbells from the manufacturer",
    "play": "Play",
    "stop": "Stop",
    "title": "EKF Door bell ringtones"
  },
  "ru": {
    "dbba001": "Звонок беспроводной на батарейках 001 EKF Basic DBB-A-001",
    "dbba002": "Звонок беспроводной на батарейках 001 EKF Basic DBB-A-002",
    "dbba003": "Звонок беспроводной на батарейках 001 EKF Basic DBB-A-003",
    "dbba004": "Звонок беспроводной на батарейках 001 EKF Basic DBB-A-004",
    "dbbd001": "Звонок беспроводной на батарейках EKF PROxima DBB-D-001",
    "dbbd002": "Звонок беспроводной на батарейках EKF PROxima DBB-D-002",
    "dbsd003": "Звонок беспроводной в розетку EKF PROxima DBS-D-003",
    "dbw001": "Звонок проводной на батарейках EKF Basic DBW-001",
    "description": {
      "1": "Уважаемые клиенты, мы рады сообщить, что теперь вы можете ознакомиться с мелодиями вызовов звонков EKF до их приобретения.",
      "2": "Ниже представлены модели звонков, а рядом с ними размещен тот набор мелодий, который доступен в качестве сигнала вызова. Вы можете прослушать мелодии прямо на нашем сайте или скачать их и прослушать на компьютере."
    },
    "download": "Скачать",
    "oldBrowser": "Ваш браузер не поддерживает воспроизведение аудио, воспользуйтесь кнопкой «Скачать».",
    "pageTitle": "Дверные звонки EKF Proxima. Беспроводные и проводные бытовые звонки от производителя",
    "play": "Прослушать",
    "stop": "Остановить",
    "title": "Мелодии вызова звонков EKF"
  }
}
</i18n>
