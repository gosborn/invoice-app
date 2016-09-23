import React from './../../../../node_modules/react'

export default class Nav extends React.Component {

  render() {
    return (
      <nav className='navbar navbar-inverse navbar-fixed-top'>
        <div className='container-fluid'>
          <div className='navbar-header'>
            <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#navbar' aria-controls='navbar'>
              <span className='sr-only'>Toggle navigation</span>
              <span className='icon-bar' />
              <span className='icon-bar' />
              <span className='icon-bar' />
            </button>
            <a className='navbar-brand' href='#'>Invoice App</a>
          </div>
          {this.props.small ? this.addJobsToHamburgerMenu() : this.doNotIncludeJobsInHamburgerMenu() }
        </div>
      </nav>
    )
  }

  addJobsToHamburgerMenu(){
    return (
      <div id='navbar' className='navbar-collapse collapse'>
        <ul className='nav navbar-nav navbar-right'>
          <li><a href='#'>{this.props.userEmail}</a></li>
          <li><a data-method='delete' href='/users/sign_out' rel='nofollow'>Sign out?</a></li>
          <li>
            <a href='#' onClick={(e) => this.props.handleJobClick(e, null)}>
              <h4>Your Jobs</h4>
            </a>
          </li>
          {this.listJobs()}
          <li>
            <a href='#' data-toggle='collapse' data-target='.navbar-collapse' onClick={(e) => this.props.handleJobClick(e, null)}>
              <span className='glyphicon glyphicon-plus' aria-hidden='true' /> Add a new job
            </a>
          </li>
        </ul>
      </div>
    )
  }

  doNotIncludeJobsInHamburgerMenu(){
    return (
      <div id='navbar' className='navbar-collapse collapse'>
        <ul className='nav navbar-nav navbar-right'>
          <li><a href='#'>{this.props.userEmail}</a></li>
          <li><a data-method='delete' href='/users/sign_out' rel='nofollow'>Sign out?</a></li>
        </ul>
      </div>
    )
  }

  listJobs(){
    return this.props.jobs.map(job =>  
      <li key={job.id}>
        <a href='#' data-toggle='collapse' data-target='.navbar-collapse' onClick={(e) => this.props.handleJobClick(e, job)}><strong>{job.title}</strong></a>
      </li>
    )
  }
}
