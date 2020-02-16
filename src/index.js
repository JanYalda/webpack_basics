// class Form {
//   constructor() {
//     let numbers = [5, 10, 15].map( number => number*2);
//     console.log(numbers);
//   }
// }
//
// new Form();


var announcer = new class {
  constructor(){
    this.vue = new Vue();
  }

  announce(name, data){
    this.vue.$emit(name, data);
  }

  handle(name, callback){
    this.vue.$on(name, callback);
  }

}

Vue.component('task-list', {
  template: `
    <div>
      <task v-for="(task, index) in tasks" :key="index">{{ task.desc }}</task>
    </div>`,

  data() {
    return {
      tasks: [{
        desc: 'do this',
        complete: false
      }, {
        desc: 'do that',
        complete: false
      }, {
        desc: 'do that...',
        complete: false
      }]
    }
  }
});

Vue.component('task', {
  template: '<li><slot></slot></li>',

  data() {
    return {
      message: ""
    }
  }
});

Vue.component('message', {
  props: ['title', 'body'],
  template: `
    <div class="card my-3" v-show="isVisible">
      <div class="card-header d-flex justify-content-between">
          <h5>{{ title }}</h5>
          <button type="button" class="close" @click="isVisible = false" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
      </div>
      <div class="card-body">
        <p>{{ body }}</p>
      </div>
    </div>
  `,

  data() {
    return {
      isVisible: true
    }
  }

});

Vue.component('modal', {
  template: `
    <div class="modal" tabindex="-1" role="dialog" style="display: block">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <slot name="header"></slot>
            <button type="button" class="close" @click="$emit('close')">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body text-center py-5">
            <slot></slot>
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <button type="button" class="btn btn-secondary" @click="$emit('close')">Close</button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  `,

})

Vue.component('tabs', {
  template: `
    <div>
      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li v-for="tab in tabs">
          <a :href="tab.href" @click="selectTab(tab)" :class="{'active' : tab.isActive, 'nav-link' : 1}">{{tab.title}}</a>
        </li>
      </ul>
      <div class="tab-content" id="myTabContent">
        <slot></slot>
      </div>
    </div>
  `,

  data(){
    return {
      tabs: []
    }
  },

  created(){
    this.tabs = this.$children;
  },

  methods: {
    selectTab(selectedTab){
      this.tabs.forEach((tab, i) => {
        tab.isActive = (tab.title == selectedTab.title);
      });
      announcer.announce('done');
    }
  }
});

Vue.component('tab', {
  props: {
    title: {required: true},
    selected: {default: false}
  },

  template: `
    <div class="py-2 px-1" v-show="isActive">
      <p>
        <slot></slot>
      </p>
    </div>`,

  data(){
    return{
      isActive: false
    }
  },

  computed: {
    href(){
      return '#' + this.title.toLowerCase().replace(/ /g, '-');
    }
  },

  mounted(){
    this.isActive = this.selected;
  }

});


new Vue({
  el: "#root",
  data(){
    return {
      showModal: false
    }
  },

  mounted() {
    announcer.handle('done', function(){
      console.warn('DONE');
    })
  }
});
