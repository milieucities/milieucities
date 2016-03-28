class StaticPagesController < ApplicationController

  def home
  end

  def events
  end

  def map
  end

  def submitSurvey
    name = params[:name].to_s if params[:name]
    city = params[:city].to_s if params[:city]
    hood = params[:hood].to_s if params[:hood]
    suggestion = params[:suggestion].to_s if params[:suggestion]
    terms = params[:terms] if params[:terms]

    saveToFirebase(name, city, hood, suggestion, terms)
  end


  private

    def saveToFirebase(name, city, hood, suggestion, terms)
      base_uri = 'https://milieu.firebaseio.com/'
      firebase = Firebase::Client.new(base_uri, ENV['FIREBASE_SECRET'])
      firebase.request.connect_timeout = 150

      if name && city && hood && suggestion && terms

        response = firebase.set("visits/"+name, {
          :fullName => name,
          :city => city,
          :neighbourhood => hood,
          :suggestion => suggestion,
          :created => Firebase::ServerValue::TIMESTAMP
        })

        if response
          redirect_to dev_sites_path, notice: "Thank you " + name + ". Welcome to Milieu."
        end


      else
        redirect_to root_path, notice: "Fill out the form first"
      end


    end
end
