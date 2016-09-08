class Jobs extends React.Component {

  render() {
    var jobs = this.props.jobs.map((job) => { 
      console.log(job)
        return (
          <div key={job.id}>
            <Job job={job} handleDelete={this.handleDelete.bind(this, job.id)} handleUpdate={this.handleUpdate.bind(this)}/>
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

  handleDelete(id) {
    this.props.handleDelete(id);
  }

  handleUpdate(job2) {
    console.log("in JOBS " + job2.title)
    this.props.handleUpdate(job2)
  }
}
