class Main extends React.Component {
  constructor() {
    super()
    this.state = {
      jobs: []
    }
    this.handleNewJob = this.handleNewJob.bind(this)
    this.handleJobDelete = this.handleJobDelete.bind(this)
    this.handleJobUpdate = this.handleJobUpdate.bind(this)
  }

  componentDidMount() {
    $.getJSON('/api/v1/jobs.json', (response) => { this.setState({ jobs: response }) })
    window.addEventListener('resize', this.handleResize.bind(this))
    window.addEventListener('load', this.handleResize.bind(this))
  }

  handleResize() {
    window.innerWidth < 768 ? this.setState({ small: true }) : this.setState({ small: false })
  }

  render () {
    return (
      <div>
        <Nav small={this.state.small} user_email={this.props.user_email}
             jobs={this.state.jobs} handleJobClick={this.handleJobClick.bind(this)}/>
        <div>
          <div className='container-fluid'>
            <div className='row'>
              <Sidebar jobs={this.state.jobs} handleJobClick={this.handleJobClick.bind(this)}/>
              <div className='col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main'>
                <div>
                  {this.jobsToDisplay()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  handleJobClick(e, job) {
    e.preventDefault();
    this.setState({jobToDisplay: job})
  }

  jobsToDisplay() {
    if (this.state.jobToDisplay) {
      return <Job key={this.state.jobToDisplay.id} id={this.state.jobToDisplay.id} job={this.state.jobToDisplay}
                  handleUpdate={this.handleJobUpdate.bind(this)} handleDelete={this.handleJobDelete.bind(this, this.state.jobToDisplay.id)} />
    }
    return (
      <div>
        <h3>Add a new job</h3>
        <JobForm handleNewJob={this.handleNewJob.bind(this)} /> 
      </div>
    ) 
  }

  handleJobUpdate(job) {
    $.ajax({
      url: `api/v1/jobs/${job.id}`,
      method: 'PUT',
      data: { job: job },
      success: () => {
        this.updateJobs(job)
      }
    })
  }

  updateJobs(job) {
    var jobs = this.state.jobs.filter(oldJob => oldJob.id != job.id)
    jobs.push(job)
    this.setState({jobs: jobs, jobToDisplay: job})
  }

  handleJobDelete(id) {
    var result = confirm('Are you sure? This will delete the job and all associated entries.')
    if (result) {
      $.ajax({
        url: `api/v1/jobs/${id}`,
        method: 'DELETE',
        dataType: 'JSON',
        success: () => {
          this.removeDeletedJob(id)
        }
      })
    }
  }

  removeDeletedJob(id) {
    var newJobs = this.state.jobs.filter((job) => job.id != id)
    this.setState({ jobs: newJobs, jobToDisplay: null })
  }

  handleNewJob(job) {
    var newState = this.state.jobs.concat(job)
    this.setState({ jobs: newState, jobToDisplay: job })
  }  
}

Main.propTypes = {
  user_email: React.PropTypes.string
}
