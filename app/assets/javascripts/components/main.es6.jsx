class Main extends React.Component {
  constructor() {
    super()
    this.state = {
      jobs: []
    }
    this.handleNewRecord = this.handleNewRecord.bind(this)
  }

  render () {
    return (
      <div>
        <div>
          <h1>Invoice App</h1>
          <h3>{this.props.user_email}</h3>
        </div>
        <div>
          <Jobs jobs={this.state.jobs}/>
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

}

Main.propTypes = {
  user_email: React.PropTypes.string
}

