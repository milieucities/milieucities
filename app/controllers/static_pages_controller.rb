class StaticPagesController < ApplicationController

  def home
    @no_header = true
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

  def contact_milieu
    ContactMailer.contact_milieu(params[:name], params[:email], params[:message]).deliver_now
    render nothing: true
  end

  def contact_file_lead
    ContactMailer.contact_file_lead(params[:name], params[:email], params[:message], params[:dev_site_id]).deliver_now
    render nothing: true
  end

  def contact_councillor
    ContactMailer.contact_councillor(params[:name], params[:email], params[:message], params[:dev_site_id]).deliver_now
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
      firebase.request.connect_timeout = 30

      if ottawa && hood

        response = firebase.push("visits/", {
          :ottawa => ottawa,
          :neighbourhood => hood,
          :created => Firebase::ServerValue::TIMESTAMP
        })

        if response
          redirect_to map_path, notice: "Thank you for sharing your ideas with us!"
        end


      else
        redirect_to root_path, notice: "Fill out the form first."
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
          redirect_to citizencity_path, notice: "Thank you for sharing your ideas with Citizen City 2016."
        end


      else
        redirect_to citizencity_path, notice: "Fill out the form first"
      end
    end

end
