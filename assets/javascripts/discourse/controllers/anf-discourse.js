import { tracked } from "@glimmer/tracking";
import Controller from "@ember/controller";
import { action } from "@ember/object";
import { ajax } from "discourse/lib/ajax";
import { popupAjaxError } from "discourse/lib/ajax-error";
import discourseComputed from "discourse/lib/decorators";
import I18n from "discourse-i18n";

export default Controller.extend({
  // 初始化属性
  currentCategoryId: "w7plMu69o1", // 默认ID
  currentPeriod: "last-28-days",
  itemsPerPage: 10,
  currentPage: 1,
  isLoading: false,
  isCategoriesLoading: false,
  currentRepos: [],
  categories: [],
  currentCategoryName: "",
  _repoDataLoaded: false,
  _categoriesLoaded: false,
  _lastError: null,

  init() {
    this._super(...arguments);
    console.log("ANF Discourse控制器初始化");

    // 尝试使用Ajax直接调用API
    ajax("/anf-discourse/api/categories")
      .then((response) => {
        console.log("分类API响应:", response);
      })
      .catch((error) => {
        console.error("分类API错误:", error);
      });

    this.setProperties({
      currentCategoryId: "w7plMu69o1",
      currentPeriod: "last-28-days",
      isLoading: false,
      isCategoriesLoading: false,
      currentRepos: [],
      categories: [],
      currentCategoryName: "",
      _repoDataLoaded: false,
      _categoriesLoaded: false,
      _lastError: null,
    });

    setTimeout(() => this.send("refreshData"), 100);
  },

  loadData() {
    console.log("Loading data...");
    this.fetchCategories();
    this.fetchRepoData();
  },

  fetchCategories() {
    console.log("获取分类 - 请求URL:", "/anf-discourse/api/categories");
    if (this.get("_categoriesLoaded")) {
      return;
    }

    this.set("isCategoriesLoading", true);

    ajax("/anf-discourse/api/categories")
      .then((response) => {
        console.log("分类数据响应:", response);
        if (response && response.success) {
          this.set("categories", response.categories || []);
          const category = (response.categories || []).find(
            (c) => c.id === this.get("currentCategoryId")
          );
          this.set("currentCategoryName", category ? category.name : "");
          this.set("_categoriesLoaded", true);
        } else {
          this.set("_lastError", "分类API返回格式不正确");
        }
        this.set("isCategoriesLoading", false);
      })
      .catch((error) => {
        console.error("分类请求错误:", error);
        this.set("_lastError", `分类数据请求失败`);
        this.set("isCategoriesLoading", false);
      });
  },

  fetchRepoData() {
    console.log("获取仓库数据 - 请求URL:", "/anf-discourse/api/repos");
    this.set("isLoading", true);

    ajax("/anf-discourse/api/repos", {
      data: {
        category_id: this.get("currentCategoryId"),
        period: this.get("currentPeriod"),
      },
    })
      .then((response) => {
        console.log("仓库数据响应:", response);
        if (response && response.success) {
          this.set("currentRepos", response.repos || []);
          this.set("_repoDataLoaded", true);
        } else {
          this.set("_lastError", "仓库API返回格式不正确");
        }
        this.set("isLoading", false);
      })
      .catch((error) => {
        console.error("仓库请求错误:", error);
        this.set("_lastError", `仓库数据请求失败`);
        this.set("isLoading", false);
      });
  },

  formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },

  actions: {
    refreshData() {
      console.log("刷新数据");
      this.fetchCategories();
      this.fetchRepoData();
    },

    selectCategory(categoryId) {
      console.log("选择分类", categoryId);
      this.set("currentCategoryId", categoryId);
      this.fetchRepoData();
    },

    selectPeriod(period) {
      console.log("选择时间段", period);
      this.set("currentPeriod", period);
      this.fetchRepoData();
    },
  },
});
