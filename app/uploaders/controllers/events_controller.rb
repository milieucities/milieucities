class EventsController < ApplicationController
  before_action :set_event, only: [:show, :edit, :update, :destroy, :images]

  def index
    @events = Event.all

    respond_to do |format|
        format.html
        format.json
    end
  end

  def geojson

    @geojson = []

    Event.all.each do |event|
      @geojson << {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [event.geocode_lon, event.geocode_lat]
        },
        properties: {
          id: event.id,
          zoom: 9,
          title: event.title,
          address: event.location,
          :'marker-symbol' => "event",
          description: "<div class=\"marker-title\"><a href=\"/#{params[:locale]}/events/#{event.id}\">#{event.title}</a></div>"
        }
      }
    end

    render json: @geojson
  end

  def show
    @locale = params[:locale]
    if current_user
      @comments = @event.comments.build
    end
  end

  def new
    @event = Event.new
  end

  def edit
  end

  def images
    render json: { images: @event.image_hash }
  end

  def create
    @event = Event.new(event_params)

    respond_to do |format|
      if @event.save
        format.html { redirect_to @event, notice: 'Event was successfully created.' }
        format.json { render :show, status: :created, location: @event }
      else
        flash.now[:alert] = 'All required fields must be submitted.'
        format.html { render :new }
        format.json { render json: @event.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @event.update(event_params)
        format.html { redirect_to @event, notice: 'Event was successfully updated.' }
        format.json { render :show, status: :ok, location: @event }
      else
        flash.now[:alert] = 'All required fields must be submitted.'
        format.html { render :edit }
        format.json { render json: @event.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @event.destroy
    respond_to do |format|
      format.html { redirect_to map_url, notice: 'Event was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    def set_event
      @event = Event.find(params[:id])
    end

    def event_params
      params.require(:event).permit(:title, :description, :time, :date, :images_cache, :location, :contact_email, :contact_tel, images: [])
    end
end
