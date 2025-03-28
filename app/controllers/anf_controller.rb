# frozen_string_literal: true

class AnfController < ApplicationController
  skip_before_action :check_xhr

  def index
    render html: "<h1>ANF Discourse插件测试页面</h1>".html_safe
  end
end
