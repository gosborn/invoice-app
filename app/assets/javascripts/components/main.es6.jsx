class Main extends React.Component {
  constructor() {
    super()
    this.state = {
      jobs: []
    }
    this.handleNewRecord = this.handleNewRecord.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  render () {
    return (
      <div>
        <div>
          <h1>Invoice App</h1>
          <h3>{this.props.user_email}</h3>
        </div>
        <div>
          <Jobs jobs={this.state.jobs} handleDelete={this.handleDelete.bind(this)}/>
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
}

Main.propTypes = {
  user_email: React.PropTypes.string
}

