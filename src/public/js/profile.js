profilePhoto.addEventListener('change', async (e) => {
    if(e.target.files.length){
        let formdata = new FormData()
        formdata.append('photo', e.target.files[0])
        let response = await fetch('/photo', {
            method: "POST",
            body: formdata        
        })
        response = await response.json()
        if(response.ok){
            window.location.reload()
        } else {
            alert("Error")
        }
    }
}) 