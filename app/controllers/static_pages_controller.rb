class StaticPagesController < ApplicationController
  def home
  end
  def events

  end

  def demo
    @demo = Demo.new(:email => params[:email])
    respond_to do |format|
      if @demo.save
        format.html { render action: "home", notice: "Thank you. You'll be contacted shortly!" }
        format.json { render json: @demo, status: :created, location: @demo }
      else
        format.html { render action: "home", notice: "Email not added, try again" }
        format.json { render json: @demo.errors, status: :unprocessable_entity }
      end
    end
  end
end
