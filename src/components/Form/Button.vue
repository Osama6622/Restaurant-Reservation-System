<template>
    <button 
      :disabled="disabled"
      class="generic-button"
      :class="{ 'outline-danger': outlineDanger, 'danger': danger, 'outline': outline}"
      @click="handleClick"
      :type="type"
    >
      <img v-if="loading" :src="loadingSpinner" alt="loading spinner"/>
      <span v-else class="generic-button__label">
        <slot></slot>
      </span>
      <span v-if="icon" class="generic-button__icon">
        <i v-if="!loading" :class="icon"></i>
      </span>
    </button>
  </template>
  
  <script>
  import loader from '../../assets/images/loading-indicator.gif'
  export default {
    name: 'BaseButton',
    props: {
      type: {
          type: String,
          default: 'submit',
      },
      outlineDanger: {
          type: Boolean,
          default: false,
      },
      danger: {
          type: Boolean,
          default: false,
      },
      outline: {
          type: Boolean,
          default: false,
      },
      icon: {
          type: String,
          default: null
      },
      disabled: {
          type: Boolean,
          default: false,
      },
      loading: {
          type: Boolean,
          default: false,
      }
    },
    data(){
      return {
          loadingSpinner: loader
      }
    },
    methods: {
      handleClick(event) {
          this.$emit('click', event);
      }
    }
  };
  </script>
