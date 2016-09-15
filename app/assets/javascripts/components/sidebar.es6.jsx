class Sidebar extends React.Component {

  render() {
    return (
      <div className='col-sm-3 col-md-2 sidebar'> 
        <ul className='nav nav-sidebar'>
          <li>
            <a href='#' onClick={(e) => this.props.handleJobClick(e, null)}>
              <h4>Your Jobs</h4>
            </a>
          </li>
          {this.listJobs()}
          <li>
            <a href='#' onClick={(e) => this.props.handleJobClick(e, null)}>
              <span className='glyphicon glyphicon-plus' aria-hidden='true' /> Add a new job
            </a>
          </li>
        </ul>
      </div>
    )
  }

  listJobs(){
    return this.props.jobs.map(job =>  
      <li key={job.id}>
        <a href='#' onClick={(e) => this.props.handleJobClick(e, job)}><strong>{job.title}</strong></a>
      </li>
    )
  }
}
