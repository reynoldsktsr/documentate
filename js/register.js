$.fn.goValidate = function() {
	var $form = this;
	var $inputs = $form.find('input:text, input:password');
	var $selects = $form.find('select');
  
	var validators = {
		name: {
			regex: /^[A-Za-z]{3,}$/
		},
		username: {
			regex: /^[A-Za-z]{6,}$/
		},
		firstName: {
			regex: /^[A-Za-z]{3,}$/
		},
		lastName: {
			regex: /^[A-Za-z]{3,}$/
		},
		town: {
			regex: /^[A-Za-z]{3,}$/
		},
		postcode: {
			regex: /^.{3,}$/
		},
		password1: {
			regex: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
		},
		password1_repeat: {
			regex: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
		},
		email: {
			regex: /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/
		},
		phone: {
			regex: /^[2-9]\d{2}-\d{3}-\d{4}$/,
		},
		body: {
			regex: /^.{3,}$/
		},
		country: {
			regex: /^(?=\s*\S).*$/,
		}
	};
	var validate = function(klass, value) {
		var isValid = true;
		var error = '';
			
		if (!value && /required/.test(klass)) {
			error = 'This field is required';
			isValid = false;
		} else {
			klass = klass.split(/\s/);
			$.each(klass, function(i, k){
				if (validators[k]) {
					if (value && !validators[k].regex.test(value)) {
						isValid = false;
						error = validators[k].error;
					}
				}
			});
		}
		return {
			isValid: isValid,
			error: error
		}
	};
	var showError = function($e) {
		var klass = $e.attr('class'),
			value = $e.val(),
			test = validate(klass, value);
	  
		$e.removeClass('invalid');
		$('#form-error').addClass('hide');
		
		if (!test.isValid) {
			$e.addClass('invalid');
			
			if(typeof $e.data("shown") == "undefined" || $e.data("shown") == false){
			   $e.popover('show');
			}
			
		}
	  else {
		$e.popover('hide');
	  }
	};
   
	$inputs.keyup(function() {
		showError($(this));
	});
	$selects.change(function() {
		showError($(this));
	});
  
	$inputs.on('shown.bs.popover', function () {
		$(this).data("shown",true);
	});
  
	$inputs.on('hidden.bs.popover', function () {
		$(this).data("shown",false);
	});
  
	$form.submit(function(e) {
	  
		$inputs.each(function() { /* test each input */
			if ($(this).is('.required') || $(this).hasClass('invalid')) {
				showError($(this));
			}
		});
		$selects.each(function() { /* test each input */
			if ($(this).is('.required') || $(this).hasClass('invalid')) {
				showError($(this));
			}
		});
		if ($form.find('input.invalid').length) { /* form is not valid */
			e.preventDefault();
			$('#form-error').toggleClass('hide');
		}
	});
	return this;
};


$('form').goValidate();