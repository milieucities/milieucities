class NoumeaController < ApplicationController
  def index
    @no_header = true
  end

  def submit_survey
	  respond_to do |format|
	    format.html
	    format.json
	  end
	end
end
