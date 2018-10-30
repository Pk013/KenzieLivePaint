// Add logic to this script to poll server every second for updated pixels.
let clientUpdate = 0

function updatesToBeMade(){

    const post = {
        method: "POST",
        headers: {
            'Content-Type': 'appliciation/json'
        },
        body: JSON.stringify({
            "clientUpdates": bitmap.updates, 
            "clientUpdate": clientUpdate
        })
    }

    fetch('/updates', post)
    .then(response => response.json())
    .then(data => {
        clientUpdate += data.globalUpdates.length
        data.globalUpdates.forEach(element => {
            let row = element[0]
            let column = element[1]
            let color = element[2]
            bitmap.setcolor(row, column, color)
        })
    })
    bitmap.updates = []

    setTimeout(updatesToBeMade, 3000)
}
updatesToBeMade()