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

  listJobs(){
    return this.state.jobs.map((job) => { 
        return (
          <li key={job.id}><a href="#" onClick={(e) => this.handleClick(e, job)}><strong>{job.title}</strong></a></li>
        ) 
    })
  }

  jobLinks(){
    return (
      <ul className="nav nav-sidebar">
      <li><a href="#" onClick={(e) => this.handleClick(e, null)}><h4>Your Jobs</h4></a></li>
      {this.listJobs()}
      <li><a href="#" onClick={(e) => this.handleClick(e, null)}><span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Add a new job</a></li>
      </ul>
    )
  }

  bigHamburger(){
    return (
      <div id="navbar" className="navbar-collapse collapse">
        <ul className="nav navbar-nav navbar-right">
          <li><a href="#">{this.props.user_email}</a></li>
          <li><a data-method="delete" href="/users/sign_out" rel="nofollow">Sign out?</a></li>
        </ul>
      </div>
    )
  }

  smallHamburger(){
    return (
      <div id="navbar" className="navbar-collapse collapse">
        <ul className="nav navbar-nav navbar-right">
          <li><a href="#">{this.props.user_email}</a></li>
          <li><a data-method="delete" href="/users/sign_out" rel="nofollow">Sign out?</a></li>
          {this.listJobs()}
        </ul>
      </div>
    )
  }

  render () {
    var jobs = this.state.jobs.map((job) => { 
        return (
          <li key={job.id}><a href="#" onClick={(e) => this.handleClick(e, job)}><strong>{job.title}</strong></a></li>
        ) 
    });

    return (
      <div>
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" ariexpanded="false" aria-controls="navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">Invoice App</a>
            </div>
            {this.state.small ? this.smallHamburger() : this.bigHamburger() }
          </div>
        </nav>
        <div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-3 col-md-2 sidebar"> 
              {this.jobLinks()}
              </div>
            </div>
            <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
              <div>
                {this.jobsToDisplay()}
              </div>
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
        <h3>Add a new job</h3>
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
    window.addEventListener('resize', this.handleResize.bind(this));
    window.addEventListener('load', this.handleResize.bind(this));
  }

  handleResize(){
    if(window.innerWidth < 768){
      this.setState({ jobs: this.state.jobs, jobToDisplay: this.state.jobToDisplay, small: true, big: false})
    }
    else {
      this.setState({ jobs: this.state.jobs, jobToDisplay: this.state.jobToDisplay, small: false, big: true})
    }
  }

  handleNewRecord(job) {
    var newState = this.state.jobs.concat(job);
    this.setState({ jobs: newState, jobToDisplay: job })
    console.log(this.state)
  }

  handleDelete(id) {
    var result = confirm("Are you sure? This will delete the job and all associated entries.")
    if(result){
      $.ajax({
        url: `api/v1/jobs/${id}`,
        method: 'DELETE',
        dataType: 'JSON',
        success: () => {
          this.removeItemClient(id)
        }
      })
    }
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

