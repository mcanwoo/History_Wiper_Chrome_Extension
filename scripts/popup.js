$(document).ready(function() {    
    var bgp = chrome.extension.getBackgroundPage();
            
    $('ul.switcher li').click(function(e) {		
		e.preventDefault();
		var act = $(this);
        var id = act.parents('div.item:first').attr('id');

		act.parent().children('li').removeClass('active').end();
        act.addClass('active');	
        localStorage[id] = act.find('a:first').attr('rel');
        
        if (id == 'stopRecording' && localStorage[id] == 1) {
            bgp.updateBadge('green', 'on');
        } else {
            bgp.updateBadge('red', 'off');
        }
    });
    
    $('div.item').each(function(i) {
        var item = $(this);
        var savedValue = localStorage[item.attr('id')];

        if (savedValue != undefined) {
            item.find('li').removeClass('active');
            item.find('a[rel="' + savedValue + '"]').parent().addClass('active');
        }
    });
    
    $('#clearAllHistory').click(function(e) {
        e.preventDefault();
        chrome.history.deleteAll(function() {});
    });
});