class InvoiceForm extends React.Component {
  constructor() {
    super()
  }

  render () {
    return(
      <form className='form-inline' action="/api/v1/invoices" method="GET" onSubmit={this.props.onInvoiceCreation}>
        <div className='form-group'>
        <div className="input-daterange" data-behaviour="datepicker" id="datepicker" data-date-format="dd/mm/yyyy">
           <input type='text' name='invoice[start_date]' placeholder='Start Date' className='form-control' onChange={this.handleChange}></input>
           <input type='text' name='invoice[end_date]' placeholder='End Date' className='form-control' onChange={this.handleChange}></input>
        </div>
        </div>
        <div className='form-group'>
          <input type="hidden" name="invoice[job_id]" value={this.props.job_id}>
          </input>
        </div>
        <div className='form-group'>
          <div className="btn-group" role="group" aria-label="...">
            <button type='submit' id='invoice_submit' className='btn btn-primary' disabled='true'>Download PDF Invoice</button>
            <button type="button" className="btn btn-default" onClick={this.props.onInvoiceCreation}>Cancel</button>
          </div>
        </div>
      </form>
    )
  }

  componentDidMount(){
    $('[data-behaviour~=datepicker]').datepicker({
      orientation: 'bottom'}).on('changeDate', function(e) {
        $("#invoice_submit").removeAttr("disabled")
    });
  }

}