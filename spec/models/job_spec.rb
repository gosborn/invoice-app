require 'rails_helper'

RSpec.describe Job, type: :model do
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

      describe 'title' do
        example do
          expect(subject).to have_db_column(:title).
            of_type(:string)
        end
      end

      describe 'hourly_rate' do
        example do
          expect(subject).to have_db_column(:hourly_rate).
            of_type(:float)
        end
      end

      describe 'tax_rate' do
        example do
          expect(subject).to have_db_column(:tax_rate).
            of_type(:float)
        end
      end

      describe 'user_id' do
        example do
          expect(subject).to have_db_column(:user_id).of_type(:integer)
        end
      end
    end

    describe 'indices' do
      describe 'user' do
        example { expect(subject).to have_db_index(:user_id) }
      end
    end

    describe 'associations' do
      describe 'user' do
        example { expect(subject).to belong_to(:user) }
      end

      describe 'time_entries' do
        example do
          expect(subject).to have_many(:time_entries)
        end
      end
    end
  end
end
