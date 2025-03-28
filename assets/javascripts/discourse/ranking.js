(function () {
  // 页面初始化时运行
  document.addEventListener("DOMContentLoaded", function () {
    // 获取数据
    fetchRankingData();

    // 绑定事件处理器到时间段选择器
    const periodSelectors = document.querySelectorAll(".period-selector span");
    periodSelectors.forEach(function (selector) {
      selector.addEventListener("click", function () {
        periodSelectors.forEach((s) => s.classList.remove("selected"));
        this.classList.add("selected");
        // 这里可以添加加载不同时间段数据的逻辑
      });
    });
  });

  // 从API获取排名数据
  function fetchRankingData() {
    fetch("/ranking")
      .then((response) => response.json())
      .then((data) => {
        // 渲染类别选项卡
        renderCategories(data.categories);

        // 渲染第一个类别的仓库数据
        if (data.categories && data.categories.length > 0) {
          const firstCategoryId = data.categories[0].id;
          renderRepos(
            data.repos[firstCategoryId] || [],
            data.categories[0].name
          );

          // 为类别选项卡添加点击事件
          const tabs = document.querySelectorAll(".category-tab");
          tabs.forEach(function (tab) {
            tab.addEventListener("click", function () {
              tabs.forEach((t) => t.classList.remove("active"));
              this.classList.add("active");

              const categoryId = this.getAttribute("data-category-id");
              const categoryName = this.textContent.trim();
              renderRepos(data.repos[categoryId] || [], categoryName);
            });
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching ranking data:", error);
        document.getElementById("repo-table-body").innerHTML = `
          <tr><td colspan="5" class="empty-state">
            Error loading repository data. Please try again later.
          </td></tr>
        `;
      });
  }

  // 渲染类别选项卡
  function renderCategories(categories) {
    const tabsContainer = document.getElementById("category-tabs");
    if (!tabsContainer || !categories || !categories.length) {
      return;
    }

    const tabsHTML = categories
      .map(
        (category, index) => `
      <div class="category-tab ${index === 0 ? "active" : ""}" 
           data-category-id="${category.id}">
        ${category.name}
      </div>
    `
      )
      .join("");

    tabsContainer.innerHTML = tabsHTML;
  }

  // 渲染仓库数据
  function renderRepos(repos, categoryName) {
    const tableBody = document.getElementById("repo-table-body");
    const categoryTitle = document.getElementById("current-category");
    const pageInfo = document.getElementById("page-info");

    if (!tableBody || !categoryTitle || !pageInfo) {
      return;
    }

    // 更新类别标题
    categoryTitle.textContent = categoryName;

    // 更新页面信息
    if (repos.length > 0) {
      pageInfo.textContent = `1-${repos.length} of ${repos.length}`;
    } else {
      pageInfo.textContent = "0-0 of 0";
    }

    // 如果没有数据，显示空状态
    if (!repos || repos.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="5" class="empty-state">
            No repositories found for this category
          </td>
        </tr>
      `;
      return;
    }

    // 渲染仓库行
    const rowsHTML = repos
      .map(
        (repo) => `
      <tr>
        <td class="rank-cell">${repo.rank}</td>
        <td>
          <div class="repo-name">
            <a href="https://github.com/${repo.name}" target="_blank">
              ${repo.name}
            </a>
          </div>
          <div class="repo-desc">${repo.description}</div>
        </td>
        <td>${repo.starIncrease}</td>
        <td>${formatNumber(repo.totalStars)}</td>
        <td class="${repo.growthIsPositive ? "positive" : "negative"}">
          ${repo.growthIsPositive ? "↑" : "↓"} ${repo.growthRate}%
        </td>
      </tr>
    `
      )
      .join("");

    tableBody.innerHTML = rowsHTML;
  }

  // 格式化数字（添加千位分隔符）
  function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
})();
