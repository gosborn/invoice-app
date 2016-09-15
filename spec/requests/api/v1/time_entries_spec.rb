require 'rails_helper'

describe 'time_entry requests', type: :request do
  let(:user) { create :user }
  let(:job) { create :job, user: user }
  let!(:time_entry) { create :time_entry, job: job, date: '2016-09-15' }

  let(:time_entry_params) do
    {
      date: '2016-09-16',
      time_spent: 200,
      summary: 'wrote specs'
    }
  end

  describe 'GET api/v1/jobs/:id/time_entries' do
    subject do
      get(
        api_v1_job_time_entries_url(job.id)
      )
      response
    end

    context 'without an active user session' do
      example { expect(subject.response_code).to eq(401) }
    end

    context 'with an active user session' do
      def login(user)
        post_via_redirect user_session_path, 'user[email]' => user.email, 'user[password]' => 'password567'
      end

      before { login(user) }

      example { expect(subject.response_code).to eq(200) }
      example { expect(JSON.parse(subject.body).size).to eq(1) }
    end
  end

  describe 'POST api/v1/jobs/:id/time_entries' do
    subject do
      post(
        api_v1_job_time_entries_url(job.id),
        time_entry: time_entry_params
      )
      response
    end

    context 'without an active user session' do
      example { expect(subject.response_code).to eq(401) }
    end

    context 'with an active user session' do
      def login(user)
        post_via_redirect user_session_path, 'user[email]' => user.email, 'user[password]' => 'password567'
      end

      before { login(user) }

      describe 'the response' do
        example { expect(subject.response_code).to eq(200) }
        example { expect(JSON.parse(subject.body)['date']).to eq(time_entry_params[:date]) }
        example { expect(JSON.parse(subject.body)['time_spent']).to eq(time_entry_params[:time_spent]) }
        example { expect(JSON.parse(subject.body)['summary']).to eq(time_entry_params[:summary]) }
      end

      describe 'the time entry should persist in the database' do
        example do
          subject
          expect(TimeEntry.all.size).to eq(2)
        end
      end

      describe 'without valid parameters' do
        let(:time_entry_params) {}
        example { expect(subject.response_code).to eq(400) }
        example { expect(JSON.parse(subject.body)['errors'][0]['code']).to eq('PARAM_IS_MISSING_OR_THE_VALUE_IS_EMPTY_TIME_ENTRY') }
      end
    end
  end

  describe 'PUT api/v1/jobs/:id/time_entries/:time_entry_id' do
    subject do
      put(
        api_v1_job_time_entry_url(job.id, time_entry.id),
        time_entry: time_entry_params
      )
      response
    end

    let(:time_entry_params) do
      {
        id: time_entry.id,
        date: '2016-09-14',
        time_spent: 200,
        summary: 'wrote some more specs'
      }
    end

    context 'without an active user session' do
      example { expect(subject.response_code).to eq(401) }
    end

    context 'with an active user session' do
      def login(user)
        post_via_redirect user_session_path, 'user[email]' => user.email, 'user[password]' => 'password567'
      end

      before { login(user) }

      describe 'the response' do
        example { expect(subject.response_code).to eq(200) }
        example { expect(JSON.parse(subject.body)['date']).to eq(time_entry_params[:date]) }
        example { expect(JSON.parse(subject.body)['time_spent']).to eq(time_entry_params[:time_spent]) }
        example { expect(JSON.parse(subject.body)['summary']).to eq(time_entry_params[:summary]) }
      end

      describe 'the request should not change the number of entries in the database' do
        example do
          subject
          expect(TimeEntry.all.size).to eq(1)
        end
      end

      describe 'without valid parameters' do
        let(:time_entry_params) {}
        example { expect(subject.response_code).to eq(400) }
        example { expect(JSON.parse(subject.body)['errors'][0]['code']).to eq('PARAM_IS_MISSING_OR_THE_VALUE_IS_EMPTY_TIME_ENTRY') }
      end

      describe 'without valid a valid id' do
       let(:time_entry_params) do
          {
            id: 1000,
            date: '2016-09-14',
            time_spent: 200,
            summary: 'wrote some more specs'
          }
        end

        example { expect(subject.response_code).to eq(404) }
        example { expect(JSON.parse(subject.body)['errors'][0]['code']).to eq('COULDN_T_FIND_TIMEENTRY_WITH_WHERE_TIME_ENTRIES_JOB_ID_AND_TIME_ENTRIES_ID') }
      end
    end
  end

  describe 'DELETE api/v1/jobs/:id/time_entries/:time_entry_id' do
    subject do
      delete(
        api_v1_job_time_entry_url(job.id, id)
      )
      response
    end

    let(:id) { time_entry.id }

    context 'without an active user session' do
      example { expect(subject.response_code).to eq(401) }
    end

    context 'with an active user session' do
      def login(user)
        post_via_redirect user_session_path, 'user[email]' => user.email, 'user[password]' => 'password567'
      end

      before { login(user) }

      describe 'the response' do
        example { expect(subject.response_code).to eq(204) }
      end

      describe 'the request should change the number of entries in the database' do
        example { expect { subject }.to change { TimeEntry.all.size }.by(-1) }
      end

      describe 'without valid a valid id' do
        let(:id) { 1000 }

        example { expect(subject.response_code).to eq(404) }
        example { expect(JSON.parse(subject.body)['errors'][0]['code']).to eq('COULDN_T_FIND_TIMEENTRY_WITH_WHERE_JOBS_USER_ID_AND_TIME_ENTRIES_ID') }
        example { expect { subject }.to change { TimeEntry.all.size }.by(0) }
      end
    end
  end
end
