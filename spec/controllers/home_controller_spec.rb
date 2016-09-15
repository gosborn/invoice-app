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
      login_as { user }

      before do
        get :index
      end

      it 'returns 200' do
        expect(response.status).to eq(200)
      end
    end
  end
end
