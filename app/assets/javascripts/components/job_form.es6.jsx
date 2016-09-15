class JobForm extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = this.blankState()
  }

  render() {
    return(
      <form className='form' onSubmit={this.handleSubmit}>
        <div className='form-group' id='title_form'>
          <input type='text' className='form-control'
                 placeholder='Title' name='title'
                 value={this.state.title} onChange={this.handleChange}>
          </input>
        </div>
        <div className='input-group' id='hourly_rate_group'>
          <span className="input-group-addon" id="basic-addon1">$</span>
          <input type='number' className='form-control'
                 placeholder='Hourly rate' name='hourly_rate' step="any"
                 value={this.state.hourly_rate} min="0" onChange={this.handleChange}>
          </input>
        </div>
        <div className='input-group' id='tax_rate_group'>
          <input type='number' className='form-control'
                 placeholder='Tax rate' name='tax_rate'
                 value={this.state.tax_rate} min="0" onChange={this.handleChange}>
          </input>
          <span className="input-group-addon" id="basic-addon2">%</span>
        </div>
        <div className='form-group'>
          <input type='submit' className='btn btn-primary' id='new_job_button'
                 disabled={!this.valid()} value='Add a new job'>
          </input>
        </div>
      </form>
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    $.post('/api/v1/jobs',
      { job: this.state },
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
    return (this.state.title && this.state.tax_rate && this.state.hourly_rate);
  }

  blankState() {
    return {
      title: '',
      tax_rate: '',
      hourly_rate: '',
    }
  }
}
