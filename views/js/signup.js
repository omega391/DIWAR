const form = document.querySelector('form');
            const emailError = document.querySelector('.email.error');
            const passwordError = document.querySelector('.password.error');

            form.addEventListener('submit', async (e) => {
                e.preventDefault();

                //reset errors
                emailError.textContent="";
                passwordError.textContent="";

                //getthe values from the form
                const email = form.email.value;
                const name = form.name.value;
                const password = form.password.value;
                const gender = form.gender.value;
                const department = form.department.value;

               try{
                   const res = await fetch('/signup', {
                       method:'POST',
                       body: JSON.stringify({
                           email,
                           name,
                           password,    
                           gender,
                           department
                       }),
                       headers: {'Content-Type':'application/json'}
                   });
                   const data = await res.json();
                   console.log(data);
                   if (data.errors) {
                       emailError.textContent = data.errors.email;
                       passwordError.textContent = data.errors.password;
                   }
                   //redirect to main account
                   if (data.user) {
                       location.assign('account')
                   }
               }
               catch (err) {
                   console.log(err);
               }
            });