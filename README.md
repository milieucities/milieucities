# Milieu

[![Codeship Status for Milieucitiesrepo/m-server](https://codeship.com/projects/35ebcc50-1fd6-0134-d851-7a39504521c1/status?branch=master)](https://codeship.com/projects/160460)

### Installation & Usage
#### Start dev env without docker compose

1. Clone the repository to your local machine: `git clone https://github.com/Milieucities/m-server`.

2. Bundle the gemfile `bundle install`. Note you may have to install bundler `gem install bundler`.

3. a(Optional) Either download and start up a postgre db

   b(Optional) Or start up a docker postgres db with command if you familiar with docker

   ```docker run --name postgresDb -p 5432:5432 -e POSTGRES_PASSWORD=somepassword -d postgres````

   where `somepassword` is the password you use for postgres and set in the `config/database.yml` file
   in Step 4

   When ever you want to nuke the postgres db, run

   ```docker stop postgresDb && docker rm postgresDb```

4. Set up your `config/database.yml` to configure with postgres and run `rake db:create db:migrate db:seed` and if you just want to reset database `rake db:reset` it should run all commands above with db:drop as first.

5. a(Optional) Either download and start up a redis

   b(Optional) Or start up a docker redis with command if you familiar with docker

   ```docker run --name redis -p 6379:6379 -d redis````

   When ever you want to nuke the postgres db, run

   ```docker stop redis && docker rm redis```

5. Install node packages `npm install`.

6. You're done! Run `foreman start` or `heroku local`

7. Run the `rake sync_devsites` to get some devsites. Whenever you feel the devsites are enough,
run Ctrl+C to stop the process.  Now you're ready to start developing!

### Start dev env with docker compose (Temporarily not work)

1. Install Docker on Mac, Linux or Windows 10 (Windows 7, 8 installation is pretty complex)

2. Clone the repository to your local machine: `git clone https://github.com/Milieucities/m-server`.

3. Set up your `.env` and `config/database.yml`. See the .example file as the example.

4. Go to your local repository directory and build docker image: `docker-compose build`.

5. Start with `docker-compose up`.

6. Open another terminal to run `docker-compose run web rake db:create` & `docker-compose run web rake db:migrate` & `docker-compose run web rake db:seed`

### Deployment steps

to deploy

Merge master into production: `git push origin master:production`
SSH into production server: `ssh rails@milieu.io`
Log in as the root user: `su -`
Go the to m-server directory: `cd /home/rails/m-server`
Pull the production code: `git pull origin production`
Migrate: `rake db:migrate`
Compile the node code: `npm start`
Compile all the assets: `rake assets:precompile`
Restart unicorn: `service unicorn restart`