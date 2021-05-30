<template>
  <div class="image-wrapper">
    <div
      class="image-wrapper-inside"
      :id="mode === 'summary' || mode === 'summarySlide' ? 'summary' : ''"
    >
      <div v-if="mode === 'book'">
        <div
          class="transparent-info upper-left"
          v-if="object.first_publish_year"
        >
          <p>{{ object.first_publish_year }}</p>
        </div>
      </div>
      <div
        v-if="mode === 'book'"
        class="bg-image"
        :class="{ placeholder: !object.hasImage }"
        :style="{
          'background-image': 'url(' + object.authorImgUrl + ')',
        }"
      ></div>
      <div
        v-if="mode === 'cover'"
        class="bg-image"
        :style="{
          'background-image': 'url(' + object + ')',
        }"
      ></div>
      <div
        v-if="mode === 'summary' || mode === 'summarySlide'"
        :id="mode === 'summary' || mode === 'summarySlide' ? 'summary' : ''"
        class="bg-image"
        :style="{
          'background-image': 'url(' + summaryBackground + ')',
        }"
      ></div>

      <div v-if="mode === 'book' || mode === 'summary'">
        <AuthorTitleInfo
          :author="object.author_name[0]"
          :title="object.title"
          mode="bottom"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AuthorTitleInfo from '../components/AuthorTitleInfo.vue'

export default {
  props: ['object', 'mode', 'summaryNumber'],
  components: { AuthorTitleInfo },
  method: {},
  mounted() {
    console.log('OBJECT' + this.summaryNumber)
  },
  computed: {
    summaryBackground() {
      console.log(this)
      let tempPath = ''
      if (this.mode === 'summary') {
        tempPath = this.object.path
      }
      if (this.mode === 'summarySlide') {
        tempPath = this.object
      }
      let fullPath = require('../assets/book-summaries/' +
        tempPath +
        '/' +
        this.summaryNumber +
        '.gif')
      console.log(fullPath)
      return fullPath
    },
  },
}
</script>

<style scoped>
.image-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.image-wrapper-inside {
  position: relative;
  height: 380px;
  width: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.transparent-info {
  z-index: 100;
  background: rgba(0, 0, 0, 0.65);
  border-radius: 5px;
  padding: 5px;
  display: flex;
}

.transparent-info p {
  color: var(--main-text-color);
  margin: 0;
  font-size: 0.6em;
  text-align: left;
}

.upper-left {
  position: absolute;
  top: 15px;
  left: 15px;
}

.bg-image {
  width: 250px;
  height: 380px;
  border-radius: 10px;
  position: relative;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

#summary {
  height: 320px;
}

.placeholder {
  width: 200px;
  height: 200px;
}
</style>
