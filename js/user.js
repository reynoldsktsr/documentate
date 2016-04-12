var user = new function() {
	this.userData;

	this.ref = new Firebase('https://documentate.firebaseio.com');
	this.login = function(event,form) {
		event.preventDefault();
		console.log(form.loginModalPass.value);
		this.ref.authWithPassword({
			email	 : form.loginModalEmail.value,
			password : form.loginModalPass.value
		}, function(error, userData) {
			if (error) {
				console.log(error);
				// window.location.href ="index.html";
			} else {
				console.log("Logged In user with payload: ");
				console.log(userData);
				location.reload();
			}
		})
	}
	this.loginSpecial = function(event,platform) {
		this.ref.authWithOAuthPopup(platform, function(error, authData) {
		  if (error) {
		    console.log("Login Failed!", error);
		  } else {
		    console.log("Authenticated successfully with payload:", authData);
		    location.reload();
		  }
		});
	}

	this.checkAuth = function(event) {
		var authData = this.ref.getAuth();
		if (authData) {
			console.log(authData);
			console.log("User " + authData.uid + " is logged in with " + authData.provider);
			this.userData = authData;
			return true;
		} else {
			console.log("User is logged out");
			return false;
		}
	}
	this.getGravatar = function(event) {
		var uid = this.ref.getAuth().uid;
		var hash = uid.replace(/-/g,"");
		return 'http://www.gravatar.com/avatar/'+hash+'?d=retro&s=32';
	}

	this.logout = function(event) {
		this.ref.unauth();
		location.reload();
	}

	this.register = function(event,form) {
		if (!this.validateInputs(form)) {
			return false;
		}
	}

	this.validateInputs = function(form) {
		var hasError = false;
		var fname  = form["register_modal_fname"].value;
		var lname  = form["register_modal_lname"].value;
		var uname  = form["register_modal_username"].value;
		var day    = form["register_modal_day"].value;
		var month  = form["register_modal_month"].value;
		var year   = form["register_modal_year"].value;
		var email  = form["register_modal_email"].value;
		var email2 = form["register_modal_reenter_email"].value;
		var pass   = form["register_modal_password"].value;
		var pass2  = form["register_modal_reenter_password"].value;

		if (!fname) {
			this.displayError("register_modal_fname");
			hasError = true;
		}
		if (!lname) {
			this.displayError("register_modal_lname");
			hasError = true;
		}
		if (!uname) {
			this.displayError("register_modal_username");
			hasError = true;
		}
		if (!day || !month || !year) {
			this.displayError("register_invalid_birth_date");
			hasError = true;
		}
		if (!email) {
			this.displayError("register_invalid_email");
			hasError = true;
		}
		else if (email && ( !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
			this.displayError("register_invalid_email");
			hasError = true;
		}

		if (!email2) {
			this.displayError("register_invalid_reenter_email");
			hasError = true;
		}
		else if (email2 != email) {
			this.displayError("register_invalid_email_not_match");
			hasError = true;
		}
	}

	this.displayError = function(errorId) {
		$('#' + errorId).addClass('invalid');
	}
	this.clearErrors = function() {
		var errors = document.getElementsByClassName('error_message');
		for (i = 0; i < errors.length; i++) {
			errors[i].style.display = "none";
		}
	}
}