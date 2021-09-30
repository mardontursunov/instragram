profilePhoto.addEventListener('change', async (e) => {
    if(e.target.files.length){
        let formdata = new FormData()
        formdata.append('photo', e.target.files[0])
        let response = await fetch('profile/photo', {
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

followButton.addEventListener('click', async (e) => {
    console.log(e.target.getAttribute('data-id'));
    try {
        let response = await fetch('./follow', {
            method: "POST"
        })
        response = await response.json()
        console.log(response);

    } catch (e) {
        
    }
})