# Milieu

[![Codeship Status for Milieucitiesrepo/m-server](https://codeship.com/projects/35ebcc50-1fd6-0134-d851-7a39504521c1/status?branch=master)](https://codeship.com/projects/160460)

### Installation & Usage
#### Start dev env without docker compose

1. Clone the repository to your local machine: `git clone https://github.com/Milieucities/m-server`.

2. Bundle the gemfile `bundle install`. Note you may have to install bundler `gem install bundler`.

3. Download and start up a postgressql db
Ask for `.env` files ask for `database.yml` file
`.env` goes to the root folder
`database.yml` goes to `/config`
Accordingly to database.yml you'll need to create user mainly postgres
`psql`
`CREATE USER postgres;`
`ALTER USER postgres with SUPERUSER`;

4. Set up your `config/database.yml`
to configure with postgres and run `rake db:create db:migrate db:seed` and if you just want to reset database `rake db:reset` it should run all commands above with db:drop as first.

if you have any problems with database that doesn't exist, you should be able to see error in terminal of rails saying what DB name is missing

based on that create one by running: `CREATE DATABASE missingName`

5. (good to have) Download and start up a redis

with this being said -> sooon moving to Docker is must have   

5. Install node packages `npm install`.

6. You're done! You have 2 options to run you development environment

1: is more encouraged to use to see what's going on

`npm start` in one tab of terminal, `rails s` in another one

2: these 2 commands below bundles everything from point above in  1 command
`foreman start` or `heroku local`

# on this point you should say Hooray, open the browser with whatever port your rails terminal say
Typically `localhost:3000`
and you good man or lady !

#. SYNCING AND SEEDING DEV_SITES if you need to ->
Run the `rake sync_devsites` to get some devsites. Whenever you feel the devsites are enough,
run Ctrl+C(even more times)to stop the process.  Now you're ready to start developing!
for more syncing options run `rake -T`

### CSS and SCSS stylesheets
Application's stylesheets are located in`/app/assets/stylesheets`
if you open `application.scss` you'll see what's being imported to the whole app  in `base` folder you see base styles being used

### Start dev env with docker compose (Temporarily doesn't work)

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
