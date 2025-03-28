# 使用标准Rails控制器而非Ember
class RankingController < ApplicationController
  skip_before_action :check_xhr
  layout "application"

  def index
    # 准备仓库数据
    @categories = [
      { id: "static-site-generator", name: I18n.t("js.ranking.categories.static_site") },
      { id: "low-code-development", name: I18n.t("js.ranking.categories.low_code") },
      { id: "business-intelligence", name: I18n.t("js.ranking.categories.business_intelligence") },
      {
        id: "artificial-intelligence",
        name: I18n.t("js.ranking.categories.artificial_intelligence"),
      },
    ]

    @repos = {
      "static-site-generator" => [
        {
          rank: 1,
          name: "vercel/next.js",
          description: "The React Framework",
          star_increase: 978,
          total_stars: 138_056,
          growth_rate: 2.73,
          growth_is_positive: true,
        },
      ],
      "low-code-development" => [
        {
          rank: 1,
          name: "appsmithorg/appsmith",
          description: "Low code framework for building admin panels and internal tools",
          star_increase: 876,
          total_stars: 28_790,
          growth_rate: 3.14,
          growth_is_positive: true,
        },
      ],
    }

    # 使用标准Rails视图而非Ember模板
    render
  end
end
