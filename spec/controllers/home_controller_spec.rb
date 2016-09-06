require 'rails_helper'

describe HomeController do
  describe 'GET index' do
    context 'when not logged in' do
      before { get :index }

      it 'returns redirect to login' do
        expect(response).to redirect_to('/users/sign_in')
      end
    end

    context 'when logged in' do
      let(:user) { create(:user) }

      before do
        login_as user
        get :index
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
