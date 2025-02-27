class Login {
    constructor() {
        this.nome = "";
        this.firstName = "";
        this.turma = "";
        this.escola = "";
    }

    getLocalData() {
        if (typeof (Storage) === "undefined") {
            console.log("Storage not supported");
            return;
        }

        let dataAux = sessionStorage.getItem("data");
        if (dataAux === null) {
            let data = JSON.parse(dataAux);
            this.parseData(data);
        }
    }

    setLocalData() {
        if (typeof (Storage) === "undefined") {
            console.log("Storage not supported");
            return;
        }

        let storeInfo = {
            'nome': this.nome,
            'firstName': this.firstName,
            'turma': this.turma,
            'escola': this.escola
        };

        let info = JSON.stringify(storeInfo);

        sessionStorage.setItem("data", info);
    }

    logout(){
        this.nome = "";
        this.firstName = "";
        this.turma = "";
        this.escola = "";
        this.setLocalData();
    }

    /**
     * @param {JSON} data
     */

    parseData(data){
        if(data['nome']){
            this.nome = data['nome'];
        }
        if(data['firstName']){
            this.firstName = data['firstName'];
        }
        if(data['turma']){
            this.turma = data['turma'];
        }
        if(data['escola']){
            this.escola = data['escola'];
        }
    }
}