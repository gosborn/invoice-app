require 'rails_helper'

describe 'jobs requests', type: :request do
  let(:user) { create :user }
  let!(:job) { create :job, user: user }

  let(:job_params) do
    {
      title: 'some title',
      hourly_rate: 20.55,
      tax_rate: 8.2
    }
  end

  describe 'GET api/v1/jobs' do
    subject do
      get(
        api_v1_jobs_url
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

  describe 'POST api/v1/jobs' do
    subject do
      post(
        api_v1_jobs_url,
        job: job_params
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
        example { expect(JSON.parse(subject.body)['title']).to eq(job_params[:title]) }
        example { expect(JSON.parse(subject.body)['hourly_rate']).to eq(job_params[:hourly_rate]) }
        example { expect(JSON.parse(subject.body)['tax_rate']).to eq(job_params[:tax_rate]) }
      end

      describe 'the job should persist in the database' do
        example do
          subject
          expect(Job.all.size).to eq(2)
        end
      end

      describe 'without valid parameters' do
        let(:job_params) {}
        example { expect(subject.response_code).to eq(400) }
        example { expect(JSON.parse(subject.body)['errors'][0]['code']).to eq('PARAM_IS_MISSING_OR_THE_VALUE_IS_EMPTY_JOB') }
      end
    end
  end

  describe 'PUT api/v1/jobs' do
    subject do
      put(
        api_v1_job_url(job.id),
        job: job_params
      )
      response
    end

    let(:job_params) do
      {
        id: job.id,
        title: 'some title',
        hourly_rate: 20.55,
        tax_rate: 8.2
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
        example { expect(JSON.parse(subject.body)['title']).to eq(job_params[:title]) }
        example { expect(JSON.parse(subject.body)['hourly_rate']).to eq(job_params[:hourly_rate]) }
        example { expect(JSON.parse(subject.body)['tax_rate']).to eq(job_params[:tax_rate]) }
      end

      describe 'the request should not change the number of entries in the database' do
        example do
          subject
          expect(Job.all.size).to eq(1)
        end
      end

      describe 'without valid parameters' do
        let(:job_params) {}
        example { expect(subject.response_code).to eq(400) }
        example { expect(JSON.parse(subject.body)['errors'][0]['code']).to eq('PARAM_IS_MISSING_OR_THE_VALUE_IS_EMPTY_JOB') }
      end

      describe 'without valid a valid id' do
        let(:job_params) do
          {
            id: 1000,
            title: 'some title',
            hourly_rate: 20.55,
            tax_rate: 8.2
          }
        end

        example { expect(subject.response_code).to eq(404) }
        example { expect(JSON.parse(subject.body)['errors'][0]['code']).to eq('COULDN_T_FIND_JOB_WITH_WHERE_JOBS_USER_ID_AND_JOBS_ID') }
      end
    end
  end

  describe 'DELETE api/v1/jobs' do
    subject do
      delete(
        api_v1_job_url(id)
      )
      response
    end

    let(:id) { job.id }

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
        example { expect { subject }.to change { Job.all.size }.by(-1) }
      end

      describe 'without valid a valid id' do
        let(:id) { 1000 }

        example { expect(subject.response_code).to eq(404) }
        example { expect(JSON.parse(subject.body)['errors'][0]['code']).to eq('COULDN_T_FIND_JOB_WITH_WHERE_JOBS_USER_ID_AND_JOBS_ID') }
        example { expect { subject }.to change { Job.all.size }.by(0) }
      end
    end
  end
end
