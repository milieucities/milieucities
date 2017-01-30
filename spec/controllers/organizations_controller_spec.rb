require 'spec_helper'

describe OrganizationsController do
  let(:user) { create(:user) }
  let(:other_user) { create(:user) }
  let(:org1) { create(:organization) }
  let(:org2) { create(:organization) }
  let(:org3) { create(:organization) }

  before :each do
    user.memberships.create(organization_id: org1.id, admin: true)
    user.memberships.create(organization_id: org2.id, admin: false)
    other_user.memberships.create(organization_id: org3.id, admin: false)
    sign_in user
  end

  describe '#index' do
    it 'should render index template for html request' do
      get :index, user_slug: user.slug

      expect(response).to render_template(:index)
    end

    it 'should return user organizations as json for json request' do
      get :index, user_slug: user.slug, format: :json

      result = JSON.parse(response.body)

      expect(result.count).to eq(2)
      expect(result[0]['name']).to eq(org1.name)
      expect(result[1]['name']).to eq(org2.name)
    end
  end

  describe '#show' do
    it 'should return organization members as json' do
      get :show, user_slug: user.slug, id: org1.id, format: :json

      result = JSON.parse(response.body)

      expect(result['members'].count).to eq(1)
      expect(result['members'][0]['email']).to eq(user.email)
    end
  end

  describe '#create' do
    let(:valid_params) { attributes_for(:organization) }

    context 'valid params' do
      it 'should create organization with current user as admin' do
        post :create, user_slug: user.slug, organization: valid_params, format: :json

        new_organization = user.organizations.last
        membership = new_organization.memberships.last

        expect(response.status).to eq(201)
        expect(new_organization.name).to eq(valid_params[:name])
        expect(membership.user_id).to eq(user.id)
        expect(membership.admin).to be true
      end
    end

    context 'invalid params' do
      it 'should return the error message' do
        post :create, user_slug: user.slug, organization: { name: '' }, format: :json

        expect(response.status).to eq(422)
      end
    end
  end

  describe '#update' do
    context 'valid params' do
      it 'should add the user to the organization' do
        valid_params = { user: { email: other_user.email } }

        patch :update, user_slug: user.slug, id: org1.id, organization: valid_params

        expect(response.status).to eq(200)
        expect(org3.users).to include(other_user)
      end
    end

    context 'email is not associated with any user account' do
      it 'should return an error message' do
        invalid_params = { user: { email: 'random@email.com' } }

        patch :update, user_slug: user.slug, id: org1.id, organization: invalid_params

        result = JSON.parse(response.body)
        expected_message = 'There is no user with this email address'

        expect(response.status).to eq(200)
        expect(result['message']).to eq(expected_message)
      end
    end
  end
end
