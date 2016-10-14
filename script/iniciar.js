$('document').ready(iniciarPrograma);

function iniciarPrograma(){
      $("#divMenu").hide();
      $("#btnLogin").click(login);
      $("#Logout").click(logout);
}

function login(){
  $("#divMenu").show();
  $("#divLogin").hide();

}

function logout(){
  $("#divMenu").hide();
  $("#divLogin").show();

}
