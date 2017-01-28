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
