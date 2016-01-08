var sounds = ["red","blue","yellow","green"]; 

$(document).ready(function() 
{
  var pattern = [];
  var userPattern = [];
  var timer = 0;
  var timer2 = 0;
  var a = 0;
  var state = "off";
  var strict = false;
  var tempo = 1000;
  
  $("#power").bind("click", function(){
    if(state =="off")
    {
      state = "on";
      $("#power").css("background-color", "#7FB800");
      $("#start").css("background-color", "#b2d9ff");
      $("#strict").css("background-color", "#b2d9ff");
      $("#start").removeClass("disabled");
      $("#strict").removeClass("disabled");
      $("#start").bind("click", function(){newGame()});
      $("#strict").bind("click", function(){strictMode()});
    }
    else
    {
      state = "off";
      $("#start").css("background-color", "gray");
      $("#strict").css("background-color", "gray");
      $("#power").css("background-color", "red");
      $("#start").addClass("disabled");
      $("#strict").addClass("disabled");
      $("#start").unbind("click");
      $("#strict").unbind("click");
    }
  });
  
  $.each(sounds,function(id,val)
  { 
    $("#"+val).bind("click", function(){
      enableButtons(id);
      $("."+val).trigger("play");
      setTimeout(function(){
          disableButtons();
          },500);
    });
  });
  
  function strictMode() 
  {
    if(strict == false)
    {
      strict = true;
      $("#strict").addClass("btn-active");
      $("#strict").css("background-color", "#7FB800");
    }
    else
    {
      strict = false;
      $("#strict").removeClass("btn-active");
      $("#strict").css("background-color", "#b2d9ff");

    }
    pattern = [];
    userPattern = [];
    time = 1000;
    $("#display").html('<p><span class="glyphicon glyphicon-repeat" style="vertical-align:middle;"></span></p>');
    setTimeout(function(){
          newTurn();
          },500);
  }
  
  function newGame()
  {
    pattern = [];
    userPattern = [];
    time = 1000;
    $("#display").html('<p><span class="glyphicon glyphicon-repeat" style="vertical-align:middle;"></span></p>');
    setTimeout(function(){
          newTurn();
          },500);
  }
  
  function newTurn()
  {
    if(pattern.length == 5)
      tempo -= 200;
    if(pattern.length == 9)
      tempo -= 150;
    if(pattern.length == 13)
      tempo -= 150;
    
    if(pattern.length == 20)
    {
      $("#display").html("<p style='font-size: 200%'>You<br>won!</p>");
      setTimeout(function(){
        newGame();
        },5000);
            
    }
    else
    {
      $.each(sounds,function(id,val)
      {
        $("#"+val).unbind("click");
      });
      userPattern = [];
      
      createPattern();
      playPattern();
      hear();
    }
  }
  
  function replayPattern()
  {
    $.each(sounds,function(id,val)
    {
      $("#"+val).unbind("click");
    });
    userPattern = [];
    
    playPattern();
    hear();
  }
  
  function hear()
  {
    $.each(sounds,function(id,val)
    {
      $("#"+val).bind("click", function(){
        enableButtons(id);
        userPattern.push(id);
        $("."+val).trigger("play");
        
        setTimeout(function(){
            disableButtons();
            },500);
            
        read();
      });
    });

  }
  
  function read()
  {
    var ret = true;
    if(userPattern.length != pattern.length)
      return false;
    
    $.each(userPattern,function(id,val){
      if(val != pattern[id])
      {
        $("#display").html('<p><span class="glyphicon glyphicon-remove" style="vertical-align:middle; color:red;"></span></p>');
        $.each(sounds,function(id,val)
        {
          $("#"+val).unbind("click");
        });
        if(strict)
        {
          ret = false;
          setTimeout(function(){
              newGame();
              },1500);
        }
        else
        {
          setTimeout(function(){
              replayPattern();
              },1500);
          ret = false;
        }
      }
    });
    
    if(ret)
    {
      $("#display").html('<p><span class="glyphicon glyphicon-ok" style="vertical-align:middle; color:green;"></span></p>');

      setTimeout(function(){
            newTurn();
            },1500);
    }
  }
  
  function playPattern()
  {
    $("#display").html("<p>"+pattern.length+"</p>");
    $.each(pattern, function(index, value)
    {
      var time = index*tempo;
      timer = setTimeout(function(){
        disableButtons();
        enableButtons(value);
        $("."+sounds[value]).trigger("play");
        },time);
        
      timer2 = setTimeout(function(){
        disableButtons();
        },time+500);
    });
  }
  function createPattern()
  {
    pattern.push(Math.floor(Math.random()*4));
  }
  
  function clearPattern ()
  {
    pattern = [];
  }
  
  function disableButtons()
  {
    $("#green").css("background-color","#004400");
    $("#red").css("background-color","#440000");
    $("#blue").css("background-color","#000044");
    $("#yellow").css("background-color","#444400");
  }
  function enableButtons(i)
  {
    var color = ["#F25F5C","#247BA0","#FFE066","green"];
    $("#"+sounds[i]).css("background-color",color[i]);
  }
  
})
