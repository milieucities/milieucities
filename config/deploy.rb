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

task :npm_install do
  on roles(:app) do
    execute "cd #{deploy_to} && npm install --unsafe-perm"
  end
end
before 'deploy:assets:precompile', 'npm_install'

task :npm_start do
  on roles(:app) do
    execute "cd #{deploy_to} && npm start"
  end
end
after 'npm_install', 'npm_start'

task :restart_unicorn do
  on roles(:web) do
    execute :service, 'unicorn restart'
  end
end
after 'deploy:published', 'restart_unicorn'

after 'deploy:published', 'resque:restart'
