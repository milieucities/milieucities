# config valid only for current version of Capistrano
lock '3.7.1'

set :repo_url, 'git@github.com:Milieucitiesrepo/m-server.git'
set :application, 'm-server'
set :deploy_to, "/home/rails/#{fetch(:application)}"
set :use_sudo, false
set :deploy_via, :remote_cache
set :ssh_options, { forward_agent: true }
set :keep_releases, 5
set :rvm_ruby_version, '2.3.0'
set :pty, true
set :linked_files, fetch(:linked_files, []).push('config/database.yml')
set :resque_environment_task, true

namespace :git do
  task :pull do
    on roles(:app) do
      execute "cd #{fetch(:deploy_to)} && git pull origin #{fetch(:branch)}"
    end
  end
end

namespace :npm do
  task :install do
    on roles(:app) do
      execute "cd #{fetch(:deploy_to)} && npm install --unsafe-perm"
    end
  end

  task :start do
    on roles(:app) do
      execute "cd #{fetch(:deploy_to)} && npm start"
    end
  end
end

namespace :unicorn do
  task :restart do
    on roles(:web) do
      execute :service, 'unicorn restart'
    end
  end
end

after 'git:update', 'git:pull'
before 'deploy:assets:precompile', 'npm:install'
after 'npm:install', 'npm:start'
after 'deploy:published', 'unicorn:restart'
after 'deploy:published', 'resque:restart'
