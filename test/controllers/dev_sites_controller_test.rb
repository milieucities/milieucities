require 'test_helper'

class DevSitesControllerTest < ActionController::TestCase
  setup do
    @dev_site = dev_sites(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:dev_sites)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create dev_site" do
    assert_difference('DevSite.count') do
      post :create, dev_site: { address: @dev_site.address, application_type: @dev_site.application_type, description: @dev_site.description, devID: @dev_site.devID, lat: @dev_site.lat, long: @dev_site.long, title: @dev_site.title, ward_name: @dev_site.ward_name, ward_num: @dev_site.ward_num }
    end

    assert_redirected_to dev_site_path(assigns(:dev_site))
  end

  test "should show dev_site" do
    get :show, id: @dev_site
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @dev_site
    assert_response :success
  end

  test "should update dev_site" do
    patch :update, id: @dev_site, dev_site: { address: @dev_site.address, application_type: @dev_site.application_type, description: @dev_site.description, devID: @dev_site.devID, lat: @dev_site.lat, long: @dev_site.long, title: @dev_site.title, ward_name: @dev_site.ward_name, ward_num: @dev_site.ward_num }
    assert_redirected_to dev_site_path(assigns(:dev_site))
  end

  test "should destroy dev_site" do
    assert_difference('DevSite.count', -1) do
      delete :destroy, id: @dev_site
    end

    assert_redirected_to dev_sites_path
  end
end
