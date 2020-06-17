(function($){
    function rend(){
        let h = '<div class="grid-item">\
            <div class="grid">\
                <a href="#">\
                    <span class="glyphicon glyphicon-menu-hamburger"></span>\
                </a>\
            </div>\
        </div>\
        <div class="grid-text"><span>One Column</span></div>';
        if($( "#one-col-drag" ).length)
            $( "#one-col-drag" ).html(h);
        else
            $('.components').prepend('<div id="one-col-drag">'+h+'</div>');
        let img = '<div class="grid-item">\
            <div class="grid">\
                <a href="#">\
                    <svg class="bi bi-card-image" width="1.5em" height="1.5em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\
                        <path fill-rule="evenodd" d="M14.5 3h-13a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>\
                        <path d="M10.648 7.646a.5.5 0 0 1 .577-.093L15.002 9.5V13h-14v-1l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71z"/>\
                        <path fill-rule="evenodd" d="M4.502 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>\
                    </svg>\
                </a>\
            </div>\
        </div>\
        <div class="grid-text"><span>IMG</span></div>';
        if($( "#img-drag" ).length)
            $( "#img-drag" ).html(img);
        else
            $('.components').append('<div id="img-drag">'+img+'</div>');
    }
    $(document).ready(function(){
        rend()
        $('.dragable').css('height', (outerHeight)+'px');
        let options = {
            opacity: 0.35,
            stop: function( event, ui ) {
                $( "#one-col-drag" ).fadeOut(function(){
                    $(this).remove();
                    rend();
                });
                $( "#img-drag" ).draggable({
                    opacity: 0.35,
                    stop: function( event, ui ) {
                        $( "#img-drag" ).fadeOut(function(){
                            $(this).remove();
                            rend();
                        });
                    }
                });
            }
        }
        $( "#one-col-drag" ).draggable(options);
        $( "#element" ).droppable({
            drop: function( event, ui ) {
                console.log();
                if(ui.draggable[0].id == "img-drag")
                    $( this ).addClass( "img-dropped" )
                else
                    $( this ).addClass( "dropped" )
            }
        });
    
        $('#img-picker').change(function(){
            var input = this;
            var url = $(this).val();
            var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
            var reader = new FileReader();
            reader.onload = function (e) {
                var img = new Image();
                img.onload = function() {
                    let hgt = this.height - (this.height / 2);
                    console.log(hgt);
                    $('.image-square').addClass('bg-img').html('');
                    $('.image-square').css({
                        'background-image': 'url('+e.target.result+')',
                        'height': hgt+'px'
                    });
                    $('.square').css('height', hgt+'px');
                }
                img.src = e.target.result;
            }
            reader.readAsDataURL(input.files[0]);
        });
    })
})(window.jQuery);