alert('Estas en la validacion del edit front');

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('myForm');
    const modesCheckboxes = form.querySelectorAll('#modes');
    const hiddenModeInput = document.createElement('input');
    hiddenModeInput.type = 'hidden';
    hiddenModeInput.name = 'modesString'; 

    console.log(modesCheckboxes)

    form.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const selectedModes = Array.from(modesCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);
  
      const modesString = selectedModes.join(', ');

      console.log(modesString)
  
      hiddenModeInput.value = modesString;


      form.appendChild(hiddenModeInput);
  
      form.submit();
    });
  });