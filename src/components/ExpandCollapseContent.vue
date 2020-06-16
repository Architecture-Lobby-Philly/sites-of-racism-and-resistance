<template>
  <div class="grid-y grid-padding-y">
    <div class="cell medium-12">
      <div class="small-22">
        <div
          v-if="item.category_type === 'incomplete'"
          class="status-text red"
        >
          {{ item.category_type }}
        </div>
        <div
          v-if="item.category_type === 'complete'"
          class="status-text"
        >
          {{ item.category_type }}
        </div>
      </div>
      <div
        v-if="address"
        class="grid-x detail"
      >
        <div class="small-1">
          <font-awesome-icon icon="map-marker-alt" />
        </div>
        <div class="small-22">
          {{ address }}<br>
          Philadelphila, PA {{ zipcode }}
        </div>
      </div>
      <div class="small-22">
        tags: {{ item.tags }}
      </div>
     <!-- <div>
        <iframe width="420" height="315"
          src="https://www.youtube.com/embed/tgbNymZ7vqY">
        </iframe>
      </div> -->
    </div>


    <img
      :src="getAttachments(item)"
      class="the-img"
    >

  </div>
</template>

<script>

// import transforms from '../general/transforms.js';

export default {
  name: 'ExpandCollapseContent',

  props: {
    item: {
      type: Object,
      default: function(){
        return {};
      },
    },
  },
  computed: {
    // transforms() {
    //   return transforms;
    // },
    subsections() {
      return this.$config.subsections;
    },
    section() {
      return this.subsections[this.$props.item.attributes['CATEGORY']];
    },
    subsection() {
      return this.$props.item.attributes.CATEGORY;
    },
    address() {
      let value = this.$props.item.address;
      return value;
    },
    zipcode() {
      let value = this.$props.item.zipcode;
      return value;
    },
  },
  methods: {
    getAttachments(item) {
      // console.log('in getAttachments, item:', item);
      if (item.Attachments) {
        // console.log('in getAttachments, item.Attachments[0]:', item.Attachments[0]);
        return item.Attachments[0].url;
      }
    },
    parseAddress(address) {
      const formattedAddress = address.replace(/(Phila.+)/g, city => `<div>${city}</div>`).replace(/^\d+\s[A-z]+\s[A-z]+/g, lineOne => `<div>${lineOne}</div>`).replace(/,/, '');
      return formattedAddress;
    },
    getCategory(item) {
      let value;
      if (this.$config.categoryExceptions) {
        if (this.$config.categoryExceptions.condition(item)) {
          value = this.$config.categoryExceptions.value;
          // console.log('getCategory is running, item:', item, 'value:', value);
        } else {
          value = item.attributes.CATEGORY;
        }
      } else {
        value = item.attributes.CATEGORY;
      }
      return value;
    },
  },
};

</script>

<style lang="scss">

.red {
  color: #fc603d;
}

.status-text {
  font-size: 20px;
}

.the-img {
  width: 90px;
}

.location-item {
  position: relative;
  border-bottom: 1px solid black;
  height:100%;

  &:hover::after {
    color: white;
  }

  .temp-close-section {
    width: 100%;
  }

  .card-exclamation-holder {
    padding: 20px;
    background-color: #CC3000;
    text-align: center;
  }

  .fa-icon-class {
    color: white;
    text-align: center;
  }

  .card-exclamation-details {
    padding: 10px;
    background-color: #F5D6CC;
  }

  .location-title {
    cursor: pointer;
    padding: 1rem;
    margin-bottom: 0;
    &:hover{
      background: #2176d2;
      color: white;
    }
  }

  &::after{
    position: absolute;
    right:1rem;
    top: 0;
    content: '+';
    font-weight: 900;
    font-size:1.5rem;
    z-index: 100;
    color: color(dark-ben-franklin)
  }
  &.open{
    h2{
      color:white;
      background-color: color(ben-franklin-blue);
      font-weight: 900;
    }
    &::after{
      content: '-';
      color:white;
    }
  }
  .location-content{
    overflow: hidden;
    height:0;

    &.location-open{
      padding: 1rem;
      height: 100%;
      overflow: initial;
    }
  }
}
</style>
