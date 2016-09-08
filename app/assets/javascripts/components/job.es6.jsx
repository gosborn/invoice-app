class Job extends React.Component {
  constructor() {
    super()
    this.state = {
      editable: false,
      time_entries: []
    }
  }

  render () {
    var title = this.state.editable ? <input type='text' ref='title' defaultValue={this.props.job.title} />: <h3>Title: {this.props.job.title}</h3>
    var hourly_rate = this.state.editable ? <input type='text' ref='hourly_rate' defaultValue={this.props.job.hourly_rate} /> : <p> Hourly rate: {this.props.job.hourly_rate}</p>; 
    var tax_rate = this.state.editable ? <input type='text' ref='tax_rate' defaultValue={this.props.job.tax_rate} /> : <p>Tax Rate: {this.props.job.tax_rate}</p>; 

    var time_entries = this.state.time_entries.map((te) => { 
      console.log(te)
        return (
          <div key={te.id}>
            <TimeEntry time_spent={te.time_spent} date={te.date} summary={te.summary}/>
          </div>
        )})

    var display_entries = time_entries.length > 0 ? time_entries : "No entries yet!"

    return (
      <div>
        {title}
        {hourly_rate}
        {tax_rate}
        <button onClick={this.props.handleDelete}>Delete</button>
        <button onClick={this.handleEdit.bind(this)}> {this.state.editable ? 'Submit' : 'Edit' } </button>
        <h4>Add a new time entry</h4>
        <TimeEntryForm job_id={this.props.job.id} handleNewRecord={this.handleNewRecord.bind(this)} />
        <h4>History</h4>
        {display_entries}
      </div>
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
}

Job.propTypes = {
  title: React.PropTypes.string,
  hourlyRate: React.PropTypes.number,
  taxRate: React.PropTypes.number
};
