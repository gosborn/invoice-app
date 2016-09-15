class Job extends React.Component {
  constructor() {
    super()
    this.state = {
      editable: false,
      hideInvoice: true,
      hideTimeEntryForm: true,
      time_entries: []
    }
  }

  componentDidMount() {
    $.getJSON(`/api/v1/jobs/${this.props.job.id}/time_entries.json`, (response) => {
      var sorted_entries = response.sort(function(a,b){
        return new Date(b.date) - new Date(a.date);
      })

        this.setState({time_entries: sorted_entries})
      })
  }

  timeEntries() {
    return this.state.time_entries.map(timeEntry =>
      <TimeEntry key={timeEntry.id} id={timeEntry.id} time_spent={timeEntry.time_spent}
                 date={timeEntry.date} summary={timeEntry.summary} handleUpdate={this.handleUpdate.bind(this)}
                 handleDelete={this.handleDelete.bind(this, timeEntry.id)} />
    )
  }

  displayTimeEntries() {
    if (this.timeEntries().length > 0) {
      return this.timeEntries()
    }
    return <tr><td><h4><strong>No entries yet!</strong></h4></td><td></td><td></td><td></td></tr>
  }

  showHeader() {
    if (this.state.editable) {
      return <JobHeaderEditable job={this.props.job} handleEdit={this.handleEdit.bind(this)}
                                cancel={this.cancel.bind(this)} handleDelete={this.props.handleDelete} />
    }
    return <JobHeaderNonEditable job={this.props.job} handleEdit={this.handleEdit.bind(this)}
                                 cancel={this.cancel.bind(this)} handleDelete={this.props.handleDelete} />
  }

  render () {
    return (
      <div>
        {this.showHeader()}

        {this.state.hideTimeEntryForm ? <a href="#" onClick={(e) => this.showTimeEntryForm(e)}><h4><span className="glyphicon glyphicon-plus" aria-hidden="true"></span>Add A Time Entry</h4></a> : <TimeEntryForm job_id={this.props.job.id} onTimeEntryCreation={this.onInvoiceCreation.bind(this)} handleNewRecord={this.handleNewRecord.bind(this)}/>}
        {this.state.hideInvoice ? <a href="#" onClick={(e) => this.showInvoice(e)}><h4><span className="glyphicon glyphicon-save" aria-hidden="true"></span>Create An Invoice</h4></a> : <InvoiceForm job_id={this.props.job.id} onInvoiceCreation={this.onInvoiceCreation.bind(this)}/> }
        
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



  cancel() {
    this.setState({ editable: false })
  }

  showTimeEntryForm(e){
    e.preventDefault();
    this.setState({ time_entries: this.state.time_entries, editable: false, hideInvoice: true, hideTimeEntryForm: false })
  }

  onTimeEntryCreation(){
    this.setState({ time_entries: this.state.time_entries, editable: false, hideInvoice: true, hideTimeEntryForm: true })
  }

  showInvoice(e){
    e.preventDefault();
    this.setState({ time_entries: this.state.time_entries, editable: false, hideInvoice: false, hideTimeEntryForm: true })
  }

  onInvoiceCreation() {
    this.setState({ time_entries: this.state.time_entries, editable: false, hideInvoice: true, hideTimeEntryForm: true })
  }

  handleSubmit(e) {
    e.preventDefault();
    $.post('/api/v1/invoices',
      { invoice: {start_date: this.refs.start_date.value, end_date: this.refs.end_date.value, job_id: this.props.id } },
      function(data) {
        this.props.handleNewRecord(data)
        this.setState(this.blankState());
      }.bind(this),
      'JSON'
    );
  }

  handleNewRecord(time_entry){
    var newState = this.state.time_entries.concat(time_entry);

    var sorted_entries = newState.sort(function(a,b){
      return new Date(b.date) - new Date(a.date);
    });

    this.setState({ time_entries: sorted_entries, editable: false })
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

  handleUpdate(time_entry) {
    $.ajax({
      url: `api/v1/jobs/${this.props.job.id}/time_entries/${time_entry.id}`,
      method: 'PUT',
      data: { time_entry: time_entry },
      success: () => {
        this.updateItems(time_entry)
      }
    })
  }

  handleDelete(id) {
      $.ajax({
        url:  `api/v1/jobs/${this.props.job.id}/time_entries/${id}`,
        method: 'DELETE',
        dataType: 'JSON',
        success: () => {
          this.removeItemClient(id)
        }
      })
  }

  removeItemClient(id) {
    var newTimeEntries = this.state.time_entries.filter((te) => {
      return te.id != id;
    })

    var sorted_entries = newTimeEntries.sort(function(a,b){
      return new Date(b.date) - new Date(a.date);
    });

    this.setState({ time_entries: sorted_entries, editable: false })
  }

  updateItems(time_entry) {
    var time_entries = this.state.time_entries.filter((i) => { return i.id != time_entry.id})
    time_entries.push(time_entry)

    var sorted_entries = time_entries.sort(function(a,b){
      return new Date(b.date) - new Date(a.date);
    });

    this.setState({time_entries: sorted_entries, editable: false})
  }
}

Job.propTypes = {
  title: React.PropTypes.string,
  hourlyRate: React.PropTypes.number,
  taxRate: React.PropTypes.number
};
