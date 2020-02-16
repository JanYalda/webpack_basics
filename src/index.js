// class Form {
//   constructor() {
//     let numbers = [5, 10, 15].map( number => number*2);
//     console.log(numbers);
//   }
// }
//
// new Form();

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

new Vue({
  el: "#root",
});
