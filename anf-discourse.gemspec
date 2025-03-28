# frozen_string_literal: true

Gem::Specification.new do |s|
  s.name        = "anf-discourse"
  s.version     = "0.0.1"
  s.authors     = ["Your Name"]
  s.email       = ["your.email@example.com"]
  s.summary     = "ANF Dashboard for Discourse"
  s.description = "Adds an ANF Dashboard to Discourse with API integrations"
  s.license     = "MIT"
  s.files       = Dir["lib/**/*", "app/**/*", "config/**/*", "assets/**/*"]
  
  s.add_dependency "httparty", "~> 0.21.0"
end 