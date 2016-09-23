import React from './../../../../node_modules/react'

import TimeEntryEditable from './time_entry_editable.es6'
import TimeEntryNonEditable from './time_entry_non_editable.es6'

export default class TimeEntry extends React.Component {
  constructor() {
    super()
    this.handleEdit = this.handleEdit.bind(this)
    this.cancel = this.cancel.bind(this)
    this.state = {
      editable: false
    }
  }

  render () {
    if (this.state.editable) {
      return <TimeEntryEditable date={this.props.date} time_spent={this.props.time_spent}
                                summary={this.props.summary} handleEdit={this.handleEdit}
                                cancel={this.cancel} handleDelete={this.props.handleDelete} />
    }
    return <TimeEntryNonEditable date={this.props.date} time_spent={this.props.time_spent}
                                 summary={this.props.summary} handleEdit={this.handleEdit}
                                 handleDelete={this.props.handleDelete} />
  }

  cancel(){
    this.setState({ editable: false })
  }

  handleEdit(refs) {
    if(this.state.editable) {
      var time_spent = parseInt(refs.time_spent.value) || 0,
          date = refs.date.value || '2000-01-01',
          summary = refs.summary.value || 'N/A',
          id = this.props.id

      var time_entry = { id: id, time_spent: time_spent, date: date, summary: summary }
      this.props.handleUpdate(time_entry)
    }
    this.setState({ editable: !this.state.editable })
  }
}

TimeEntry.propTypes = {
  time_spent: React.PropTypes.number,
  date: React.PropTypes.string,
  summary: React.PropTypes.string
}
