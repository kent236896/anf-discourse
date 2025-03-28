import Route from "@ember/routing/route";
import { ajax } from "discourse/lib/ajax";

export default Route.extend({
  model() {
    return {
      categories: [
        { id: "w7plMu69o1", name: "Static Site Generator" },
        { id: "eJ1Z6eIMp5", name: "Low Code Development Tool" },
        { id: "lqeR4oSZJo", name: "Business Intelligence" },
      ],
      repos: [
        {
          rank: 1,
          name: "vercel/next.js",
          description: "The React Framework",
          starIncrease: 975,
          totalStars: 138087,
          growthRate: 1.25,
          growthIsPositive: true,
          rankChange: 0,
        },
        {
          rank: 2,
          name: "facebook/react",
          description: "A JavaScript library for building user interfaces",
          starIncrease: 532,
          totalStars: 211456,
          growthRate: 0.8,
          growthIsPositive: true,
          rankChange: 1,
        },
      ],
      currentCategoryId: "w7plMu69o1",
      currentPeriod: "last-28-days",
    };
  },

  setupController(controller, model) {
    this._super(...arguments);
    console.log("Route setupController called");
    controller.setProperties({
      currentRepos: model.repos,
      categories: model.categories,
      currentCategoryId: model.currentCategoryId,
      currentPeriod: model.currentPeriod,
      isLoading: false,
      isCategoriesLoading: false,
    });
  },
});
