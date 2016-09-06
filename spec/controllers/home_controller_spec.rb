require 'rails_helper'

describe HomeController do

  describe 'GET index' do

    def make_request
      get :index
    end

    context 'when not logged in' do
      before { make_request }

      it 'returns redirect to login' do
        expect(response).to redirect_to('/users/sign_in')
      end
    end

    context 'when logged in' do
      let(:user) { FactoryGirl.create(:user) }

      before do
        login_as user
        make_request
      end

      it 'returns 302' do
        expect(response.status).to eq(302)
      end

      it 'renders correct template' do
        expect(response).to render_template(:index)
      end
    end
  end
end
