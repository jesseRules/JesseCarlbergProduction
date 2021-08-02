var q4Defaults = {
    init: function() {
        this.cleanUp();
    },

    // removing a few things to better accessibility 
	cleanUp: function() {
		$('#lnkPostback').remove();
		$('#litPageDiv > a:first').remove();
	},
    unWrapLink: function(cls) {
        //used to replace <a> as a wrapper with <span> tags as a wrapper.
        $(cls).replaceWith(function(){
            return $('<span class="'+ cls.split('.').pop() +'">' + $(this).html() + '</span>');
        }); 
    },

    // hides the module if "module not found" text is present
    moduleNotFound: function($el, $hidden) {
        if ( $el.text().trim().length ) {
            $hidden.hide();
        }
    },

    // Scroll to an element if a confirmation message is present
    confirmationScroll: function($el, confirmationText) {
        if ( $el.find(confirmationText).text().trim().length ) {
            $('html, body').animate({
                scrollTop: $el.offset().top
            }, 1000);
        }
    },

    //pattern for email validation
    _isValidEmailAddress: function(emailAddress) {
        var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        return pattern.test(emailAddress);
    },
    //validating unsubscribe module
    validateUnsubscribe: function($el) {
        var inst = this;

        $el.find('input[type="submit"]').on('click', function(e){
            if ( !inst._isValidEmailAddress ( $el.find('input[id*="Email"]').val() ) ) {
                $el.find('.MailingListUnsubscribeMessage').html('Please enter a valid Email Address');
                e.preventDefault();
            }
        });
    },
    // checks to see if the text input is valid before submitting
    validateSubmit: function(selector) {
        var $search = $(selector);

        $search.on('click', 'input:submit', function(e){
            if ( !$(this).closest(selector).find('input:text').val().length ){
                return false;
                e.preventDefault();
            }
        });
    },
    // enter key fix for form elements
    submitOnEnter: function(selector) {
        $(selector).find('input[type="text"]').removeAttr('onkeypress').on('keydown', function(e){
            if (e.keyCode == 13) {
                e.preventDefault();
                $(this).closest(selector).find('input[type="submit"]').trigger('click');
                return false;
            }
        });
    },

    // disable the mobile menu if clicking off of the nav
    _onMenuClose: function(inst) {
        $('.LayoutDefaultInner').one('click', function(e) {
            !$(e.target).closest('.PaneNavigation').length ? $(this).removeClass('mobile-toggled') : inst._onMenuClose(inst);
        });
    },
    _onMobileMenuExpand: function() {
        // simulate global functionality across all mobile devices
        $('.mobile-toggled .PaneNavigation nav').on('click', 'li.has-children > a', function(e) {
            var $this = $(this),
                $parent = $this.parent();
            if (!$parent.hasClass('expanded')) {
                e.preventDefault();
                $parent.siblings().removeClass('expanded');
                $parent.addClass('expanded');
            }
        });
    },
    // standard mobile menu functionality
    onMenuToggle: function() {
        var inst = this;
        $('.LayoutDefaultInner').on('click', '.mobile-toggle', function(e){
            $('.LayoutDefaultInner').toggleClass('mobile-toggled');
            inst._onMobileMenuExpand(inst);
            if ($('.LayoutDefaultInner').hasClass('mobile-toggled')){
                inst._onMenuClose(inst);
            }
        });
    },
    onMenuExit: function($el) {
        $el.on('click', function() {
            $('.LayoutDefaultInner').triggerHandler('click');
        });
    },

    accessibleNav: function($nav, topLevel) {
        // $nav
        //  required: true,
        //  type: element,
        //  desc: the navigation module this function works for
        //
        // $topLevel
        //  required: true,
        //  type: selector,
        //  desc: the highest visible level in this navigation

        $nav.on('focus', 'a' ,function() {
            $(this).closest('ul').find('li').removeClass('focused');
            $(this).closest('li').addClass('focused');
            if ( $(this).closest('li').is(':last-child') && $(this).closest('ul').hasClass(topLevel) ) {
                $(this).blur(function() {
                    $(this).closest('ul').find('li').removeClass('focused');
                });
            }
        });
    },

    // gives element accessibility properties suitable for accordions, slide toggles, and tab navigation.
    accessibilize: function($tablist, $tab, $tabpanel) {
        // $tablist
        //  required: true,
        //  type: element,
        //  desc: the wrapping container of the accessible section
        //
        // $tab
        //  required: true,
        //  type: element,
        //  desc: the element used to toggle the appropriate content (ex: plus, chevron, heading)
        //
        // $tabpanel
        //  required: true,
        //  type: element,
        //  desc: the content that shows depending on what $tab is currently selected

        $tablist.attr('role','tablist');
        $tab.attr('tabindex','0').attr('role','tab').attr('aria-expanded','false');
        $tabpanel.attr('role','tabpanel').hide();
    },
    // Creates a fully accessible expanding and collapsing accordion with the ability to switch between toggle and accordion functionality.
    toggle: function($container, item, toggle, panel, accordion, allButton) {
        // $container
        //  required: true,
        //  type: element,
        //  desc: The wrapping container of the accordion widget (ex: '.accordion-container')
        //
        // item
        //  required: true,
        //  type: selector,
        //  desc: The element class for each item (ex: '.accordion-item')
        //
        // toggle
        //  required: true,
        //  type: selector,
        //  desc: The element class for what needs to be interacted with in order to trigger the functionality (ex: '.accordion-toggle')
        //
        // panel
        //  required: true,
        //  type: selector,
        //  desc: The element class for what is being expanded or collapsed (ex: '.accordion-content')
        //
        // accordion
        //  required: false,
        //  type: boolean,
        //  desc: Used to dictate whether or not native accordion functionality should be used
        //
        // allButton
        //  required: false,
        //  type: boolean,
        //  desc: Used to dictate whether or not to add an "expand all" button above the items

        var $this = this,
            $item = $container.find(item);

        //add accessibility properties to elements
        $this.accessibilize($container, $container.find(toggle), $container.find(panel));
        
        // on Click or on Enter
        $item.on('click keypress', toggle, function(e) {
            if (e.which == 13 || e.type == 'click') {
                // if accordion was specified, use accordion functionality
                // otherwise run regular toggle functionality
                accordion == true ? $this._accordionTrigger($(this), $container, item, toggle, panel):$this._toggleTrigger($(this), $container, item, panel);
            }
        });

        // if allButton was specified, run functionality
        allButton == true ? $this._toggleAll($container, item, toggle, panel) : null;

        //automatically start with first item opened
        $item.first().find(toggle).attr('aria-expanded', true);
        $item.first().addClass('accordion-active').find(panel).show();
    },
    // the functionality that runs if allButton is set to true in the toggle() function
    _toggleAll: function($container, item, toggle, panel) {
        $container.prepend('<div class="accordion-toggle-all"><a href="#all"></a></div>').on('click', '.accordion-toggle-all a', function(e) {
            e.preventDefault();
            $(this).parent().toggleClass('active');
            if ( $(this).parent().is('.active') ) {
                $container.find(toggle).attr('aria-expanded', 'true');
                $container.find(item).addClass('accordion-active');
                $container.find(panel).slideDown();
            } else {
                $container.find(toggle).attr('aria-expanded', 'false');
                $container.find(item).removeClass('accordion-active');
                $container.find(panel).slideUp();
            }
        });
    },
    // the functionality that runs if accordion is set to true in the toggle() function
    _accordionTrigger: function($this, $container, item, toggle, panel) {
        // $this
        //  required: true,
        //  type: element,
        //  desc: the current item being toggled

        if ( !$this.closest(item).hasClass('accordion-active') ) {
            $(item).removeClass('accordion-active');
            $container.find(toggle).attr('aria-expanded', false);
            $container.find(panel).slideUp();

            $this.attr('aria-expanded', true);
            $this.closest(item).addClass('accordion-active').find(panel).slideDown();
        }
    },
    // the functionality that runs if accordion is not specified in the toggle() function
    _toggleTrigger: function($this, $container, item, panel) {
        var $allToggle = $container.find('.accordion-toggle-all');

        $this.attr('aria-expanded', function(i, attr) {
            return attr == 'true' ? 'false' : 'true';
        }).closest(item).toggleClass('accordion-active').find(panel).slideToggle();

        $container.find(item).not('.accordion-active').length ? $allToggle.removeClass('active') : $allToggle.addClass('active');
    },

    // hides the reminder form after a reminder has already been created
    remindMeOnce: function(selector) {
        $(selector).find('.ModuleItemRow').each(function() {
            if ( $(this).find('.ReminderError').text().length ) {
                $(this).find('.ModuleReminderContainer').addClass('js-reminded');
            }
        });
    },

    // used to hide the "Add to Calendar" functionality for past events. Works for both list and details pages.
    hidePastCal: function($events) {
        // $events
        //  required: true,
        //  type: element,
        //  desc: element containing the unwanted "Add to Calendar" link. Can be the ModuleItemRow or the ModuleDetails

        // create a date object for the current time
        var today = new Date();

        $events.each(function() {
            var $this = $(this),
                $date = $this.find('.ModuleDate');

            // determine whether or not the event is a multi-day event
            if ( $date.text().indexOf("from") >= 0 ) {
                var isolateDate = $date.text().split('from ').pop().split('to ');
                // determine whether or not the event is still happening
                // if not, hide "Add to Calendar"
                if (today > new Date(isolateDate[1])) {
                    $this.find('.AddToCalendar').hide();
                }
            } else if (today > new Date($date.text())) {
                // standard functionality
                $this.find('.AddToCalendar').hide();
            }
        });
    },

    // convert visibility:hidden into a simple display:none and reverse
    _formErrorFormat: function(error) {
        $(error).each(function() {
            if ( $(this).css('visibility') == 'hidden' ) {
                $(this).parent().hide();
            } else {
                $(this).parent().show();
            }
        });
    },
    formBuilder: function($form, $hidden) {
        // $form
        //  required: true,
        //  type: element,
        //  desc: the form module this function works for
        //
        // $hidden
        //  required: true,
        //  type: element,
        //  desc: elements to hide on form submit

        var inst = this;

        // check if the form is on the page (it won't be once the form is submitted)
        if ( $form.length ) {
            var errorContainer = $form.find('.error-container');

            // if a set of radio buttons is present, check the first automatically (requirement fix)
            $form.find('.ItemClass input:radio').closest('table').each(function(){
                $(this).find('input:radio:first').prop('checked', true);
            });

            // if a set of check boxes is present, hide the first check box and check it (requirement fix)
            $form.find('.ItemClass input:checkbox').closest('table').addClass('checkboxTable').each(function(){
                $(this).find('input:checkbox:first').parent().hide();
            }); 

            $form.find('.Item').each(function() {
                // assign placeholder values to all inputs
                var name = $(this).find('.label-wrap .Label').text();
                $(this).find('.field-wrap input').attr('placeholder', name);

                // append each error message item to one container (like email alerts)
                var errorMessage = $(this).find('.error-wrap span');
                var errorClass = ( errorMessage.closest('.ItemClass').attr('class') || '').split(' ')[1];

                errorMessage.addClass(errorClass).appendTo(errorContainer).wrap('<li></li>');
            });

            // convert captcha's red star to an error message and append to the error container
            $form.find('.CaptchaContainer span').text("Please provide the code").appendTo(errorContainer).wrap('<li></li>');

            // CMS forces errors to use visibility: hidden, so let's keep track of it and use display:none on the list item instead.
            inst._formErrorFormat( $form.find('.ErrorMessage') );
            $form.find('.SubmitButton').on( 'click', function() {
                inst._formErrorFormat( $form.find('.ErrorMessage') );
            });

            // email validation - need to find a way to make it work with this setup
            $form.find('.SubmitButton').on( 'click', function() {
                var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
                    ErrorMessages = errorContainer.find('.ItemClassEmail');
                if(!emailReg.test($('.Item .ItemClassEmail input:last').val())) {
                    ErrorMessages.parent().show();
                    ErrorMessages.css('visibility', 'visible');
                    return false;
                }
                if ($('.Item .ItemClassEmail input:last').val().length > 1){

                    // check the first checkbox option if nothing is selected
                    $el.find('.checkboxTable').each(function(){
                        if (!$(this).find('input:checkbox').is(':checked')){
                            $(this).find('input:checkbox:first').prop('checked', true); 
                        }
                        else if ($(this).find('input:checkbox:not(":first")').is(':checked')){
                            $(this).find('input:checkbox:first').prop('checked', false)
                        }
                    });

                    ErrorMessages.parent().hide();
                    ErrorMessages.css('visibility', 'hidden');
                }
                return true;
            });
        } else {
            //hide any $hidden elements when the form has been submitted
            inst.moduleNotFound($('.MessageSent'), $hidden);
        }

    }
};