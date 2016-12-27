web: bundle exec puma -C config/puma.rb
redis: redis-server
resque: env TERM_CHILD=1 bundle exec rake resque:work QUEUE='*'
webpack: (cd app/client && npm start)
