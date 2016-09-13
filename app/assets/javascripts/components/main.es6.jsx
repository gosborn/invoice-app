class Main extends React.Component {
  constructor() {
    super()
    this.state = {
      jobs: []
    }
    this.handleNewRecord = this.handleNewRecord.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  render () {
    var jobs = this.state.jobs.map((job) => { 
        return (
          <li key={job.id}><a href="#" onClick={(e) => this.handleClick(e, job)}><strong>{job.title}</strong></a></li>
        ) 
    });

    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-3 col-md-2 sidebar">
              <ul className="nav nav-sidebar">
                <li><a href="#" onClick={(e) => this.handleClick(e, null)}><h4>Your Jobs</h4></a></li>
                {jobs}
                <li><a href="#" onClick={(e) => this.handleClick(e, null)}><span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Add a new job</a></li>
              </ul> 
            </div>
          </div>
          <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
            <div>
              {this.jobsToDisplay()}
            </div>
          </div>
        </div>
      </div>
    )
  }

  jobsToDisplay() {
    if (this.state.jobToDisplay) {
      return <Job key={this.state.jobToDisplay.id} id={this.state.jobToDisplay.id} job={this.state.jobToDisplay} handleDelete={this.handleDelete.bind(this, this.state.jobToDisplay.id)} handleUpdate={this.handleUpdate.bind(this)}/>
    }

    return (
      <div>
        <h3>Add a new job.</h3>
        <JobForm handleNewRecord={this.handleNewRecord.bind(this)}/> 
      </div>
    ) 
  }

  handleClick(e, job) {
    e.preventDefault();
    this.setState({jobs: this.state.jobs, jobToDisplay: job})
    console.log(this.state)
  }


  componentDidMount() {
    $.getJSON('/api/v1/jobs.json', (response) => { this.setState({ jobs: response }) });
  }

  handleNewRecord(job) {
    var newState = this.state.jobs.concat(job);
    this.setState({ jobs: newState, jobToDisplay: job })
    console.log(this.state)
  }

  handleDelete(id) {
    $.ajax({
      url: `api/v1/jobs/${id}`,
      method: 'DELETE',
      dataType: 'JSON',
      success: () => {
        this.removeItemClient(id)
      }
    })
  }

  removeItemClient(id) {
    var newJobs = this.state.jobs.filter((job) => {
      return job.id != id;
    })

    this.setState({ jobs: newJobs, jobToDisplay: null })
  }

  handleUpdate(job) {
    $.ajax({
      url: `api/v1/jobs/${job.id}`,
      method: 'PUT',
      data: { job: job },
      success: () => {
        this.updateItems(job)
      }
    })
  }

  updateItems(job) {
    var jobs = this.state.jobs.filter((i) => { return i.id != job.id})
    jobs.push(job)

    this.setState({jobs: jobs, jobToDisplay: job})
  }
}

Main.propTypes = {
  user_email: React.PropTypes.string
}

