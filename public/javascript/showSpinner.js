
document.getElementById('campForm').addEventListener('submit', function(event) {
   if (!this.checkValidity()) {
       event.preventDefault();
       event.stopPropagation();
       this.classList.add('was-validated');
   } else {
       document.getElementById('content').classList.add('blur');
       document.getElementById('spinner').style.display = 'block';
   }
}, false);

