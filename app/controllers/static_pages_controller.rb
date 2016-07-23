class StaticPagesController < ApplicationController

  def home
    @no_header = true
    respond_to do |format|
      format.html
      format.json { head :no_content }
    end
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
    message = params.required(:contact_milieu).permit(:name, :email, :message)
    ContactMailer.contact_milieu(message).deliver_now
    render nothing: true
  end

  def contact_file_lead
    message = params.required(:contact_file_lead).permit(:name, :email, :message, :dev_site_id)
    ContactMailer.contact_file_lead(message).deliver_now
    render nothing: true
  end

  def contact_councillor
    message = params.required(:contact_councillor).permit(:name, :email, :message, :dev_site_id)
    ContactMailer.contact_councillor(message).deliver_now
    render nothing: true
  end

  def privacy
  end

  def tos
  end

  def about
  end

<<<<<<< HEAD

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

=======
>>>>>>> master
end
