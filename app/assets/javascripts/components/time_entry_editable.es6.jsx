import React from './../../../../node_modules/react'

export default class TimeEntryEditable extends React.Component {

  componentDidMount(){
    $('#datepicker_edit').datepicker({
      format: 'yyyy-mm-dd',
      orientation: 'bottom'}).on('changeDate', e => {
        $('#datepicker').val(e.target.value)
    })
  }

  render () {
    return (
      <tr>
        <td>
          <input className='form-control' id='datepicker_edit' type='text'
                 ref='date' defaultValue={this.props.date} />
        </td>
        <td>
          <input className='form-control' type='number' ref='time_spent'
                    defaultValue={this.props.time_spent} />
        </td>
        <td>
          <input className='form-control' type='text' ref='summary'
                    defaultValue={this.props.summary} />
        </td>
        <td>
          <button className='btn btn-sm btn-default' onClick={() => this.props.handleEdit(this.refs)}>Submit</button>
          <button className='btn btn-sm btn-default' onClick={this.props.cancel}>Cancel</button>
          <button className='btn btn-sm btn-danger' onClick={this.props.handleDelete}>Delete</button>
        </td>
      </tr>
    )
  }
}

TimeEntryEditable.propTypes = {
  time_spent: React.PropTypes.number,
  date: React.PropTypes.string,
  summary: React.PropTypes.string
}
