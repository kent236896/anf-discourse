import DiscourseRoute from "discourse/routes/discourse";

export default class AnfDiscourseRoute extends DiscourseRoute {
  activate() {
    console.log("AnfDiscourseRoute activated");
  }

  model() {
    return {};
  }

  setupController(controller) {
    super.setupController(...arguments);
    console.log("Controller setup in route, type:", typeof controller);
    console.log("Controller methods:", Object.keys(controller));

    // 手动激活控制器方法
    if (typeof controller.loadData === "function") {
      console.log("调用loadData方法");
      controller.loadData();
    } else {
      console.error("loadData方法不存在或不是函数");
    }
  }
}
