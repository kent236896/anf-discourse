# frozen_string_literal: true

module AnfDiscourse
  class RankingsController < ::ApplicationController
    requires_plugin AnfDiscourse::PLUGIN_NAME

    skip_before_action :check_xhr

    def index
      respond_to do |format|
        format.html do
          # 使用Discourse标准的Ember布局
          render html: "", layout: true
        end

        format.json do
          render json: {
                   success: true,
                   current_user: current_user ? current_user.username : nil,
                   server_time: Time.now.strftime("%Y-%m-%d %H:%M:%S"),
                 }
        end
      end
    end

    def categories
      categories = [
        { id: "w7plMu69o1", name: "Static Site Generator" },
        { id: "eJ1Z6eIMp5", name: "Low Code Development Tool" },
      ]

      render json: { success: true, categories: categories }
    end

    def repos
      repos = [
        {
          rank: 1,
          name: "vercel/next.js",
          description: "The React Framework",
          starIncrease: 975,
          totalStars: 138_087,
          growthRate: 1.25,
          growthIsPositive: true,
          rankChange: 0,
        },
      ]

      render json: { success: true, repos: repos }
    end
  end
end
