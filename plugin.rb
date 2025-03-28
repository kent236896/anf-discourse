# name: anf-discourse
# about: GitHub Repository Rankings Plugin
# version: 0.1
# authors: Your Name
# url: https://github.com/your-username/anf-discourse

# 只需要注册非JavaScript资源
register_asset "stylesheets/ranking-page.scss"

# 插件启用设置（可选）
# enabled_site_setting :anf_discourse_enabled

after_initialize do
  # 标准的控制器加载方式
  module ::AnfDiscourse
    PLUGIN_NAME = "anf-discourse".freeze
  end

  # 使用require_dependency确保正确加载
  require_dependency "application_controller"
  require_dependency File.expand_path("../app/controllers/anf_discourse_controller.rb", __FILE__)

  # 标准路由注册
  Discourse::Application.routes.append do
    get "/anf-discourse" => "anf_discourse/rankings#index"
    get "/anf-static" => "anf_discourse/rankings#index"
    get "/anf-discourse/api/categories" => "anf_discourse/rankings#categories"
    get "/anf-discourse/api/repos" => "anf_discourse/rankings#repos"
  end

  register_html_builder("server:before-head-close") do
    "<script>requirejs('discourse/routes/anf-discourse')</script>"
  end
end
