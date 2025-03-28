(function () {
  // 在DOM加载完成后执行
  document.addEventListener("DOMContentLoaded", function () {
    // 等待一段时间以确保Discourse完全渲染页面
    setTimeout(function () {
      initSidebar();
    }, 500);
  });

  function initSidebar() {
    // 获取所有侧边栏项目
    let sidebarItems = document.querySelectorAll(".sidebar-item");

    // 为每个项目添加点击事件
    sidebarItems.forEach(function (item) {
      item.addEventListener("click", function () {
        // 移除所有active类
        sidebarItems.forEach(function (i) {
          i.classList.remove("active");
        });

        // 添加active类到当前项目
        this.classList.add("active");

        // 更新标题
        let categoryName = this.textContent.trim();
        let header = document.querySelector(".ranking-header h2");
        if (header) {
          header.textContent = categoryName + " - Last 28 days Ranking";
        }

        // 这里可以添加更多逻辑，如从服务器加载数据等
        console.log("Category selected:", categoryName);
      });
    });
  }
})();
