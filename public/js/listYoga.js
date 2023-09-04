document.addEventListener("DOMContentLoaded", function() {
    var dropdownBtn = document.getElementById("dropdownBtn");
    var dropdownContent = document.getElementById("dropdownContent");

    var dropdownBtn2 = document.getElementById("dropdownBtn2");
    var dropdownContent2 = document.getElementById("dropdownContent2");

    dropdownBtn.addEventListener("click", function() {
        if (dropdownContent.style.display === "block") {
            dropdownContent.style.display = "none";
        } else {
            dropdownContent.style.display = "block";
        }
    });

    dropdownBtn2.addEventListener("click", function() {
        if (dropdownContent2.style.display === "block") {
            dropdownContent2.style.display = "none";
        } else {
            dropdownContent2.style.display = "block";
        }
    });

    window.addEventListener("click", function(event) {
        if (!event.target.matches("#dropdownBtn")) {
            dropdownContent.style.display = "none";
        }
    });

    window.addEventListener("click", function(event) {
        if (!event.target.matches("#dropdownBtn2")) {
            dropdownContent2.style.display = "none";
        }
    });
});