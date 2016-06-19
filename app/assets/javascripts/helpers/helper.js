Handlebars.registerHelper('check_existence', function(input, options) {
  if(!!input){
    return new Handlebars.SafeString( input );
  }else{
    return new Handlebars.SafeString( "N/A" );
  }
});

Handlebars.registerHelper('empty_array', function(array, options) {
    var fnTrue = options.fn,
        fnFalse = options.inverse;

    return array.length === 0 ? fnTrue(this) : fnFalse(this);
});
