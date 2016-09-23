export default class TimeEntryNonEditable extends React.Component {

  render () {
    return (
      <tr>
        <td><p>{this.props.date}</p></td>
        <td><p>{this.props.time_spent}</p></td>
        <td><p>{this.props.summary}</p></td>
        <td>
          <button className='btn btn-sm btn-default' onClick={this.props.handleEdit}>Edit</button>
          <button className='btn btn-sm btn-danger' onClick={this.props.handleDelete}>Delete</button>
        </td>
      </tr>
    )
  }
}

TimeEntryNonEditable.propTypes = {
  time_spent: React.PropTypes.number,
  date: React.PropTypes.string,
  summary: React.PropTypes.string
}
