A lightweight form class that handles common functionality internally while still returning a promise on submit to allow for
flexible use cases.

## Installation:

From project root, run:

`yarn @wheelmaker/js-form`


## Basic usage:

Create new form with a string for the submit url and an object with form fields as keys paired with default values:

    import Form from '@wheelmaker/js-form'
    
    const url = '/submit/here'
    const fields = {name: '', email: ''}
    
    const form = new Form(url, fields)
    
You now have access to:

    form.post() // sends POST request with form fields using axios and returns promise
    form.get() // same as post but uses 'GET' method
    form.reset() // sets 'name' and 'email' fields back to ''
    form.pending // true while form submit is pending
    
    form.fields.name // defaulted to ''
    form.fields.email // defaulted to ''
    
    
 ## Optional Error Handling:
 
 You can provide a third parameter on form creation which is a callable function, used to extract error messages
 from failed submission attempts.
 
     const getErrors = r => r.response.data.errors
 
     const form = new Form(url, fields, getErrors)
 
 > note: your getErrors function should return an object with errors keyed by field name, actual function definition will depend on 
 how your backend returns form submission errors
 
 You now have access to:
 
     form.errors.name // undefined untill/unless error returned from server
     form.errors.emais // "                                                "
     
     form.resetErrors() // clears errors (to be called when user updates a form field after failure)
