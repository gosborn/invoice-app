require 'rails_helper'

RSpec.describe TimeEntry, type: :model do
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

      describe 'summary' do
        example do
          expect(subject).to have_db_column(:summary).
            of_type(:text)
        end
      end

      describe 'date' do
        example do
          expect(subject).to have_db_column(:date).
            of_type(:date)
        end
      end

      describe 'job_id' do
        example do
          expect(subject).to have_db_column(:job_id).of_type(:integer)
        end
      end
    end

    describe 'indices' do
      describe 'job' do
        example { expect(subject).to have_db_index(:job_id) }
      end
    end

    describe 'associations' do
      describe 'job' do
        example { expect(subject).to belong_to(:job) }
      end
    end
  end
end
