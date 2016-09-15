class TimeEntryForm extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = this.blankState()
  }

  componentDidMount(){
    $('#datepicker').datepicker({
      format: 'yyyy-mm-dd',
      orientation: 'bottom'}).on('changeDate', e => {
        $('#datepicker').val(e.target.value)
        this.handleChange(e)
    })
  }

  render() {
    return (
      <form className='form-inline' onSubmit={this.handleSubmit}>
        <div className='form-group'>
          <input className='form-control' type='number' min='0' name='time_spent' placeholder='Time Spent (min)' value={this.state.time_spent} onChange={this.handleChange} /> 
        </div>
        <div className='form-group'>
          <input className='form-control' id='datepicker' type='text' name='date' placeholder='Date' value={this.state.date} />
        </div>
        <div className='form-group'>
          <input className='form-control' type='text' name='summary' placeholder='Summary' value={this.state.summary} onChange={this.handleChange} />
        </div>
        <div className='form-group'>
          <div className='btn-group' role='group'>
            <button type='submit' className='btn btn-primary' disabled={!this.valid()}>Add Entry</button>
            <button type='button' className='btn btn-default' onClick={this.props.onTimeEntryCreation}>Cancel</button>
          </div>
        </div>
      </form>
    )
  }

  blankState() {
    return {
      time_spent: '',
      date: '',
      summary: '',
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    $.post(`/api/v1/jobs/${this.props.job_id}/time_entries`,
      { time_entry: this.state },
      data => {
        this.props.handleNewRecord(data)
        this.setState(this.blankState())
        this.props.onTimeEntryCreation()
      },
      'JSON'
    )
  }

  handleChange(e) {
    var name = e.target.name,
        obj = {}

    obj[name] = e.target.value
    this.setState(obj)
  }

  valid() {
    return (this.state.time_spent && this.state.date && this.state.summary);
  }
}
