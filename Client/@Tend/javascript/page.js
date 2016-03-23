PageFlip = function() {
    
    var obj = {};
    obj.init = function(container_id, options) {
        this.options = options;
        this.container = $('#' + container_id);
        this.container.css('list-style-type', 'none');
        this.leaves = this.container.find('.book');
        compileLeaves();
        sizePages();
        setupEvents();
        this.container.addClass('_css_page_flip');
        this.container.addClass('ready');
    };
    var compileLeaves = function() {
        var first = true;
        var leaf_num = 0;
    
        // compile the ol into the leaf structure
        obj.leaves.each(function(idx) {
            if(idx % 2 == 0) {
                var el = $(this);
                var next_el = $(obj.leaves[idx+1]);

                // compile the leaf structure
                var right_page = $("<div class='page right_page'></div>").html(el.html());
				var right_page_next = $("<div class='page right_page_next'></div>").html(next_el.html());
			    if(idx+1===11)
				{
				var right_page_next = $("<div class='page right_page_next'></div>").html(next_el.html());	 
				var last_page=$("<div class='curl_left_last'></div><div class='roll_left_first'></div>"); 
				right_page_next=right_page_next.append(last_page);	
				}
				else{
				var right_page_next = $("<div class='page right_page_next'></div>").html(next_el.html());	 
                }
				var new_leaf = $("<li class='book'></li>").append(right_page).append(right_page_next);
                if(first) {
                    new_leaf.addClass('current');
                    first = false;
                    obj.current_leaf = new_leaf;
                }
                
                // remove the old li's
                el.remove();
                next_el.remove();
                obj.container.append(new_leaf);
        
                leaf_num++;
			}
			
        });
		       		
        obj.leaves = obj.container.find('.book');
    };
    
    var sizePages = function() {
        
        obj.container.find('li .page.right_page').each(function() {
           $(this).css('width', "425px");
            $(this).css('height', "485px");
        });
        
        obj.container.find('li .page.right_page_next').each(function() {
           $(this).css('width', "425px");
           $(this).css('height', "485px");
        });
        
    };
    
    var setupEvents = function() {
        obj.last = false;
        obj.first_interaction = true;
        obj.leaves.each(function() {
            var leaf = $(this);
            leaf.find('.right_page').click(function() {
                
                if(obj.first_interaction) {
                    obj.container.addClass('first_touch');
                    obj.first_interaction = false;
                }
                
                if(leaf[0] == obj.current_leaf[0]) { 
                    leaf.addClass('turn');

                    if(nextLeaf()) {
                        leaf.removeClass('current');
                        nextLeaf().addClass('current');
                        obj.current_leaf = nextLeaf();
                    } else {
                        obj.last = true;
                    }
                }
            });
            leaf.find('.right_page_next').click(function() {
                if(leaf[0] != obj.current_leaf[0]) { 
                    leaf.removeClass('turn');

                    if(obj.last) {
                        obj.last = false
                    } else {
                        obj.current_leaf.removeClass('current');                            
                        if(prevLeaf())
                            prevLeaf().addClass('current');

                        obj.current_leaf = prevLeaf();
                    }
                } else if(obj.last) {
                    obj.last = false;
                    leaf.removeClass('turn');
                }
            })
        });
    };

    var nextLeaf = function() {
        var el = obj.current_leaf.next();
        return el.length ? el : null
    };

    var prevLeaf = function() {
        var el = obj.current_leaf.prev();
        return el.length ? el : null
    };

    return obj;

}();

