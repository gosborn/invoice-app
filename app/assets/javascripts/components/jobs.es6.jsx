class Jobs extends React.Component {

  render() {
    var jobs = this.props.jobs.map((job) => { 
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
