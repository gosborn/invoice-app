class JobHeaderEditable extends React.Component {

  render () {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td>
                <div>
                  <strong>Title: </strong>
                  <input className='job_edit' id='job_edit_title' ref='title' 
                         type='text' defaultValue={this.props.job.title} />
                </div>
              </td>
              <td>
                <div className='btn-group btn-group-xs' role='group'>
                  <button className='btn btn-default' onClick={() => this.props.handleEdit(this.refs)}>Submit</button>
                  <button className='btn btn-default' onClick={this.props.cancel}>Cancel</button>
                  <button className='btn btn-danger' onClick={this.props.handleDelete.bind(this.props.job.id)}>
                    <span className='glyphicon glyphicon-remove' />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <table>
          <tbody>
            <tr>
              <td>
                <strong>Hourly Rate: </strong>$
                <input className='job_edit' id='job_edit_hourly' ref='hourly_rate' type='number'
                       min='0' step='any' defaultValue={this.props.job.hourly_rate}  />
              </td>
            </tr>
            <tr>
              <td>
                <strong>Tax Rate: </strong>
                <input className='job_edit' id='job_edit_tax' ref='tax_rate' type='number'
                       min='0' step='any' defaultValue={this.props.job.tax_rate} />%
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

JobHeaderEditable.propTypes = {
  title: React.PropTypes.string,
  hourlyRate: React.PropTypes.number,
  taxRate: React.PropTypes.number
}
