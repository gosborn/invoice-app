class Jobs extends React.Component {
  constructor() {
    super()
    this.state = {
      jobs: []
    }
  }

  componentDidMount() {
    $.getJSON('/api/v1/jobs.json', (response) => { this.setState({ jobs: response }) });
  }

  render() {
    var jobs = this.state.jobs.map((job) => { 
      console.log(job)
        return (
          <div key={job.id}>
            <h3>{job.title}</h3>
            <Job job={job}/>
          </div>
        ) 
    });

    return(
      <div>
        <h2>Jobs</h2>
        {jobs}
      </div>
    )
  }
}
