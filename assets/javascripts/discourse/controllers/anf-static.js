import Controller from "@ember/controller";

export default Controller.extend({
  init() {
    this._super(...arguments);
    console.log("ANF Static controller initialized");
  },

  actions: {
    selectCategory(categoryId) {
      console.log("Category selected:", categoryId);
      // 这里只是记录，不实际更改数据
    },

    changePage(page) {
      console.log("Change to page:", page);
      // 这里只是记录，不实际更改数据
    },
  },
});
