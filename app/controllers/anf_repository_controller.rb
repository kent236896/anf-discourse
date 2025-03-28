module ::AnfDiscourse
  class AnfRepositoryController < ::ApplicationController
    requires_plugin "anf-discourse"
    skip_before_action :verify_authenticity_token,
                       only: %i[collections ranking fetch_data fetch_categories]

    def collections
      begin
        service = initialize_service
        collections = service.get_repository_collections

        render json: { success: true, collections: collections["data"] }
      rescue StandardError => e
        render_error(e.message)
      end
    end

    def ranking
      begin
        collection_id = params.require(:id)

        service = initialize_service
        ranking = service.get_repository_ranking(collection_id)

        render json: { success: true, ranking: ranking["data"] }
      rescue ActionController::ParameterMissing => e
        render_error("Missing parameter: #{e.param}")
      rescue StandardError => e
        render_error(e.message)
      end
    end

    def fetch_data
      # 添加明确的调试日志
      Rails.logger.info("AnfRepository#fetch_data被调用，参数: #{params.inspect}")

      category_id = params[:category_id] || "w7plMu69o1"
      period = params[:period] || "last-28-days"

      service = initialize_service
      repos = service.fetch_repository_data(category_id, period)

      # 确保设置正确的内容类型
      response.headers["Content-Type"] = "application/json"

      # 明确地渲染JSON响应
      render json: { success: true, category_id: category_id, period: period, repos: repos }
    end

    def fetch_categories
      # 调试日志
      Rails.logger.info("AnfRepository#fetch_categories被调用")

      # 获取数据
      categories = fetch_category_data

      # 设置响应类型
      response.headers["Content-Type"] = "application/json"

      # 渲染JSON
      render json: { success: true, categories: categories }
    end

    private

    def initialize_service
      service = AnfDiscourse::AnfRepositoryService.new
      username = SiteSetting.anf_api_username
      password = SiteSetting.anf_api_password

      if username.blank? || password.blank?
        raise StandardError, "ANF API credentials not configured"
      end

      service.login(username, password)
      service
    end

    def fetch_category_data
      # 示例数据
      [
        { id: "w7plMu69o1", name: "Static Site Generator" },
        { id: "eJ1Z6eIMp5", name: "Low Code Development Tool" },
        # 其他分类...
      ]
    end

    def render_error(message)
      render json: { success: false, error: message }, status: :unprocessable_entity
    end
  end
end
