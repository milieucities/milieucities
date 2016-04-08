Handlebars.registerHelper('check_existence', function(input, options) {
  if(!!input){
    return new Handlebars.SafeString( input );
  }else{
    return new Handlebars.SafeString( "N/A" );
  }
});