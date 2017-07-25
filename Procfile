web: (bundle exec puma -C config/puma.rb && node server.js)
resque: env TERM_CHILD=1 bundle exec rake resque:work QUEUE='*'
webpack: (cd app/client && npm install && npm start)
