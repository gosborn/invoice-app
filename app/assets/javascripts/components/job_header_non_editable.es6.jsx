class JobHeaderNonEditable extends React.Component {

  render () {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td>
                <div>
                  <h2 id='job_title'>{this.props.job.title}</h2>
                </div>
              </td>
              <td>
                <div className='btn-group btn-group-xs' role='group'>
                  <button className='btn btn-default' onClick={this.props.handleEdit}>
                    <span className='glyphicon glyphicon-pencil' />
                  </button>
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
                <span>{this.showAtLeastTwoDecimals(this.props.job.hourly_rate)}</span>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Tax Rate: </strong>
                <span>{this.showAtLeastTwoDecimals(this.props.job.tax_rate)}</span>%
              </td>
            </tr>
          </tbody>
        </table>
      </div> 
    )
  }

  showAtLeastTwoDecimals(num) {
    return num.toFixed(Math.max(2, (num.toString().split('.')[1] || []).length));
  }
}

JobHeaderNonEditable.propTypes = {
  title: React.PropTypes.string,
  hourlyRate: React.PropTypes.number,
  taxRate: React.PropTypes.number
}
