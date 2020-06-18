(function($){
    window.widgetElements = [];
    window.columns = ['One', 'Two', 'Three'];
    function rend(){
        let cols = columns;
        cols.forEach(c => {
            var col = $($('#temp-col-drag').html());
            col.find('.grid-text').text(c+' Column');
            c = c.toLowerCase();
            if($( "#"+c+"-col-drag" ).length)
                $( "#"+c+"-col-drag" ).html(col);
            else
                $('.' +c+'-col-drag').html('<div id="'+c+'-col-drag" class="col-drag">'+col.html()+'</div>');
        })
        let img = $('#temp-img-drag').html();
        if($( "#img-drag" ).length)
            $( "#img-drag" ).html(img);
        else
            $('.img-drag').append('<div id="img-drag">'+img+'</div>');
    }
    function addColumn(){
        let eleCount = $('.ele-area').children().length + 1;
        let id = "square__" + eleCount;
        let h = $($('#temp-square').html());
        h.find('.square').attr('id', id);
        $('.ele-area').append(h);
        $('.ele-area .square#'+id + ' .image-square').click(function(){
            $('.ele-area .square#'+id).find('input[type="file"]').click();
        });
        $('.ele-area .square#'+id).find('input[type="file"]').change(function(){
            var input = this;
            var url = $(this).val();
            var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
            var reader = new FileReader();
            reader.onload = function (e) {
                $('.ele-area .square#'+id + ' .image-square').addClass('bg-img').html('');
                $('.ele-area .square#'+id + ' .image-square').css({
                    'background-image': 'url('+e.target.result+')'
                });
            }
            reader.readAsDataURL(input.files[0]);
            let k = widgetElements.map(e => e._id).indexOf(id);
            if(k > -1)widgetElements[k].image = input.files[0];jsonLog();
        });
        $('.ele-area .square#'+id).droppable({
            drop: function( event, ui ) {
                if(ui.draggable[0].id == "img-drag"){
                    $(this).addClass('img-dropped');
                    ui.draggable.addClass('dropped');
                    let k = widgetElements.map(e => e._id).indexOf(id);
                    if(k > -1)widgetElements[k].isImageDropped = true;jsonLog();
                }
            }
        });
        widgetElements.push({_id: id, isImageDropped: false, image: null});jsonLog();
        setTimeout(() => {
            $('#element').animate({
                scrollTop: $('.ele-area .square#'+id).offset().top
            }, 500);
        }, 200);
        return id;
    }
    function init(){
        let options = {
            opacity: 0.35,
            stop: function( event, ui ) {
                ui.helper.fadeOut(function(){
                    $(this).remove();rend();init();
                });

                (function initImageDrag(){
                    $( "#img-drag" ).draggable({
                        opacity: 0.35,
                        stop: function( event, ui ) {
                            $( "#img-drag" ).fadeOut(function(){
                                $(this).remove();
                                rend();
                                if(!$( "#img-drag" ).hasClass('dropped')){
                                    initImageDrag();
                                }
                            });
                        }
                    });
                })()
            }
        }
        $( ".col-drag" ).draggable(options);
    }
    function arrangeItem(){
        new Macy({
            container: '.ele-area',
            trueOrder: false,
            waitForImages: false,
            useOwnImageLoader: false,
            debug: true,
            mobileFirst: true,
            columns: 1,
            margin: {
                y: 16,
                x: '2%',
            },
            breakAt: {
                1200: 2,
                940: 2,
                520: 2,
                400: 1
            },
        });
    }
    function jsonLog(){
        var data = [];
        widgetElements.forEach(e => {
            var ele = {...e};
            if(e.isImageDropped && e.image != null){
                ele.image = { name: e.image.name, size: e.image.size, type: e.image.type  }
            }
            data.push(ele);
        })
        $('#json-log').text(JSON.stringify(data, undefined, 3))
    }
    $(document).ready(function(){
        $('.dragable').css('height', (650)+'px');
        $( "#element" ).droppable({
            drop: function( event, ui ) {
                let range = columns.map(c => c.toLowerCase()).indexOf(ui.draggable[0].id.split('-')[0]);
                if(range > -1){
                    let i = 0;while(i <= range){addColumn();i++;};
                    arrangeItem();
                }
            }
        });
        columns.map(c => c.toLowerCase()).forEach(c => {
            $('#col-list').append('<div class="'+c+'-col-drag components">\
                <div id="'+c+'-col-drag" class="col-drag"></div>\
            </div>')
        });
        rend();init();
    })
})(window.jQuery);