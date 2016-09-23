export default class JobForm extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = this.blankState()
  }

  render() {
    return (
      <form className='form' onSubmit={this.handleSubmit}>
        <div className='form-group' id='title_form'>
          <input className='form-control' type='text' name='title'
                 placeholder='Title' value={this.state.title} onChange={this.handleChange} />
        </div>
        <div className='input-group' id='hourly_rate_group'>
          <span className='input-group-addon' id='basic-addon1'>$</span>
          <input className='form-control' type='number' min='0'
                 step='any' name='hourly_rate' placeholder='Hourly rate'
                 value={this.state.hourly_rate}  onChange={this.handleChange} />
        </div>
        <div className='input-group' id='tax_rate_group'>
          <input className='form-control' type='number' min='0'
                 step='any' name='tax_rate' placeholder='Tax rate'  
                 value={this.state.tax_rate}  onChange={this.handleChange} />
          <span className='input-group-addon' id='basic-addon2'>%</span>
        </div>
        <div className='form-group'>
          <input className='btn btn-primary' id='new_job_button' type='submit'  
                 disabled={!this.valid()} value='Add a new job' />
        </div>
      </form>
    )
  }

  blankState() {
    return {
      title: '',
      tax_rate: '',
      hourly_rate: '',
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    $.post('/api/v1/jobs',
      { job: this.state },
      data => {
        this.props.handleNewJob(data)
        this.setState(this.blankState())
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
    return (this.state.title && this.state.tax_rate && this.state.hourly_rate);
  }
}
