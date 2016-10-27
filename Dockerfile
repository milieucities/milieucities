FROM ruby:2.3.0

# for heroku cli
RUN apt-get install -y wget
RUN echo "deb http://toolbelt.heroku.com/ubuntu ./" > /etc/apt/sources.list.d/heroku.list \
&& wget -O- https://toolbelt.heroku.com/apt/release.key | apt-key add -

RUN apt-get update
RUN apt-get install -y heroku-toolbelt

# prepare
RUN apt-get install -y build-essential

# for postgres
RUN apt-get install -y libpq-dev

# for nokogiri
RUN apt-get install -y libxml2-dev libxslt1-dev

# for capybara-webkit
RUN apt-get install -y libqt4-webkit libqt4-dev xvfb

# for a JS runtime
RUN apt-get install -y nodejs

# for npm
RUN apt-get install -y npm

ENV APP_HOME /milieu
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

#ENTRYPOINT [ "/milieu/entrypoint.sh" ]
#CMD [ "/milieu/start.sh" ]
EXPOSE 3000

ADD . $APP_HOME

ADD Gemfile Gemfile.lock $APP_HOME/

RUN bundle install
