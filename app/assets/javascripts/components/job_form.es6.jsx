class JobForm extends React.Component {
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
          <input type='text' className='form-control'
                 placeholder='Title' name='title'
                 value={this.state.title} onChange={this.handleChange}>
          </input>
        </div>
        <div className='form-group'>
          <input type='number' className='form-control'
                 placeholder='hourly rate' name='hourly_rate'
                 value={this.state.hourly_rate} onChange={this.handleChange}>
          </input>
        </div>
        <div className='form-group'>
          <input type='number' className='form-control'
                 placeholder='Tax rate' name='tax_rate'
                 value={this.state.tax_rate} onChange={this.handleChange}>
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
