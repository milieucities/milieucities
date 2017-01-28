# config valid only for current version of Capistrano
lock '3.7.1'

set :repo_url, 'git@github.com:Milieucitiesrepo/m-server.git'
set :application, 'm-server'
set :deploy_to, "/home/rails/#{fetch(:application)}"
set :use_sudo, false
set :deploy_via, :remote_cache
set :ssh_options, { forward_agent: true }
set :keep_releases, 5
set :pty, true
set :linked_files, fetch(:linked_files, []).push('config/database.yml')
set :workers, { '*' => 5 }
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

# task :kill_resque do
#   on roles(:web) do
#     execute "kill $(ps aux | grep 'resque' | awk '{print $2}')"
#   end
# end
# after 'restart_unicorn', 'kill_resque'
#
# namespace :deploy do
#   task :start_resque do
#     on roles(:web) do
#       execute "cd #{deploy_to}; bundle exec rake resque:work QUEUE='*' PIDFILE=./tmp/pids/resque.pid BACKGROUND=yes env TERM_CHILD=1"
#     end
#   end
# end
# after 'kill_resque', 'deploy:start_resque'
