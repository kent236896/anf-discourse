import loadScript from "discourse/lib/load-script";
import { withPluginApi } from "discourse/lib/plugin-api";
import I18n from "discourse-i18n";

export default {
  name: "initialize-anf-discourse",

  initialize() {
    withPluginApi("0.8.31", (api) => {
      // 添加顶部菜单链接，而不是hamburger-menu
      api.addNavigationBarItem({
        name: "anf-discourse",
        displayName: "仓库排名",
        href: "/anf-discourse",
        title: "GitHub仓库排名",
      });

      // 添加翻译支持
      if (!I18n.translations.zh_CN) {
        I18n.translations.zh_CN = {};
      }

      I18n.translations.zh_CN.repository_rankings = {
        title: "代码仓库排名",
        items_per_page: "每页显示",
        of: "共",
      };

      // 当路由为anf-discourse时，加载脚本
      api.onPageChange((url) => {
        if (url.includes("anf-discourse")) {
          loadScript(
            "/plugins/anf-discourse/javascripts/discourse/lib/tabs-interaction.js"
          ).catch(() => {
            // 静默处理错误，防止控制台错误
          });
        }
      });
    });
  },
};
