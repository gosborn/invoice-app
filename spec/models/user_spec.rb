require 'rails_helper'

RSpec.describe User, type: :model do
  example { expect(subject).to be_an(ActiveRecord::Base) }
  
  describe 'schema' do
    describe 'columns' do
      describe 'id' do
        example do
          expect(subject).to have_db_column(:id).
            of_type(:integer).with_options(null: false)
        end
      end

      describe 'created_at' do
        example do
          expect(subject).to have_db_column(:created_at).
            of_type(:datetime).with_options(null: false)
        end
      end

      describe 'updated_at' do
        example do
          expect(subject).to have_db_column(:updated_at).
            of_type(:datetime).with_options(null: false)
        end
      end

      describe 'email' do
        example do
          expect(subject).to have_db_column(:email).
            of_type(:string)
        end
      end

      describe 'validation' do
        describe 'email' do
          let(:model) { User.create(email: 'an email') }
          example { expect(model).to validate_presence_of(:email) }
          example { expect(model).to validate_uniqueness_of(:email).case_insensitive }
        end
      end
    end
  end
end
