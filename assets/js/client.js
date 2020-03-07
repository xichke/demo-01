$(function() {
	if ($('#particles').length) {
		particlesJS('particles', {
			"particles": {
				"number": {
					"value": 80,
					"density": {
						"enable": true,
						"value_area": 800
					}
				},
				"color": {
					"value": "#ffffff"
				},
				"shape": {
					"type": "circle",
					"stroke": {
						"width": 0,
						"color": "#000000"
					},
					"polygon": {
						"nb_sides": 5
					},
					"image": {
						"src": "img/github.svg",
						"width": 100,
						"height": 100
					}
				},
				"opacity": {
					"value": 0.5,
					"random": false,
					"anim": {
						"enable": false,
						"speed": 1,
						"opacity_min": 0.1,
						"sync": false
					}
				},
				"size": {
					"value": 5,
					"random": true,
					"anim": {
						"enable": false,
						"speed": 40,
						"size_min": 0.1,
						"sync": false
					}
				},
				"line_linked": {
					"enable": true,
					"distance": 150,
					"color": "#ffffff",
					"opacity": 0.4,
					"width": 1
				},
				"move": {
					"enable": true,
					"speed": 6,
					"direction": "none",
					"random": false,
					"straight": false,
					"out_mode": "out",
					"attract": {
						"enable": false,
						"rotateX": 600,
						"rotateY": 1200
					}
				}
			},
			"interactivity": {
				"detect_on": "canvas",
				"events": {
					"onhover": {
						"enable": true,
						"mode": "repulse"
					},
					"onclick": {
						"enable": true,
						"mode": "push"
					},
					"resize": true
				},
				"modes": {
					"grab": {
						"distance": 400,
						"line_linked": {
							"opacity": 1
						}
					},
					"bubble": {
						"distance": 400,
						"size": 40,
						"duration": 2,
						"opacity": 8,
						"speed": 3
					},
					"repulse": {
						"distance": 200
					},
					"push": {
						"particles_nb": 4
					},
					"remove": {
						"particles_nb": 2
					}
				}
			},
			"retina_detect": true,
			"config_demo": {
				"hide_card": false,
				"background_color": "#b61924",
				"background_image": "",
				"background_position": "50% 50%",
				"background_repeat": "no-repeat",
				"background_size": "cover"
			}
		}, function() {
			console.log('callback - particles.js config loaded');
		});
	}

	$('#btnCheckin').click(function() {
		$('#register').slideDown('slow');
		$('#btnCheckin').html('Continue check in');
	});

	//checkin page
	if ($('.page-login').length) {
		let Keyboard = window.SimpleKeyboard.default;
		let keyboard = new Keyboard({
			maxLength: 10,
			onChange: function(number) {
				var mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/];
				number = vanillaTextMask.conformToMask(number, mask).conformedValue;
				$('#txtPhone').val(number);
				if (number && number.indexOf('_') < 0) {
					checkin();
				}
			},
			onKeyPress: function(e) {
				if (e === '{enter}') {
					checkin();
				}
			},
			layout: {
				default: ["1 2 3", "4 5 6", "7 8 9", "{bksp} 0 "]
			},
			theme: "hg-theme-default hg-layout-numeric numeric-theme"
		});
	}

	function flipShow(selector, visible) {
		if (visible) {
			$(selector).addClass('animated flipInY').removeClass('toshow');
		} else {
			$(selector).addClass('toshow').removeClass('animated flipInY');
		}
	}

	function checkin() {
		// flipShow('#phoneInput', false);
		// flipShow('#process', true);
		// $('#spin').show();
		$('#spin').removeClass('toshow').addClass('animated fadeIn fast');
		$('#keyboard').addClass('animated fadeOut fast');
		var phone = $('#txtPhone').val();
		$('.loading').show();
		$.ajax({
			type: 'POST',
			url: '/checkin',
			data: JSON.stringify({
				phone: phone
			}),
			contentType: "application/json",
			dataType: 'json'
		}).done(function(e) {
			$('.loading').hide();
			if (e.success) {
				$('#message').html(e.message);
			} else {
				//
			}
		}).fail(function() {
			$('.loading').hide();
		});
	}

	$("#loginForm").submit(function(e) {
		e.preventDefault();
		var username = $('#txtUserName').val(),
			password = $('#txtPassword').val();
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
					window.location.assign($('#ref').val());
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