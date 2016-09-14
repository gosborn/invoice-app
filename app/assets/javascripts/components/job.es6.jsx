class Job extends React.Component {
  constructor() {
    super()
    this.state = {
      editable: false,
      hideInvoice: true,
      time_entries: []
    }
  }

  render () {
    var title = this.state.editable ? <div><strong>Title: </strong><input type='text' ref='title' defaultValue={this.props.job.title} /></div>: <h2 style={{marginTop: '5px', marginRight: '10px'}}>{this.props.job.title}</h2>
    var hourly_rate = this.state.editable ? <input type='text' ref='hourly_rate' defaultValue={this.props.job.hourly_rate} /> : <span> {this.props.job.hourly_rate}</span>; 
    var tax_rate = this.state.editable ? <input type='text' ref='tax_rate' defaultValue={this.props.job.tax_rate} /> : <span> {this.props.job.tax_rate}</span>; 

    var time_entries = this.state.time_entries.map((te) => { 
        return (
          <TimeEntry key={te.id} id={te.id} time_spent={te.time_spent} date={te.date} summary={te.summary} handleUpdate={this.handleUpdate.bind(this)} handleDelete={this.handleDelete.bind(this, te.id)}/>
        )})

    var display_entries = time_entries.length > 0 ? time_entries : "No entries yet!"

    return (
      <div>
        <table>
          <tr>
            <td>
              {title}
            </td>
            <td>
              <div className="btn-group btn-group-xs" role="group" aria-label="...">
                <button className="btn btn-default" onClick={this.handleEdit.bind(this)}> {this.state.editable ? 'Submit' : <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span> } </button>
                <button className="btn btn-danger" onClick={this.props.handleDelete}><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></button>
              </div>
            </td>
          </tr>
        </table>
        <table>
          <tr>
            <td>
              <strong>Hourly Rate: </strong>${hourly_rate}
            </td>
            </tr>
            <tr>
            <td>
              <strong>Tax Rate: </strong>{tax_rate}%
            </td>
          </tr>
        </table>  

        <h4><span className="glyphicon glyphicon-plus" aria-hidden="true"></span>Add a new time entry</h4>
        
        <TimeEntryForm job_id={this.props.job.id} handleNewRecord={this.handleNewRecord.bind(this)}  />

        
        {this.state.hideInvoice ? <a href="#" onClick={(e) => this.showInvoice(e).bind(this)}><h4><span className="glyphicon glyphicon-save" aria-hidden="true"></span>Create An Invoice</h4></a> : <InvoiceForm job={this.props.job} onInvoiceCreation={this.onInvoiceCreation.bind(this)}/> }
        
        <h3 className="sub-header">Time Entries</h3>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time Spent (min)</th>
                <th>Summary</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {display_entries}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  showInvoice(e){
    e.preventDefault();
    this.setState({ time_entries: this.state.time_entries, editable: false, hideInvoice: false })
  }

  onInvoiceCreation() {
    this.setState({ time_entries: this.state.time_entries, editable: false, hideInvoice: true })
  }

  handleSubmit(e) {
    e.preventDefault();
    debugger
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
    this.setState({ time_entries: newState, editable: false })
  }

  componentDidMount(){
    $.getJSON(`/api/v1/jobs/${this.props.job.id}/time_entries.json`, (response) => {
        this.setState({editable: false, time_entries: response})
      })
  }

  handleEdit() {
    if(this.state.editable) {
      var title = this.refs.title.value;
      var hourly_rate = this.refs.hourly_rate.value;
      var tax_rate = this.refs.tax_rate.value;
      var id = this.props.job.id;
      var job = { id: id, title: title, hourly_rate: hourly_rate, tax_rate: tax_rate }
      this.props.handleUpdate(job);
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

    this.setState({ time_entries: newTimeEntries, editable: false })
  }

  updateItems(time_entry) {
    var time_entries = this.state.time_entries.filter((i) => { return i.id != time_entry.id})
    time_entries.push(time_entry)

    var sorted_entries = time_entries.sort(function(a,b){
      if (a.time_spent > b.time_spent){
        return 1
      }
      if (b.time_spent > a.time_spent){
        return -1
      }
      return 0
    })

    this.setState({time_entries: sorted_entries, editable: false})
  }
}

Job.propTypes = {
  title: React.PropTypes.string,
  hourlyRate: React.PropTypes.number,
  taxRate: React.PropTypes.number
};
