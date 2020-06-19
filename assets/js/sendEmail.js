function sendEmail(contactForm) {
          
          emailjs.send("gmail", "foodbook", {
              from_name: contactForm.name.value,
              from_email: contactForm.email.value,
              contact_request: contactForm.yourmessage.value,
            })
            .then(
              function (response) {
                console.log("SUCCESS!", response);
              },
              function (error) {
                console.log("FAILED...", error);
              }
            );
        }