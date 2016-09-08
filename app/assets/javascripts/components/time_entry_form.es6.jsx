class TimeEntryForm extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = this.blankState()
  }

  render() {
    return(
      <form className='form-inline' onSubmit={this.handleSubmit}>
        <div className='form-group'>
          <input type='number' className='form-control'
                 placeholder='Time Spent' name='time_spent'
                 value={this.state.time_spent} onChange={this.handleChange}>
          </input>
        </div>
        <div className='form-group'>
          <input type='text' className='form-control'
                 placeholder='date' name='date'
                 value={this.state.date} onChange={this.handleChange}>
          </input>
        </div>
        <div className='form-group'>
          <input type='text' className='form-control'
                 placeholder='summary' name='summary'
                 value={this.state.summary} onChange={this.handleChange}>
          </input>
        </div>
        <div className='form-group'>
          <input type='submit' className='btn btn-primary'
                 disabled={!this.valid()}>
          </input>
        </div>
      </form>
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    $.post(`/api/v1/jobs/${this.props.job_id}/time_entries`,
      { time_entry: this.state },
      function(data) {
        this.props.handleNewRecord(data)
        this.setState(this.blankState());
      }.bind(this),
      'JSON'
    );
  }

  handleChange(e) {
    var name = e.target.name;
    var obj = {};
    obj[name] = e.target.value;
    this.setState(obj);
  }

  valid() {
    return (this.state.time_spent && this.state.date && this.state.summary);
  }

  blankState() {
    return {
      time_spent: '',
      date: '',
      summary: '',
    }
  }
}
