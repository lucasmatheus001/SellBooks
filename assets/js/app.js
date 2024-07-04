$(function() {

	// Get the form.
	var form = $('#ajax-contact');

	// Get the messages div.
	var formMessages = $('#form-messages');

	// Set up an event listener for the contact form.
	$(form).submit(function(e) {
		// Stop the browser from submitting the form.
		e.preventDefault();

		// Serialize the form data.
		var formData = $(form).serialize();

		// Submit the form using AJAX.
		$.ajax({
			type: 'POST',
			url: $(form).attr('action'),
			data: formData
		})
		.done(function(response) {
			// Make sure that the formMessages div has the 'success' class.
			$(formMessages).removeClass('error');
			$(formMessages).addClass('success');

			// Set the message text.
			$(formMessages).text(response);

			// Clear the form.
			$('#name').val('');
			$('#email').val('');
			$('#subject').val('');
			$('#message').val('');
		})
		.fail(function(data) {
			// Make sure that the formMessages div has the 'error' class.
			$(formMessages).removeClass('success');
			$(formMessages).addClass('error');

			// Set the message text.
			if (data.responseText !== '') {
				$(formMessages).text(data.responseText);
			} else {
				$(formMessages).text('Oops! An error occured and your message could not be sent.');
			}
		});

	});

	document.addEventListener("DOMContentLoaded", () => {
		const form = document.getElementById("testimonial-form");
		const testimonialList = document.getElementById("testimonial-list");

		// Carrega os testemunhos do Local Storage
		const loadTestimonials = () => {
			const testimonials = JSON.parse(localStorage.getItem("testimonials")) || [];
			testimonials.forEach(addTestimonialToDOM);
		};

		// Adiciona um testemunho ao DOM
		const addTestimonialToDOM = ({ name, title, message, image }) => {
			const li = document.createElement("li");
			li.innerHTML = `
				<p>"${message}"</p>
				<img class="mu-rt-img" src="${image}" alt="img">
				<h5 class="mu-rt-name"> - ${name}</h5>
				<span class="mu-rt-title">${title}</span>
			`;
			testimonialList.appendChild(li);
		};

		// Salva um testemunho no Local Storage
		const saveTestimonial = (testimonial) => {
			const testimonials = JSON.parse(localStorage.getItem("testimonials")) || [];
			testimonials.push(testimonial);
			localStorage.setItem("testimonials", JSON.stringify(testimonials));
		};

		// Evento de envio do formulário
		form.addEventListener("submit", (e) => {
			e.preventDefault();
			const name = document.getElementById("name").value;
			const title = document.getElementById("title").value;
			const message = document.getElementById("message").value;
			const image = document.getElementById("image").value;

			const testimonial = { name, title, message, image };
			addTestimonialToDOM(testimonial);
			saveTestimonial(testimonial);

			form.reset();
		});

		loadTestimonials();
	});

});
