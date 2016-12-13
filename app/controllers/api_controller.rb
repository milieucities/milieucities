class ApiController < ActionController::API
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :exception
  before_action :authenticate_request, :if => :is_json
  before_action :set_locale
  before_action :current_user

  #include SessionsHelper

  rescue_from CanCan::AccessDenied do |exception|
    respond_to do |format|
      format.json { render json: {}, status: 403 }
    end
  end

  def default_url_options(options = {})
    { locale: I18n.locale }.merge options
  end

  def set_locale
    I18n.locale = params[:locale] || I18n.default_locale
  end

  def is_json
    request.format.json?
  end

  attr_reader :current_user

  private

  def authenticate_request
    @current_user = AuthorizeApiRequest.call(request.headers).result
    render json: {error: 'Not Authorized' }, status: 401 unless @current_user
  end
end
