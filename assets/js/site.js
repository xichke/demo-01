$(function() {
	$('#login').submit(function(e) {
		e.preventDefault();
	});
	$('#submit').click(function() {
		$('#loginError').hide();
		var username = $('#username').val();
		var password = $('#password').val();
		if (username && password) {
			$.ajax({
				type: 'POST',
				url: '/login',
				data: JSON.stringify({
					username: username,
					password: password
				}),
				contentType: "application/json",
				dataType: 'json'
			}).done(function(e) {
				if (e.success) {
					window.location.assign(e.redirect);
				} else {
					$('#loginError').show();
				}
			}).fail(function() {
				$('#loginError').show();
			});
		} else {
			$('#loginError').show();
		}
	});
});