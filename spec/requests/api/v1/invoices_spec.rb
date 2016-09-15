require 'rails_helper'

describe 'invoices requests', type: :request do
  let(:user) { create :user }
  let(:job) { create :job, user: user }
  let(:time_entry) { create :time_entry, job: job, date: '2016-09-15' }

  let(:invoice_params) do
    {
      job_id: job.id,
      start_date: '2016-09-15',
      end_date: '2016-09-15'
    }
  end

  describe 'GET api/v1/invoices' do
    subject do
      get(
        api_v1_invoices_url,
        invoice: invoice_params
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
      example { expect(subject.headers['Content-Type']).to eq('application/pdf') }

      context 'with missing params' do
        let(:invoice_params) {}
        example { expect(subject.response_code).to eq(400) }
        example { expect(JSON.parse(subject.body)['errors'][0]['code']).to eq('PARAM_IS_MISSING_OR_THE_VALUE_IS_EMPTY_INVOICE') }
      end

      context 'for a job that does not exist' do
        let(:invoice_params) do
          {
            job_id: 1000,
            start_date: '2016-09-15',
            end_date: '2016-09-15'
          }
        end

        example { expect(subject.response_code).to eq(404) }
        example { expect(JSON.parse(subject.body)['errors'][0]['code']).to eq('COULDN_T_FIND_JOB_WITH_WHERE_JOBS_USER_ID_AND_JOBS_ID') }
      end
    end
  end
end
