import { withPluginApi } from 'discourse/lib/plugin-api';

export default {
  name: 'init-anf-discourse',
  initialize() {
    withPluginApi('0.8.31', api => {
      console.log('ANF Discourse 插件已初始化');
      
      // 添加导航菜单项
      api.decorateWidget('hamburger-menu:generalLinks', helper => {
        return {
          route: 'anf-discourse',
          className: 'anf-discourse-link',
          label: 'anf_discourse.title'
        };
      });
    });
  }
}; 