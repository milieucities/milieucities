class ContactsController < ApplicationController
  load_resource :dev_site
  load_and_authorize_resource :contact, through: :dev_site

  def create
    respond_to do |format|
      if @contact.save
        format.json { render json: @contact, status: :created }
      else
        format.json { render json: @contact.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @contact.update(contact_params)
        format.json { render json: @contact, status: :created }
      else
        format.json { render json: @contact.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @contact.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private

  def contact_params
    params.require(:contact)
          .permit(:id,
                  :contact_type,
                  :first_name,
                  :last_name,
                  :email_address,
                  :_destroy)
  end
end
