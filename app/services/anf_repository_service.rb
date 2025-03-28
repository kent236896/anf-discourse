require "net/http"
require "uri"
require "json"

module AnfDiscourse
  class AnfRepositoryService
    # 固定的客户端凭据
    CLIENT_ID = "9bfd90bd-4f5c-47e0-8e77-f755a63c28a1"
    CLIENT_SECRET = "3Gah2F23UfYsYQISbkNDoBxcdmw2LVLQ3zv9GiKI"
    GRANT_TYPE = "password"
    BASE_URI = "https://member.ainativefoundation.org/api/v1"

    def initialize
      @access_token = nil
    end

    # 方法1：登录获取token
    def login(username, password)
      uri = URI("#{BASE_URI}/auth/login")
      request = Net::HTTP::Post.new(uri)
      request.content_type = "application/json"
      request.body = {
        username: username,
        password: password,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: GRANT_TYPE,
      }.to_json

      begin
        response =
          Net::HTTP.start(uri.hostname, uri.port, use_ssl: uri.scheme == "https") do |http|
            http.request(request)
          end

        result = handle_response(response)

        if result && result["data"] && result["data"]["access_token"]
          @access_token = result["data"]["access_token"]
          @access_token
        else
          raise StandardError, "Failed to extract access token from response"
        end
      rescue => e
        Rails.logger.error("Login error: #{e.message}")
        raise StandardError, "Login failed: #{e.message}"
      end
    end

    # 方法2：获取仓库集合
    def get_repository_collections
      ensure_authenticated

      begin
        uri = URI("#{BASE_URI}/repository-collections")
        request = Net::HTTP::Get.new(uri)
        request["Authorization"] = "Bearer #{@access_token}"

        response =
          Net::HTTP.start(uri.hostname, uri.port, use_ssl: uri.scheme == "https") do |http|
            http.request(request)
          end

        handle_response(response)
      rescue => e
        Rails.logger.error("Error fetching repository collections: #{e.message}")
        raise StandardError, "Failed to fetch repository collections: #{e.message}"
      end
    end

    # 方法3：获取仓库排名
    def get_repository_ranking(collection_id)
      ensure_authenticated

      begin
        options = { headers: auth_header }
        response =
          self.class.get("/repository-collections/#{collection_id}/ranking-by-stars", options)
        handle_response(response)
      rescue => e
        Rails.logger.error("Error fetching repository ranking: #{e.message}")
        raise StandardError, "Failed to fetch repository ranking: #{e.message}"
      end
    end

    def fetch_repository_data(category_id, period)
      # 示例仓库数据
      sample_data = {
        "code" => 0,
        "msg" => "success",
        "data" => [
          {
            "id" => "pV30MQxt59",
            "collectionId" => "w7plMu69o1",
            "repoName" => "vercel/next.js",
            "description" => "The React Framework",
            "repoUrl" => "https://github.com/vercel/next.js",
            "currentPeriodGrowth" => "975",
            "pastPeriodGrowth" => "963",
            "growthPop" => "1.25",
            "rankPop" => "0",
            "total" => "138087",
            "currentPeriodRank" => "1",
            "pastPeriodRank" => "1",
          },
          {
            "id" => "q3vwZPlIe9",
            "collectionId" => "w7plMu69o1",
            "repoName" => "gohugoio/hugo",
            "description" => "The world's fastest framework for building websites.",
            "repoUrl" => "https://github.com/gohugoio/hugo",
            "currentPeriodGrowth" => "732",
            "pastPeriodGrowth" => "773",
            "growthPop" => "-5.30",
            "rankPop" => "0",
            "total" => "86092",
            "currentPeriodRank" => "2",
            "pastPeriodRank" => "2",
          },
        ],
      }

      # 添加基于不同时间段的假数据变化
      if period == "last-7-days"
        sample_data["data"].each do |repo|
          repo["currentPeriodGrowth"] = (repo["currentPeriodGrowth"].to_i * 0.4).to_i.to_s
          repo["growthPop"] = (repo["growthPop"].to_f * 0.5).round(2).to_s
        end
      elsif period == "last-24-hours"
        sample_data["data"].each do |repo|
          repo["currentPeriodGrowth"] = (repo["currentPeriodGrowth"].to_i * 0.05).to_i.to_s
          repo["growthPop"] = (repo["growthPop"].to_f * 0.1).round(2).to_s
        end
      end

      # 转换API数据为前端需要的格式
      if category_id.present?
        # 过滤匹配当前类别的仓库
        filtered_data = sample_data["data"].select { |repo| repo["collectionId"] == category_id }

        # 将API返回数据转换为前端需要的格式
        filtered_data.map do |repo|
          {
            rank: repo["currentPeriodRank"].to_i,
            name: repo["repoName"],
            description: repo["description"],
            starIncrease: repo["currentPeriodGrowth"].to_i,
            totalStars: repo["total"].to_i,
            growthRate: repo["growthPop"].to_f.abs.round(2),
            growthIsPositive: repo["growthPop"].to_f >= 0,
            rankChange: repo["rankPop"].to_i,
          }
        end
      else
        # 无类别ID时返回空数组
        []
      end
    end

    def fetch_category_data
      # 实际环境中应该调用外部API
      # username = SiteSetting.anf_api_username
      # password = SiteSetting.anf_api_password

      # 在实际应用中，应该调用实际的API
      # 但此处使用示例数据模拟
      sample_data = {
        "code" => 0,
        "msg" => "success",
        "data" => [
          { "id" => "w7plMu69o1", "name" => "Static Site Generator" },
          { "id" => "eJ1Z6eIMp5", "name" => "Low Code Development Tool" },
          { "id" => "lqeR4oSZJo", "name" => "Business Intelligence" },
          { "id" => "bJN1MDhWql", "name" => "Artificial Intelligence" },
          { "id" => "zJyYwZHPJK", "name" => "Web3" },
          { "id" => "bqjKz3TOJe", "name" => "Computer Science Courses" },
          { "id" => "PqazBdUWJl", "name" => "MLOps Tools" },
          { "id" => "XpZDPxCaqL", "name" => "Kubernetes Tooling" },
          { "id" => "yJnjRgT5JL", "name" => "Virtual Reality" },
          { "id" => "V97MoKurJ0", "name" => "Robotics" },
          { "id" => "zJyY7ZTPJK", "name" => "ChatGPT Alternatives" },
          { "id" => "o9bkOlTlqy", "name" => "LLM Tools" },
          { "id" => "GJKyNlcg9B", "name" => "Vector Search Engine" },
          { "id" => "59xgWaFGpm", "name" => "ChatGPT Apps" },
          { "id" => "WpBe7ltaJL", "name" => "Stable Diffusion Ecosystem" },
          { "id" => "bpVV67CZpx", "name" => "LLM DevTools" },
        ],
      }

      # 将API数据转换为前端需要的格式
      sample_data["data"].map { |category| { id: category["id"], name: category["name"] } }
    end

    private

    def ensure_authenticated
      raise StandardError, "Not authenticated, call login first" unless @access_token
    end

    def auth_header
      { "Authorization" => "Bearer #{@access_token}" }
    end

    def handle_response(response)
      case response.code.to_i
      when 200
        json_response = JSON.parse(response.body)
        if json_response["code"] == 0 && json_response["msg"] == "success"
          json_response
        else
          raise StandardError, "API returned error: #{json_response["msg"]}"
        end
      when 401
        raise StandardError, "Unauthorized: Invalid or expired token"
      when 404
        raise StandardError, "Resource not found"
      else
        raise StandardError, "API request failed with status #{response.code}"
      end
    end
  end
end
