<template>
  <div class="manga-item">
    <div class="card">
      <div class="card-image">
        <router-link :to="'/manga/' + item.id">
          <figure class="image is-1by1 thumbnail">
            <img :src="`//tn.hitomi.la/smalltn/${item.id}/${item.thumbnail}.jpg`">
          </figure>
        </router-link>
      </div>
      <div class="card-content">
        <div class="content">
          <h3 class="title">
            <router-link :to="'/manga/' + item.id">
              {{ item.name }}
            </router-link>
          </h3>
          <div v-if="item.type" class="type">{{ bookTypes[item.type] }}</div>
          <tag-list :param="'author'" :values="item.authors" />
          <tag-list :param="'group'" :values="item.groups" />
          <tag-list :param="'character'" :values="item.characters" />
          <div v-if="item.tags" class="tags">
            <router-link
              class="pink"
              v-for="value in item.tags"
              :to="`/manga/tag/${value}`"
            >
              {{ value | tags }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import TagList from './TagList.vue'
import { characters, bookTypes } from '../helpers/constants'
export default {
  name: 'manga-item',
  props: ['item'],
  components: {
    TagList,
  },
  serverCacheKey: props => {
    return `${props.item.id}::${props.item.__lastUpdated}`
  },
  data () {
    return {
      characters,
      bookTypes,
    }
  },
}
</script>

<style lang="sass">
.manga-item
  .thumbnail
    padding-top: 144%
    overflow: hidden
    img
      width: auto
      max-width: none
      margin: auto

  .content a:not(.button)
      border-bottom: 0

  .title
    font-weight: 500
    a
      text-decoration: none
      color: #333
      &:hover
        text-decoration: underline
        color: #16BAB4

  .author a
    color: #333366

  .group a
    color: #333366

  .type a
    color: #663366

  .character a
    color: #aaa
</style>
