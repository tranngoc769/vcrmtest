$(document).ready(function(){
      var $modal, $modal_data, $modal_name;
      $(".minimize").on("click", function(){
          $modal_name = $(this).closest(".modal").attr("id");
          $modal_data = $(this).closest(".modal");
          $modal = "#" + $modal_name; // convert to id : #modal
          $($modal).toggleClass("isMin");
          if ( $($modal).hasClass("isMin") ){ 
              $(".call-min-panel").append($modal_data);  
          }
          else
          {
              $("main-body").append($modal_data);
          }
      });
      $("#closeButton").on("click", function(){
          console.log("close");
          $(this).closest(".modal").removeClass("isMin");
          //$(".customer-info").removeClass($modal_data); 
          $(this).closest(".modal").modal('hide');
      });
      $("#openmodal").on("click", function(){
            $("#call-modal").modal({backdrop: false, keyboard: false}); 
      });
      $('a.number.effect-shine').on("click", function(){
           var num = $(this).text();
           $("#numpad-input").val($("#numpad-input").val()+`${num}`);
      });
  });