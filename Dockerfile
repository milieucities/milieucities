FROM ubuntu:14.04
RUN rm /bin/sh && ln -s /bin/bash /bin/sh
FROM ruby:2.3.0
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get install -y nodejs
RUN mkdir /m-server
WORKDIR /m-server
ADD Gemfile /m-server/Gemfile
ADD Gemfile.lock /m-server/Gemfile.lock
RUN bundle install
ADD . /m-server
RUN gem install bundler


