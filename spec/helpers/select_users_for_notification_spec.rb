require 'spec_helper'

describe SelectUsersForNotification, type: :class do
  describe '#call' do
    before(:all) do
      @dev_site = create(:dev_site)
      @dev_site_address = create(:address, city: 'Guelph', lat: 45.418032, lon: -75.694835)
      @nearby_address = create(:address, city: 'Guelph', lat: 45.418033, lon: -75.694835)
      @faraway_address = create(:address, city: 'Toronto', lat: 48.418032, lon: -78.694835)
      @faraway_guelph_address_1 = create(:address, city: 'Guelph', lat: 48.418032, lon: -78.694835)
      @faraway_guelph_address_2 = create(:address, city: 'Guelph', lat: 47.418032, lon: -77.694835)
      @ottawa_address = create(:address, city: 'Ottawa', lat: 45.318356, lon: -75.665828)
      @secondary_address = create(:address, city: 'Guelph', lat: 45.418033, lon: -75.694835, primary_address: false)
      @planner = create(:contact, contact_type: Contact::PLANNER)
      @planner_user = create(:user, email: @planner.email_address)
      @milieu_user = create(:user, email: ApplicationMailer::MILIEU_EMAIL_ADDRESS)
      @dev_site.addresses << @dev_site_address
      @dev_site.contacts << @planner
      @user_1 = create(:user)
      @user_2 = create(:user)
      @user_3 = create(:user)
      @user_4 = create(:user)
      @user_5 = create(:user)
      @user_1.addresses << @nearby_address
      @user_2.addresses << @faraway_address
      @user_3.addresses << @faraway_guelph_address_1
      @user_4.addresses << @faraway_guelph_address_2
      @user_5.addresses << [@ottawa_address, @secondary_address]
      @user_3.notification_setting = create(:notification_setting, municipality_scope: true)
      @user_5.notification_setting = create(:notification_setting, secondary_address: true)

      @result = SelectUsersForNotification.new(@dev_site).call
    end

    after(:all) do
      User.destroy_all
      DevSite.destroy_all
      Address.destroy_all
    end

    context 'immediate proximity scope' do
      it 'should select user within 150m for notification' do
        expect(@result.result).to include(@user_1)
        expect(@result.result).to_not include(@user_2)
      end
    end

    context 'municipality scope' do
      it 'should select users in the same city that requested city notifications' do
        expect(@result.result).to include(@user_3)
        expect(@result.result).to_not include(@user_4)
      end
    end

    context 'secondary address scope' do
      it 'should select users with a secondary address within 150m for notification' do
        expect(@result.result).to include(@user_5)
      end
    end

    context 'base users' do
      it 'should always select milieu and planners for notificaiton' do
        expect(@result.result).to include(@planner_user)
        expect(@result.result).to include(@milieu_user)
      end
    end
  end
end
