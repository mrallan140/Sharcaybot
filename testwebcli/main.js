
function screenshot() {

    html2canvas(document.querySelector("#topng"),{
        width: 800,
        height: 1200
      }).then(canvas => {
        document.body.appendChild(canvas)
    });
    
}
