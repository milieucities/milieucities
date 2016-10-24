FROM ruby:2.3.0
RUN apt-get update -qq && apt-get install -y build-essential

# for postgres
RUN apt-get install -y libpq-dev

# for nokogiri
RUN apt-get install -y libxml2-dev libxslt1-dev

# for capybara-webkit
RUN apt-get install -y libqt4-webkit libqt4-dev xvfb

# for a JS runtime
RUN apt-get install -y nodejs

ENV APP_HOME /milieu
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

ENTRYPOINT [ "/milieu/entrypoint.sh" ]
CMD [ "/milieu/start.sh" ]
EXPOSE 3000

#ADD Gemfile Gemfile.lock $APP_HOME/

#RUN bundle install

ADD . $APP_HOME
