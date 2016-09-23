#Invoice App

##Implementation Details

This app utilizes Rails and React to store work history and create invoices for users.

React, ReactDOM and React Components are managed with [webpack](https://github.com/webpack/webpack).

npm is used to manage React, Webpack and [Babel](https://github.com/babel/babel) javascript dependencies.

The invoices are created with the [wicked_pdf gem](https://github.com/mileszs/wicked_pdf), which interfaces with [wkhtmltopdf](http://wkhtmltopdf.org/) to generate PDFs from html templates.

The app is mainly styled with [Bootstrap V3](http://getbootstrap.com/) for layouts and responsiveness. [Bootstrap Datepicker](https://github.com/eternicode/bootstrap-datepicker) is used for all date selections.

##Domain Details

Each User has:
  - 0 or more jobs with attributes of:
    - Title
    - Hourly Rate
    - Tax Rate

Each job has:
  - 0 or more TimeEntries with attributes of:
    - Time spent (in minutes)
    - Date of entry
    - Summary of work completed

The app produces invoices for each user, which contain the data of one or more TimeEntries, but scoped to one job.
  - Job
  - Date Range
  - Time entries in range
  - $ subtotal (hourly_rate * total_minutes/60)
  - $ tax (subtotal * tax_rate)
  - $ total

##Setting up the app

This project requires ruby to be installed. If not, follow directions at https://www.ruby-lang.org/en/documentation/installation/ to install for your machine.

Bundler is also required. Directions for installation are located at: http://bundler.io/.

Navigate to the directory of the project.

Run `$ ./bin/setup`. This will install all Gemfiles with bundler, install all necessary npm packages (React, ReactDOM, webpack etc), set up the database, and run the application on localhost:3000.

##Running the app

Once setup, the app can be run in two ways.

1. Run `$ foreman start`
  - Foreman is used to run both rails server and a gulptask together. The gulptask watches for any changes to the javascript files that make up the bundle produced by webpack. Therefore, any changes made to these files can be observed by refreshing the browser.
2. Run '$ rails s'
  - This will only run the server, any changes made to the javascript files that make up bundle.js will not be updated in the browser.

###Authentication

The app uses [Devise](https://github.com/plataformatec/devise) for user authentication. To login without creating a new user, use the credentials `user: user@user.com pw: test1234`.

###Code linting

This project uses [Rubocop](https://github.com/bbatsov/rubocop) to check the style of the code. Run by typing `rubocop` in the directory of the project.

###Testing

This project uses rspec for test cases. Run by typing `rspec` to recursively run all test suites.

To examine test coverage, run `COVERAGE=true rspec` to utilize [simplecov](https://github.com/colszowka/simplecov), which generates a coverage report. This is located at coverage/index.html and can be viewed in a web browser.