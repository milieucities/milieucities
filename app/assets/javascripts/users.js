$(document).on('page:change', function(){

  if($("#user_role").val() === "Organization"){
    $("form .organization").show();
  }

  
  $("#user_role").change(function(){
    if(this.value === "Organization"){
      $("form .organization").show();
    }else{
      $("form .organization").hide();
    }
  })

});