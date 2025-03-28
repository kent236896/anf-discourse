(function () {
  // 直接测试API端点
  const testAPI = function () {
    // 测试分类API
    fetch("/anf-discourse/api/categories")
      .then((response) => response.json())
      .then((data) => {
        console.log("Categories API Result:", data);
      })
      .catch((err) => {
        console.error("Categories API Error:", err);
      });

    // 测试仓库API
    fetch("/anf-discourse/api/repos")
      .then((response) => response.json())
      .then((data) => {
        console.log("Repos API Result:", data);
      })
      .catch((err) => {
        console.error("Repos API Error:", err);
      });
  };

  // 在控制台中暴露测试函数
  window.testAnfDiscourseAPI = testAPI;

  // 在页面加载完成后自动执行
  document.addEventListener("DOMContentLoaded", function () {
    console.log("AnfDiscourse Direct API Test Loaded");
  });
})();
