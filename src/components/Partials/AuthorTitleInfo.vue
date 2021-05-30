<template>
  <div class="transparent-info" :class="mode">
    <div class="transparent-info-inside">
      <i class="material-icons">person</i>
      <div class="title-author-wrapper">
        <p>
          <b>
            {{ author }}
          </b>
        </p>
      </div>
    </div>
    <div class="transparent-info-inside">
      <i class="material-icons">book</i>
      <div class="title-author-wrapper">
        <p>
          <b> {{ title }}</b>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'author', 'mode'],
}
</script>

<style scoped>
.transparent-info {
  z-index: 100;
  background: rgba(0, 0, 0, 0.65);
  border-radius: 5px;
  padding: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.transparent-info p {
  color: var(--main-text-color);
  margin: 0;
  font-size: 0.6em;
  text-align: left;
}

.transparent-info-inside {
  display: flex;
  align-items: center;
}

.author-title-info p {
  margin: 0;
  font-size: 0.6em;
  text-align: left;
}

.transparent-info-inside i {
  color: white;
}

.title-author-wrapper {
  max-height: 40px;
  overflow: hidden;
}

.bottom {
  position: absolute;
  bottom: 15px;
  left: 0;
  right: 0;
  margin-left: 10px;
  margin-right: 10px;
  max-height: 40px;
  overflow: hidden;
}
</style>
