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
    return (
      <div>
        <div>
          <h1>Invoice App</h1>
          <h3>{this.props.user_email}</h3>
        </div>
        <div>
          <Jobs jobs={this.state.jobs} handleDelete={this.handleDelete.bind(this)} handleUpdate={this.handleUpdate.bind(this)}/>
          <h4>Add a new job</h4>
          <JobForm handleNewRecord={this.handleNewRecord.bind(this)}/>
        </div>
      </div>
    )
  }

  componentDidMount() {
    $.getJSON('/api/v1/jobs.json', (response) => { this.setState({ jobs: response }) });
  }

  handleNewRecord(job) {
    var newState = this.state.jobs.concat(job);
    this.setState({ jobs: newState })
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

    this.setState({ jobs: newJobs })
  }

  handleUpdate(job) {
    console.log("IN MAIN" + job.title)
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

    this.setState({jobs: jobs})
  }
}

Main.propTypes = {
  user_email: React.PropTypes.string
}

