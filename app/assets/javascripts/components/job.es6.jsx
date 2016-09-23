import JobHeaderEditable from './job_header_editable.es6'
import JobHeaderNonEditable from './job_header_non_editable.es6'
import TimeEntryForm from './time_entry_form.es6'
import TimeEntry from './time_entry.es6'
import InvoiceForm from './invoice_form.es6'

export default class Job extends React.Component {
  constructor() {
    super()
    this.state = {
      editable: false,
      hideInvoice: true,
      hideTimeEntryForm: true,
      time_entries: []
    }
    this.handleEdit = this.handleEdit.bind(this)
    this.cancel = this.cancel.bind(this)
    this.showTimeEntryForm = this.showTimeEntryForm.bind(this)
    this.handleNewTimeEntry = this.handleNewTimeEntry.bind(this)
    this.onInvoiceCreation = this.onInvoiceCreation.bind(this)
    this.handleTimeEntryUpdate = this.handleTimeEntryUpdate.bind(this)
  }

  componentDidMount() {
    $.getJSON(`/api/v1/jobs/${this.props.job.id}/time_entries.json`, response => {
      this.sortByDateAndSetState(response)
    })
  }

  sortByDateAndSetState(timeEntries) {
    var sortedByDate = timeEntries.sort((timeEntry1,timeEntry2) => new Date(timeEntry2.date) - new Date(timeEntry1.date))
    this.setState({time_entries: sortedByDate})
  }

  render () {
    return (
      <div>
        {this.header()}
        {this.timeEntryForm()}
        {this.invoice()}
        <h3 className='sub-header'>Time Entries</h3>
        <div className='table-responsive'>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time Spent<br/>(min)</th>
                <th>Summary</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.displayTimeEntries()}
            </tbody>
          </table>
        </div> 
      </div>
    )
  }

  header() {
    if (this.state.editable) {
      return <JobHeaderEditable job={this.props.job} handleEdit={this.handleEdit}
                                cancel={this.cancel} handleDelete={this.props.handleDelete} />
    }
    return <JobHeaderNonEditable job={this.props.job} handleEdit={this.handleEdit}
                                 cancel={this.cancel} handleDelete={this.props.handleDelete} />
  }

  handleEdit(refs) {
    if(this.state.editable) {
      var title = refs.title.value || 'N/A',
          hourly_rate = parseFloat(refs.hourly_rate.value) || 0,
          tax_rate = parseFloat(refs.tax_rate.value) || 0,
          id = this.props.job.id

      var job = { id: id, title: title, hourly_rate: hourly_rate, tax_rate: tax_rate }
      this.props.handleUpdate(job)
    }
    this.setState({ editable: !this.state.editable })
  }

  cancel() {
    this.setState({ editable: false })
  }

  timeEntryForm() {
    if (this.state.hideTimeEntryForm) {
      return ( 
        <a href='#' onClick={(e) => this.showTimeEntryForm(e)}>
          <h4><span className='glyphicon glyphicon-plus' />Add A Time Entry</h4>
        </a>
      )
    }
    return <TimeEntryForm job_id={this.props.job.id} onTimeEntryCreation={this.showTimeEntryForm}
                          handleNewTimeEntry={this.handleNewTimeEntry} />
  }

  showTimeEntryForm(e){
    if (e) { e.preventDefault() }
    this.setState({ hideTimeEntryForm: !this.state.hideTimeEntryForm })
  }

  handleNewTimeEntry(timeEntry) {
    var timeEntriesWithNewEntry = this.state.time_entries.concat(timeEntry);
    this.sortByDateAndSetState(timeEntriesWithNewEntry)
  }

  invoice() {
    if (this.state.hideInvoice) {
      return (
        <a href='#' onClick={(e) => this.showInvoice(e)}>
          <h4><span className='glyphicon glyphicon-save' />Create An Invoice</h4>
        </a>
      )
    }
    return <InvoiceForm job_id={this.props.job.id} onInvoiceCreation={this.onInvoiceCreation} />
  }

  showInvoice(e){
    e.preventDefault()
    this.setState({ hideInvoice: false })
  }

  onInvoiceCreation(create) {
    if (create) {
      $('#invoice_form').html('<a href="#"><h4>Rendering invoice, please wait...</h4></a>')
      this.sleep(7000).then(() => {
        this.setState({ hideInvoice: true })
      })
    } else {
      this.setState({ hideInvoice: true })
    }
  }

  sleep (time) {
    return new Promise(resolve => setTimeout(resolve, time))
  }

  displayTimeEntries() {
    if (this.timeEntries().length > 0) {
      return this.timeEntries()
    }
    return <tr><td><h4><strong>No entries yet!</strong></h4></td><td></td><td></td><td></td></tr>
  }

  timeEntries() {
    return this.state.time_entries.map(timeEntry =>
      <TimeEntry key={timeEntry.id} id={timeEntry.id} time_spent={timeEntry.time_spent}
                 date={timeEntry.date} summary={timeEntry.summary} handleUpdate={this.handleTimeEntryUpdate}
                 handleDelete={this.handleTimeEntryDelete.bind(this, timeEntry.id)} />
    )
  }

  handleTimeEntryUpdate(timeEntry) {
    $.ajax({
      url: `api/v1/jobs/${this.props.job.id}/time_entries/${timeEntry.id}`,
      method: 'PUT',
      data: { time_entry: timeEntry },
      success: () => {
        this.updateTimeEntriesWithNew(timeEntry)
      }
    })
  }

  updateTimeEntriesWithNew(timeEntry) {
    var timeEntries = this.state.time_entries.filter(oldTimeEntry =>  oldTimeEntry.id != timeEntry.id )
    timeEntries.push(timeEntry)
    this.sortByDateAndSetState(timeEntries)
  }

  handleTimeEntryDelete(id) {
    $.ajax({
      url:  `api/v1/jobs/${this.props.job.id}/time_entries/${id}`,
      method: 'DELETE',
      dataType: 'JSON',
      success: () => {
        this.removeDeletedTimeEntry(id)
      }
    })
  }

  removeDeletedTimeEntry(id) {
    var timeEntriesWithoutOldTimeEntry = this.state.time_entries.filter(timeEntry => timeEntry.id != id)
    this.sortByDateAndSetState(timeEntriesWithoutOldTimeEntry)
  }
}

Job.propTypes = {
  title: React.PropTypes.string,
  hourlyRate: React.PropTypes.number,
  taxRate: React.PropTypes.number
}
