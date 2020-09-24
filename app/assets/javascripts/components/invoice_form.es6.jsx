class InvoiceForm extends React.Component {

  componentDidMount() {
    $('#invoice_datepicker').datepicker({
      format: 'yyyy-mm-dd',
      orientation: 'bottom'
    }).on('changeDate', () => {
        $('#invoice_submit').removeAttr('disabled')
    })
  }

  render() {
    return (
      <div id='invoice_form'>
        <form className='form-inline' action='/api/v1/invoices' method='GET'>
          <div className='form-group'>
            <div className='input-daterange' id='invoice_datepicker'>
              <input className='form-control' type='text' name='invoice[start_date]' placeholder='Start Date' />
              <input className='form-control' type='text' name='invoice[end_date]' placeholder='End Date' />
            </div>
          </div>
          <div className='form-group'>
            <input type='hidden' name='invoice[job_id]' value={this.props.job_id} />
          </div>
          <div className='form-group'>
            <div className='btn-group' role='group'>
              <button className='btn btn-primary' id='invoice_submit' type='submit' disabled='true'>Download PDF Invoice</button>
              <button className='btn btn-default' type='button' onClick={() => this.props.onInvoiceCreation()}>Cancel</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
