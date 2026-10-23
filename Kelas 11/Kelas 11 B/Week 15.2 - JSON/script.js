fetch("databulk.json")
    .then(function(response){
        if(!response.ok){
            throw new Error("Data tidak Ditemukan");
        }
        else{
            return response.json()
        }
    })
    .then(function(data){
        const tabel = document.querySelector("tbody");
        data.forEach(function(data){
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${data.nama}</td>
                <td>${data.umur}</td>
                <td>${data.alamat}</td>
                <td>${data.tempat_lahir}</td>
                <td>${data.tanggal_lahir}</td>
                <td>${data.base_fans}</td>
                <td>${data.kelas}</td>
            `;
            tabel.appendChild(row);
        })
    })