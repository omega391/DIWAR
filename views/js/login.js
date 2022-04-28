const form = document.querySelector('form');
            const accountError = document.querySelector('.account.error');

            form.addEventListener('submit', async (e) => {
                e.preventDefault();

                //reset errors

                //getthe values from the form
                const email = form.email.value;
                const password = form.password.value;

               try{
                   const res = await fetch('/login', {
                       method:'POST',
                       body: JSON.stringify({
                           email,
                           password,
                       }),
                       headers: {'Content-Type':'application/json'}
                   });
                   const data = await res.json();
                   console.log(data);
                   if (data.errors) {
                       accountError.textContent = data.errors.email;
                       accountError.textContent = data.errors.password;

                   }
                   //redirect to main account
                   if (data.user) {
                       location.assign('/account')
                   }
               }
               catch (err) {
                   console.log(err);
               }
            });