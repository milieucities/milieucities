class StaticPagesController < ApplicationController

  def home
  end

  def events
  end

  def map
  end

  def citizencity
    @no_header = true
  end

  def contact_citizencity
    ContactMailer.contact_citizencity(params[:name], params[:email], params[:message]).deliver_now
    render nothing: true
  end

  def about

  end

  def submitSurvey
    name = params[:ottawa].to_s if params[:ottawa]
    hood = params[:hood].to_s if params[:hood]
    saveToFirebase(name, hood)
  end

  def submitSurveyCitizen
    name = params[:ottawa].to_s if params[:ottawa]
    hood = params[:hood].to_s if params[:hood]
    saveToFirebaseCitizen(name, hood)
  end


  private

    def saveToFirebase(ottawa, hood)
      base_uri = 'https://milieu.firebaseio.com/'
      firebase = Firebase::Client.new(base_uri, ENV['FIREBASE_SECRET'])
      firebase.request.connect_timeout = 150

      if ottawa && hood

        response = firebase.push("visits/", {
          :ottawa => ottawa,
          :neighbourhood => hood,
          :created => Firebase::ServerValue::TIMESTAMP
        })

        if response
          redirect_to map_path, notice: "Thank you. Welcome to Milieu."
        end


      else
        redirect_to root_path, notice: "Fill out the form first"
      end
    end

    def saveToFirebaseCitizen(ottawa, hood)
      base_uri = 'https://milieu.firebaseio.com/'
      firebase = Firebase::Client.new(base_uri, ENV['FIREBASE_SECRET'])
      firebase.request.connect_timeout = 30

      if ottawa && hood

        response = firebase.push("visits/", {
          :ottawa => ottawa,
          :neighbourhood => hood,
          :created => Firebase::ServerValue::TIMESTAMP
        })

        if response
          redirect_to citizencity_path, notice: "Thank you. Welcome to Milieu."
        end


      else
        redirect_to citizencity_path, notice: "Fill out the form first"
      end
    end

end
